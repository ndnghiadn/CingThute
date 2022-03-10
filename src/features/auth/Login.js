import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from './authSlice'
import { Link } from 'react-router-dom'

import styles from '../../styles/Login.module.css'

const Login = () => {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({ username: '', password: '' })
  const [hidePass, setHidePass] = useState(true)

  const { username, password } = userData

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(login(userData))
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <form className="nes-container is-rounded is-centered" onSubmit={handleLogin}>
          <h3 className={styles.title}>Login</h3>
          <div className="nes-field is-inline">
            <label htmlFor="name_field">Username:</label>
            <input
              className="nes-input"
              id="name_field"
              type="text"
              name="username"
              onChange={handleInputChange}
            />
          </div>
          <div className="nes-field is-inline">
            <label htmlFor="pass_field">Password:</label>
            <input
              className="nes-input"
              id="pass_field"
              type={hidePass ? 'password' : 'text'}
              name="password"
              onChange={handleInputChange}
            />
            <small onClick={() => setHidePass(!hidePass)}>{hidePass ? 'Show' : 'Hide'}</small>
          </div>
          <button
            type="submit"
            className={`nes-btn ${username && password ? '' : 'is-disabled'}`}
            disabled={username && password ? null : true}
          >
            Lets go
          </button>
          <p className={styles.register}>
            New to Cing-Thute?
            <br />
            <Link to="/register">
              <span>Register</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
