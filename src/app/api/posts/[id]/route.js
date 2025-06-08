import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;
  console.log("Fetching post with id:", id); // ✅ Debug log

  await connectMongoDB();

  try {
    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Invalid ID format", error);
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}

export async function PUT(req, {params}){
  const { id } = await params;
  const {newTitle: title, newImg: img, newContent: content} = await req.json();
  await connectMongoDB();

 
  await Post.findByIdAndUpdate(id, {title, img, content});
  return NextResponse.json({message: "Post updated"}, {status: 200});
}

export async function DELETE(req, {params}){
  const { id } = await params;

  

  try {
    await connectMongoDB();
  await Post.findByIdAndDelete(id);
  return NextResponse.json({message:"Post Deleted"}, {status:200});
  } catch (error) {
    console.log(error)
  }
}