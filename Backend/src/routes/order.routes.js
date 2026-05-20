import express from "express";
const router = express.Router();
import { createAOrder, getAllOrder, getOrderByEmail } from "../controllers/orderController.js";

router.post("/create-order" ,createAOrder);
router.get("/email/:email", getOrderByEmail);
router.get("/", getAllOrder);

export default router;