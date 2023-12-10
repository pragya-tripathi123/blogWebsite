import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import { UserContext } from '../UserContext'


export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect,setRedirect] = useState(false);
  const { userInfo } = useContext(UserContext)
  const username = userInfo?.username
  
  async function createNewPost(ev) {

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set('file',files[0])
    ev.preventDefault();
    console.log(files)
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body:data,
      credentials:"include",
    });
    console.log(response.ok)
    if(response.ok){
      setRedirect(true)
    }
    // else{
    //   alert("please select image")
    // }
  }

  if (redirect || !username){
    return <Navigate to={'/'}></Navigate>
  }
  return (
    <div>
      <form onSubmit={createNewPost}>
        <input
          type="title"
          placeholder="title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          required
        />
        <input
          type="summary"
          placeholder="summary"
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
          required
        />
        <input
          type="file"
          onChange={(ev) => setFiles(ev.target.files)} required
        />
        <Editor value={content} onChange={setContent}></Editor>
        <button style={{ marginTop: "5px" }}>Create post</button>
      </form>
    </div>
  );
}
