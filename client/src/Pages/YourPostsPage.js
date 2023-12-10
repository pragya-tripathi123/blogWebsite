import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useParams, Navigate } from "react-router-dom";
import Post from '../Post'
import { UserContext } from '../UserContext'

export default function YourPostsPage() {

  const { userInfo } = useContext(UserContext)

    const [posts, setPost] = useState([])
    const [isPending,setIsPending] = useState(true)
    const { id } = useParams();
    const username = userInfo?.username

    useEffect(() => {
        setTimeout(() => {
          fetch("http://localhost:4000/see/" + id).then((response) => {
            response.json().then(posts => {
              setPost(posts);
              setIsPending(false)
            });
          });
        }, 0.7);
    }, [])

  if (!username) {
    return <Navigate to={'/'}></Navigate>
  }
  return (
    <div>
      {isPending ? <div>Loading...</div> : (posts.length > 0 ? posts.map(post => (
        <Post {...post} />
      )) : <h4>Oops! You haven't written your blog.</h4>)}
    </div>
  )
}
