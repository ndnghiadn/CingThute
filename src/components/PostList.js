import React, { useState, useEffect, lazy, Suspense } from 'react'

import styles from '../styles/PostList.module.css'
import CreatePost from './CreatePost'

import postAPI from '../api/postAPI'

const Post = lazy(() => import('./Post'))

const PostList = () => {
  const [posts, setPosts] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const response = await postAPI.getPosts()
      setPosts(response.posts)
    }

    fetchData()
  }, [])

  return (
    <div className={`${styles.container}`}>
      <CreatePost />
      <Suspense fallback={<div>Loading</div>}>
        {posts?.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </Suspense>
    </div>
  )
}

export default PostList
