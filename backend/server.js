import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import ProductRouter from "./routes/ProductRoute.js";
import userRouter from "./routes/UserRoute.js";
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
import cartRouter from "./routes/CartRoute.js";
import orderRouter from "./routes/OrderRoute.js";

// Load environment variables
dotenv.config();

// Verify environment variables are loaded
if (!process.env.JWT_SECRET) {
    console.error('ERROR: JWT_SECRET is not defined in environment variables');
    process.exit(1);
}

console.log('Environment check:', {
    JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not set',
    MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not set'
});

//app config
const app=express();
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cors());                  

// DB connects
connectDB();

//api endpoints
app.use("/api/Product",ProductRouter);
app.use("/images",express.static("uploads"));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);


app.get("/",(req,res)=>{
    res.send("API IS WORKING");
})

app.listen(port,()=>{
    console.log("server is running");
})