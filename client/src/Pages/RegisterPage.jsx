import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function RegisterPage() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    async function register(ev){
        ev.preventDefault()
        const response = await fetch("http://localhost:4000/register", {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: {'Content-Type': 'application/json'}
        });
        if(response.status === 200){
          alert("registration successsful");
        }
        else{
          alert("registration failed");
        }
        setUsername('')
        setPassword('')
    }
  return (
    <>
      <form className="register" onSubmit={register}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button>Register</button>
        <div style={{ marginTop: "13px" }}>
          <span style={{ marginRight: "10px" }}>Already a member?</span>
          <Link
            to={"/login"}
            style={{ textDecoration: "none", color: "#023e8a" }}
          >
            Login
          </Link>
        </div>
      </form>
    </>
  );
}
