import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'

import styles from '../styles/Sidebar.module.css'

const Sidebar = () => {
  const dispatch = useDispatch()

  const { avatar, username } = useSelector((state) => state.auth.user)

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    dispatch(logout())
  }

  return (
    <div className={`${styles.container}`}>
      <div className={`user ${styles.user}`}>
        <Link
          to={`/${username}`}
          className={`userLeft ${styles.userLeft}`}
          style={{ textDecoration: 'none' }}
        >
          <img className={`${styles.avatar}`} src={avatar} alt="Avatar" />
          <p className={`${styles.username}`}>{username}</p>
        </Link>
        <div className="user-right">
          <button onClick={handleLogout} className="nes-btn is-error" style={{ fontSize: '20px' }}>
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
      <div className="rating"></div>
      <div className="credit" style={{ marginTop: '10px' }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: 'gray' }}>
          © 2021 Cing-Thute
        </p>
      </div>
    </div>
  )
}

export default Sidebar
