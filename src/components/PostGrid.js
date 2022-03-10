import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../styles/PostGrid.module.css'

const PostGrid = ({ posts }) => {
  return (
    <div className={styles.container}>
      {posts?.map((post) => (
        <div className={styles.img} key={post._id}>
          <Link to={`/p/${post._id}`}>
            <img src={post.image} alt="post" />
          </Link>
        </div>
      ))}
    </div>
  )
}

export default PostGrid
