"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !img || !content) {
      alert("Please complete all inputs");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, img, content }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a new post");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const router = useRouter();
  return (
    <div className="container mx-auto py-10 ">
      <h3 className="text-3xl font-bold">Create Post</h3>
      <hr className="my-3" />
      <Link
        className=" bg-gray-500 py-3 inline-block text-white border px-3 rounded-md my-2"
        href="/"
      >
        Go back
      </Link>
      <form onSubmit={handleSubmit}>
        <input
        onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="w-[300px] block bg-gray-200 border rounded-sm py-2 px-3 text-lg my-2"
          placeholder="Post Title"
        />
        <input
         onChange={(e) => setImg(e.target.value)}
          type="text"
          className="w-[300px] block bg-gray-200 border rounded-sm py-2 px-3 text-lg my-2"
          placeholder="Post Img Url"
        />
        <textarea
         onChange={(e) => setContent(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="10"
          className="w-[300px] block bg-gray-200 border rounded-sm py-2 px-3 text-lg my-2"
          placeholder="Enter your content"
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 text-white border rounded text-lg my-2 py-2 px-3"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
export default CreatePostPage;
