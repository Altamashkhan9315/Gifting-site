import express from "express"
import { addProduct, listProduct, removeProduct, showProduct } from "../controller/ProductController.js"
import multer from "multer"

const ProductRouter =express.Router();

//image Storage engine

const storage =multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const uploads =multer({storage:storage});

ProductRouter.post("/add",uploads.single("image"),addProduct);
ProductRouter.get("/list",listProduct);
ProductRouter.post("/remove",removeProduct);
ProductRouter.get("/show",showProduct)

export default ProductRouter;