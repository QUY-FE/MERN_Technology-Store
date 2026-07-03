import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: { type: String, default: "Admin" },
    status: {
      type: String,
      enum: ["Ẩn", "Hiện"],
      default: "Hiện",
    },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

newsSchema.index({ slug: 1 });

const News = mongoose.model("News", newsSchema);
export default News;