import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import Post from './Post'

import postAPI from '../api/postAPI'

const FullPost = () => {
  const { postId } = useParams()

  const [post, setPost] = useState()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postAPI.getPost(postId)
        if (response) setPost(response.post)
      } catch (err) {
        console.log(err)
      }
    }

    fetchPost()
  }, [postId])

  return (
    <div>
      <Post post={post} />
    </div>
  )
}

export default FullPost
