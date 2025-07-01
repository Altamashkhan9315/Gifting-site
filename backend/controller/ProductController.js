import productModel from "../models/ProductModel.js";
import fs from "fs";

const addProduct=async (req,res)=>{
    
     let image_filename=`${req.file.filename}`;

     const Product = new productModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
     })
      try {
        await Product.save();
        res.json({success:true,message:"Product Added"});
      } catch (error) {
        console.log("error");
        res.json({success:false,message:"Product Not Added"})
      }
}

const listProduct = async(req,res)=>{
    try {
        const product=await productModel.find({});
        res.json({success:true,data:product});
    } catch (error) {
        console.log("error");
        res.json({success:false})
    }
}

const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body._id);
        if (product) {
            fs.unlink(`uploads/${product.image}`, (err) => {
                if (err) {
                    console.log("Failed to delete image:", err);
                }
            });
            await productModel.findByIdAndDelete(req.body._id);
            res.json({ success: true, message: "Product Removed" });
        } else {
            res.json({ success: false, message: "Product not found" });
        }
    } catch (error) {
        console.log("Error", error);
        res.json({ success: false, message: "Server Error" });
    }
};

const showProduct =async (req,res) => {
    try {
        const product = await productModel.findById(req.query.id);
        res.json({success:true,message:"Found",data:product});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

export {addProduct,listProduct,removeProduct,showProduct};