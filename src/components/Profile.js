import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import EditProfileModal from './EditProfileModal'

import styles from '../styles/Profile.module.css'

import userAPI from '../api/userAPI'
import postAPI from '../api/postAPI'

import { follow, unfollow } from '../features/auth/authSlice'
import PostGrid from './PostGrid'

const Profile = () => {
  const currUser = useSelector((state) => state.auth.user)

  const dispatch = useDispatch()

  const { username } = useParams()

  const [user, setUser] = useState()

  const [couldFollow, setCouldFollow] = useState(false)

  const [modalVisible, setModalVisible] = useState(null)

  const [posts, setPosts] = useState()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (user) {
          const response = await postAPI.getPostsByUserId(user._id)
          setPosts(response.posts)
        }
      } catch (err) {
        console.log(err)
      }
    }

    fetchPost()
  }, [user])

  useEffect(() => {
    const fetchData = async () => {
      if (username !== currUser.username) {
        try {
          const response = await userAPI.getUserByUsername(username)
          setUser(response.user)
        } catch (err) {
          console.log(err)
        }
      } else {
        setUser(currUser)
      }
    }

    fetchData()
  }, [username, currUser])

  useEffect(() => {
    if (currUser.following.find((userId) => userId === user?._id)) {
      setCouldFollow(false)
    } else {
      setCouldFollow(true)
    }
  }, [user, currUser])

  const handleFollow = async () => {
    if (couldFollow) {
      dispatch(follow(user?._id))
      await userAPI.follow(user?._id)
    } else {
      dispatch(unfollow(user?._id))
      await userAPI.unfollow(user?._id)
    }
  }

  return (
    <div className={`${styles.container}`}>
      <EditProfileModal isOpen={modalVisible} setModalVisible={setModalVisible} />
      <div className={`${styles.header}`}>
        <div className={`${styles.avatar}`}>
          <img src={user?.avatar} alt="Avatar" />
        </div>
        <div className={`${styles.info}`}>
          <h3>
            {user?.fullname}{' '}
            <span
              style={{
                fontFamily: 'sans-serif',
                color: 'gray',
                fontSize: '18px',
              }}
            >
              @{user?.username}
            </span>
          </h3>
          <p>
            {posts?.length} posts | {user?.followers.length} followers | {user?.following.length}{' '}
            following
          </p>
          <p>
            {user?.description ? (
              <span style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>
                <span style={{ fontFamily: 'mainFont' }}>"</span> {user?.description}{' '}
                <span style={{ fontFamily: 'mainFont' }}>"</span>
              </span>
            ) : null}
          </p>
          {username !== currUser.username ? (
            <div className={`${styles.btnList}`}>
              <button
                type="button"
                className={`nes-btn is-${couldFollow ? 'success' : 'warning'} ${styles.btn}`}
                onClick={handleFollow}
                style={{ marginRight: '20px' }}
              >
                <i
                  className={`fas fa-bell${couldFollow ? '' : '-slash'}`}
                  style={{ color: 'black' }}
                ></i>
              </button>
              <button
                type="button"
                className={`nes-btn is-primary ${styles.btn}`}
                style={{ filter: 'hue-rotate(45deg)' }}
              >
                <i className="fas fa-comment-alt" style={{ color: 'black' }}></i>
              </button>
            </div>
          ) : (
            <div className={`${styles.btnList}`}>
              <button
                type="button"
                className={`nes-btn is-primary ${styles.btn}`}
                onClick={() => setModalVisible(true)}
              >
                <i className="fas fa-user-cog" style={{ color: 'black' }}></i>
              </button>
            </div>
          )}
        </div>
      </div>
      <PostGrid posts={posts} />
    </div>
  )
}

export default Profile
