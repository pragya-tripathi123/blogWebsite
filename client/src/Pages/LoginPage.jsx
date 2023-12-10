import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function LoginPage() {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [redirect,setRedirect] = useState(false)
  // const [wrong,setWrong] = useState('')
  const {setUserInfo} = useContext(UserContext)
  async function login(ev){
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
        });
        if(response.ok){
          response.json().then(userInfo=>{
            setUserInfo(userInfo)
            setRedirect(true);
          })
        }
        else{
          alert("wrong username or password");
          // setWrong("Wrong username or password");
          setUsername('')
          setPassword('')
        }
  }
  if(redirect){
    return <Navigate to={'/'}></Navigate>
  }
  return (
    <>
      <div className="logreg">
        <form action="" className="login" onSubmit={login}>
          <h1>Login</h1>
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
          {/* <p>{wrong}</p> */}
          <button>Login</button>
          <div style={{ marginTop: "13px" }}>
            <span style={{ marginRight: "10px" }}>
              Don&#39;t have an accound yet?
            </span>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#023e8a" }}
            >
              Register now
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
