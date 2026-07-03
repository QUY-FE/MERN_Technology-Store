import express from "express";
const router = express.Router();
import { createAOrder, deleteOrder, getAllOrder, getOrderByEmail, updateOrder } from "../controllers/order.controller.js";

router.post("/create-order" ,createAOrder);
router.get("/email/:email", getOrderByEmail);
router.get("/", getAllOrder);
router.delete("/delete/:id", deleteOrder);
router.put("/update/:id", updateOrder);

export default router;