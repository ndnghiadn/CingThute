import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import styles from '../styles/Widgets.module.css'

const Widgets = () => {
  const { avatar, username } = useSelector((state) => state.auth.user)
  let { pathname } = useLocation()

  return (
    <section className={`${styles.dFlex}`}>
      <Link to="/">
        <i className={`${styles.icon} fa${pathname === '/' ? '' : 'l'} fa-home fa-2x`}></i>
      </Link>
      <Link to="/messages">
        <i
          className={`${styles.icon} fa${
            pathname === '/messages' ? 's' : 'r'
          } fa-comment-dots fa-2x`}
        ></i>
      </Link>
      <i className={`${styles.icon} far fa-dot-circle fa-2x`}></i>
      <Link to={`/${username}`}>
        <img src={avatar} alt="Avatar" className={`${styles.avatar}`} />
      </Link>
    </section>
  )
}

export default Widgets
