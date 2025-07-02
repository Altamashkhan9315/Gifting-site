import orderModel from "../models/OrderModel.js";
import userModel from "../models/UserModel.js";
import Razorpay from "razorpay"
import dotenv from "dotenv";
import crypto from "crypto";
import { log } from "console";
dotenv.config();

const razorpay = new Razorpay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_API_SECRET
})


// placing userOrder for frontend
const placeOrder=async (req,res) => {

    const frontend_url ="https://gifting-site-frontend.onrender.com/";

    try {
        const newOrder =new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })
        

        

        const razorpayOrder = await razorpay.orders.create({
            currency: "INR",
            amount: req.body.amount * 100,  // Razorpay expects the amount in the smallest unit (e.g., paise)
            payment_capture: 1  ,// auto capture
            receipt: `order_rcptid_${newOrder._id}`,  // a unique identifier
            });
            newOrder.razorpayOrderId = razorpayOrder.id;
            await newOrder.save();
            await userModel.findByIdAndUpdate(req.body.userId,{cardData:{}});
        res.json({
            success: true,
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            newOrderId: newOrder._id,
        });

    } catch (error) {
          console.error("Error in placing order:", error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

const verifyPayment = async (req, res) => {
 const {newOrderId,success}=req.body;
 try {
    if(success=="true"){
        await orderModel.findByIdAndUpdate(newOrderId,{payment:true});
        res.json({success:true,message:"Paid"})
        console.log(newOrderId);
        
    }else{
        await orderModel.findByIdAndDelete(newOrderId);
        res.json({success:false,message:"Not Paid"})
        console.log(newOrderId,message);
    }
 } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
 }
}

// users order
const userOrders=async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}


export {placeOrder,verifyPayment,userOrders,listOrders,updateStatus}
