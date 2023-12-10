import React from 'react'
import { Link } from 'react-router-dom'
// import { create } from '../../api/models/User'
import { formatISO9075 } from 'date-fns'


export default function Post({_id,title,summary,cover,content,createdAt,author}) {
  return (
      <div className='post'>
          <div className='image'>
              <Link to={`/post/${_id}`}><img src={'http://localhost:4000/' + cover} alt="" className='postImg' /></Link>
          </div>
          <div className='texts'>
              <Link to={`/post/${_id}`}><h2 style={{ color:"#355070"}}>{title}</h2></Link>
              <p className='info'>
                  <Link className='author'>{author.username}</Link>
                  <time>{formatISO9075(new Date(createdAt))}</time>
              </p>
              <Link to={`/post/${_id}`} className='summary'>{summary}</Link><br/><br/>
              {/* <Link to={`/post/${_id}`}>Read More -></Link> */}
          </div>
      </div>
  )
}
