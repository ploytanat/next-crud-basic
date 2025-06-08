import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: String,
    img: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

// เช็คว่ามี models post หรือยัง ถ้ายังไม่มีจะทำการสร้าง
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
