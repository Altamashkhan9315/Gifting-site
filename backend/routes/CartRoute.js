import express from 'express'
import { addToCart,removeFromCart,fetchUserCart } from '../controller/CartController.js'
import authMiddleware from '../middleware/Auth.js';

const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/fetch",authMiddleware,fetchUserCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)

export default cartRouter;