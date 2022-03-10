import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from '../styles/Post.module.css'

import postAPI from '../api/postAPI'

const Post = ({ post }) => {
  const { _id } = useSelector((state) => state.auth.user)

  const [liked, setLiked] = useState(post?.stars?.find((id) => id === _id) ? true : false)

  const handleLike = async () => {
    if (liked) {
      const response = await postAPI.unstar(post._id)
      if (response) setLiked(false)
    } else {
      const response = await postAPI.star(post._id)
      if (response) setLiked(true)
    }
  }

  const convertTime = (isoDate) => {
    const date = new Date(isoDate)
    const now = new Date()
    if (date.getDate() === now.getDate())
      return `Today at ${date.getHours()}:${
        date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
      }`
    if (parseInt(date.getDate()) === parseInt(now.getDate()) - 1)
      return `Yesterday at ${date.getHours()}:${
        date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
      }`
    return `${date.toString().substring(4, 15)} at ${date.toString().substring(16, 21)}`
  }

  return (
    <div className={`${styles.container}`}>
      <div className={`header ${styles.dFlex}`}>
        <Link to={`/${post?.user.username}`} style={{ display: 'flex', textDecoration: 'none' }}>
          <img src={post?.user.avatar} alt="Avatar" className={`${styles.avatar}`} />
          <p className={`${styles.name}`}>{post?.user.fullname}</p>
        </Link>
        <p className={`${styles.time}`}>{convertTime(post?.createdAt)}</p>
      </div>
      <div className={`content ${styles.content}`}>
        <p>{post?.content}</p>
        <img src={post?.image} alt="Post's" />
      </div>
      <div className={`${styles.footer}`}>
        <div onClick={handleLike}>
          <i className={`nes-icon star is-medium ${liked ? '' : 'is-transparent'}`}></i>
        </div>
        <div>
          <i className="nes-icon twitch is-medium" style={{ filter: 'grayscale(100%)' }}></i>
        </div>
      </div>
    </div>
  )
}

export default Post
