import express from "express"
import authMiddleware from "../middleware/Auth.js"
import { listOrders, placeOrder,userOrders,verifyPayment,updateStatus } from "../controller/OrderController.js"

const orderRouter =express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyPayment);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.get("/list",listOrders)
orderRouter.post("/updatestatus",updateStatus);

export default orderRouter;