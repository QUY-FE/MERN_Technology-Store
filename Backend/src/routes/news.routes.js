import express from "express";
import { getNews, createNews, deleteNews, updateNews, getOneNews } from "../controllers/news.controller.js";

const router = express.Router();

router.post("/create", createNews);
router.get("/", getNews);
router.get("/:id", getOneNews);
router.put("/edit/:id", updateNews);
router.delete("/delete/:id",deleteNews);

export default router;