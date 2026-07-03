import express from "express";
import { upload } from "../middleware/upload.middleware.js";
import { uploadImage, uploadMultipleImages } from "../controllers/upload.controller.js";

const router = express.Router();

router.post("/:type/image", upload.single("image"), uploadImage);
router.post("/:type/images", upload.array("images", 5), uploadMultipleImages);

export default router;