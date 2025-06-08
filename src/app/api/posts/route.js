import { connectMongoDB } from "../../../../lib/mongodb";
import Get from "../../../../models/get";
import Post from "../../../../models/post";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, img, content } = await req.json();

  try {
    await connectMongoDB();
    await Post.create({ title, img, content });
    return NextResponse.json({ message: "Post created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ message: "Failed to create post" }, { status: 500 });
  }

}

export async function GET(){
  await connectMongoDB();
  const posts = await Post.find({});
  return NextResponse.json({posts});
}

export async function DELETE(req){
  const id = req.nextUrl.searchParams.get("id");

  try {
    await connectMongoDB();
  await Post.findByIdAndDelete(id);
  return NextResponse.json({message:"Post Deleted"}, {status:200});
  } catch (error) {
    console.log("ลบไม่ได้จร้า", error)
  }
}