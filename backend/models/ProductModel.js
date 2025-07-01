import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
      name:{type:String,required:true},
      description:{type:String,required:true},
      price:{type:Number,required:true},
      image:{type:String,required:true},
      category:{type:String,required:true},
})

const productModel = mongoose.models.product || mongoose.model("Product", ProductSchema);

export default productModel;