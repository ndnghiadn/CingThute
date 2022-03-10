import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { disable, enable, search } from '../features/search/searchSlice'

import styles from '../styles/TopNav.module.css'

import Widgets from './Widgets'

const TopNav = () => {
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    if (e.target.value) {
      dispatch(enable())
      dispatch(search(e.target.value))
    } else {
      dispatch(disable())
    }
  }

  const handleBlur = (e) => {
    dispatch(disable())
    e.target.value = ''
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <p className={styles.logo}>Cing-Thute</p>
        </Link>
        <div className={`${styles.inputContainer}`}>
          <input
            type="text"
            className={`${styles.inputField}`}
            onBlur={handleBlur}
            onChange={handleInputChange}
          />
        </div>
        <Widgets />
      </div>
    </div>
  )
}

export default TopNav
