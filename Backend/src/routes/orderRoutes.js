import express from "express";
const router = express.Router();
import { createAOrder, getOrderByEmail } from "../controllers/orderController.js";

router.post("/" ,createAOrder);
router.get("/email/:email", getOrderByEmail);

export default router;