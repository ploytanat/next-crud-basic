"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { get } from "mongoose";

import Delete from "./delete";

export default function Home() {

  const [postData, setPostData] = useState([]);

  const getPosts = async () => {
    try{
      const res = await fetch("http://localhost:3000/api/posts",{
        methhod: "GET",
        cache: "no-store"
      })
      if (!res.ok){
        throw new Error("Failed to fech posts");
      }

      const data = await res.json();
      setPostData(data.posts);
    }catch(error){
      console.log("Error loading posts: ", error)
    }
  }

  useEffect(()=>{
    getPosts();
  },[]);

  return (
    <main className="container mx-auto my-3 ">
      <h1>NextJS Crud + MongoDB</h1>
      <hr  className="my-3"></hr>
      <button className="bg-green-500 p-3 text-white rounded"><Link href="/create">Created Post</Link></button>
      <div className="grid grid-cols-4 mt-3 gap-5">
        {postData && postData.length > 0 ? (
          postData.map(val => (
         
          <div className=" shadow-2xl my-10 p-10 rounded-xl" key={val._id}>
            <h4>{val.title}</h4>
            <img src={val.img} alt="" />
            <p>{val.content}</p>
            <div className="mt-3">
                <Link className=" bg-gray-500 text-white rounded-md text-lg py-2 px-3 mr-2" href={`/edit/${val._id}`}>Edit</Link>
               <Delete id={val._id}/>
            </div>
          </div>
          ))
         ) : (
            <p className="bg-gray-300 p-3 mt-3 ">
              You do not have any posts yet.
            </p>
          
        ) }
 
      </div>
    </main>
  );
}
