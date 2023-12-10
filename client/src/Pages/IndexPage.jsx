import React, { useEffect, useState } from 'react'
import Post from '../Post'

export default function IndexPage() {
  const [posts,setPost] = useState([])
  const [isPending, setIsPending] = useState(true);
  useEffect(() =>{const resp = fetch("http://localhost:4000/post").then((response) => {
        response.json().then((posts) => {
          setPost(posts);
         setIsPending(false)
        }).catch(err =>{
        console.log(err.message)
        })
      });
  },[])
  return (
    <>
      {isPending ? <div>Loading...</div> : posts.length>0 && posts.map(post=>(
        <Post {...post}/>
      ))}
    </>
  );
}
