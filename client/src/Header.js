import React, { useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'

export default function Header() {
    const { setUserInfo,userInfo } = useContext(UserContext)
    const [showMediaIcons, setshowMediaIcons] = useState(false)
    useEffect(()=>{
        fetch('http://localhost:4000/profile',{
            credentials:'include',
        }).then(response => {
            response.json().then(userinfo => {
                setUserInfo(userinfo)
            }) 
        })
    },[])


    function logout(){
        console.log("functodksah")
        fetch('http://localhost:4000/logout',{
            credentials:'include',
            method:'POST'
        })
        setUserInfo(null)
    }

    
    
    function seePost(){
        const id = (userInfo.id)
        fetch(`http://localhost:4000/see/${id}`, {
            method: 'GET'
        })
            .then(({ status }) => {
                console.log("00000000000", status);
            })
    }
const username = userInfo?.username
  return (
      <header>
          <Link to="/" className='logo'>MyBlog</Link>
          <nav>
              <div className={showMediaIcons ? "mobile-menu-link" :"nav"}>
                {username && (
                <>
                      <span>Hello, {username}</span>
                      <Link to ='/create'>Create post</Link>
                      <Link to = {`/see/${userInfo.id}`} onClick={seePost}>See your posts</Link>
                      <Link onClick={logout}>Logout</Link>

                </>
            )}
               {!username && (
                  <>
                      <Link to="/login">Login</Link>
                      <Link to="/register">Register</Link>
                  </>
              )}
              
            </div>
              {showMediaIcons ? <svg onClick={() => setshowMediaIcons(!showMediaIcons)} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-file-x" viewBox="0 0 16 16">
              <path d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708" />
              <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
            </svg>:<span className='hamburger'><svg onClick={() => setshowMediaIcons(!showMediaIcons)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
            </svg></span> }
              
          </nav>
      </header>
  )
}
