"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"


function EditPostPage() {
    const params = useParams(); 
    const { id } = params;

    console.log("Fetching post with id:", id);

    const [postData, setPostData] = useState("");

    //New Post data 
    const [newTitle, setNewTitle] = useState("");
    const [newImg, setNewImg] = useState("");
    const [newContent, setNewContent] = useState("");
    const router = useRouter();

    const getPostById = async (id) => {
        try {
            const res = await fetch(`/api/posts/${id}`,{
                method:"GET",
                cache:"no-store"
            })

            if(!res.ok){
                throw new Error("Failed to fecth posts.")
            }

            const  data = await res.json();
            console.log("Edit post: ", data)
            setPostData(data)

        } catch (error) {
            console.log("ไม่ได้จร้า", error)
        }
    }
useEffect (() =>{
    getPostById(id);
},[]);
    const handleSubmit = async (e) =>{
      e.preventDefault();
      try {
        const res = await fetch(`/api/posts/${id}`,{
          method: "PUT",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
  newTitle: newTitle || postData.title,
  newImg: newImg || postData.img,
  newContent: newContent || postData.content,
})

  
        })
        if(!res.ok){
          throw new Error("Faile to update post")
        }
        router.refresh();
        router.push("/");
      } catch (error) {
        console.log(error);
        
      }
    }
  return (
    <div className="container mx-auto py-10 ">
      <h3 className="text-3xl font-bold">Edit Post</h3>
      <hr className="my-3" />
      <Link
        className=" bg-gray-500 py-3 inline-block text-white border px-3 rounded-md my-2"
        href="/"
      >
        Go back
      </Link>
      <form onSubmit={handleSubmit}>
        <input
        onChange={(e) => setNewTitle(e.target.value)}
          value={postData.title}
          type="text"
          className="w-[300px] block bg-gray-200 border rounded-sm py-2 px-3 text-lg my-2"
          placeholder={postData.title}
        />
        <input
         onChange={(e) => setNewImg(e.target.value)}
          type="text"
          className="w-[300px] block bg-gray-200 border rounded-sm py-2 px-3 text-lg my-2"
          placeholder={postData.img}
        />
   
        <textarea
         onChange={(e) => setNewContent(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="10"
          className="w-[300px] block bg-gray-200 border rounded-sm py-2 px-3 text-lg my-2"
          placeholder={postData.content}
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 text-white border rounded text-lg my-2 py-2 px-3"
        >
          Edit Post
        </button>
      </form>
    </div>
  )
}
export default EditPostPage