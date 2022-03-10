import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import postAPI from '../api/postAPI'

import styles from '../styles/CreatePost.module.css'

const CreatePost = () => {
  const [file, setFile] = useState()

  const [content, setContent] = useState()

  const [contentVisibility, setContentVisibility] = useState(false)

  useEffect(() => {
    if (contentVisibility) document.getElementById('content').focus()
  }, [contentVisibility])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') setContentVisibility(false)
  }

  const handlePost = async (e) => {
    e.preventDefault()
    try {
      const data = new FormData()
      data.append('image', file)
      data.append('content', content)
      const response = await postAPI.createPost(data)
      if (response) {
        toast(response.msg)
        setFile(null)
        setContent('')
      }
    } catch (err) {
      toast.error('You have to post an accordant picture.')
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <button
        onClick={handlePost}
        className={styles.uploadBtn}
        style={contentVisibility ? { display: 'none' } : null}
      >
        <i class="fas fa-arrow-alt-circle-up"></i>
      </button>
      <label
        htmlFor="fileInput"
        className={styles.imageBtn}
        style={contentVisibility ? { display: 'none' } : null}
      >
        <i class="far fa-image"></i>
      </label>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ display: 'none' }}
      />
      {contentVisibility ? (
        <input
          className={styles.content}
          id="content"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={() => setContentVisibility(false)}
          onKeyDown={handleKeyDown}
          style={contentVisibility ? { width: '80%' } : null}
        />
      ) : (
        <i
          class="fas fa-edit"
          onClick={() => {
            setContentVisibility(true)
          }}
          style={{ fontSize: '24px' }}
        ></i>
      )}
    </div>
  )
}

export default CreatePost
