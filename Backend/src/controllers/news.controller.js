import News from "../models/news.model.js";
import fs from "fs";
import path from "path";

// GET /news
export const getNews = async (req, res, next) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 });
    return res.status(201).json(newsList);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /news/slug/:slug 
export const getNewsBySlug = async (req, res, next) => {
  try {
    const news = await News.findOneAndUpdate(
      { slug: req.params.slug, status: "Hiện" },
      { $inc: { views: 1 } },
      { new: true }
    );
    
    if (!news) return res.status(404).json({ message: "Không tìm thấy bài viết" });
    return res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /news/:id 
export const getOneNews = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "Không tìm thấy bài viết" });
    return res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /news/create
export const createNews = async (req, res, next) => {
  try {
    const newNews = new News(req.body);
    const savedNews = await newNews.save();
    return res.status(201).json(savedNews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /news/edit/:id
export const updateNews = async (req, res, next) => {
  try {
    const newsId = req.params.id;
    const { thumbnail, ...data } = req.body;

    const existingNews = await News.findById(newsId);
    if (!existingNews) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    
    if (thumbnail && existingNews.thumbnail && thumbnail !== existingNews.thumbnail) {
      const filePath = path.join(process.cwd(), existingNews.thumbnail);

      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (fileError) {
          console.error(`Không thể xóa file vật lý khi update: ${filePath}`, fileError);
        }
      }
    }

    const updateData = {
      ...data,
      ...(thumbnail && { thumbnail }), 
    };
    
    const updated = await News.findByIdAndUpdate(newsId, updateData, {
      new: true,
    });
    
    return res.status(201).json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /news/delete/:id
export const deleteNews = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    
    if (news.thumbnail) {
      const filePath = path.join(process.cwd(), news.thumbnail);

      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (fileError) {
          console.error(`Không thể xóa file vật lý: ${filePath}`, fileError);
        }
      }
    }

    await News.findByIdAndDelete(req.params.id);
    return res.status(201).json({ message: "Xoá bài viết thành công !!!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};