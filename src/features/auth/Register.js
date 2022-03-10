import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { register } from './authSlice'

import styles from '../../styles/Register.module.css'

const Register = () => {
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    username: '',
    password: '',
    fullname: '',
    email: '',
    gender: '',
  })
  const [hidePass, setHidePass] = useState(true)

  const { username, password, fullname, email, gender } = userData

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (e) => {
    setUserData({
      ...userData,
      gender: e.target.value,
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(register(userData))
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <form className="nes-container is-rounded is-centered" onSubmit={handleLogin}>
          <h3 className={styles.title}>Register</h3>
          <div className="nes-field is-inline">
            <label htmlFor="fullname_field">Fullname:</label>
            <input
              className="nes-input"
              id="fullname_field"
              type="text"
              name="fullname"
              onChange={handleInputChange}
            />
          </div>
          <div className="nes-field is-inline">
            <label htmlFor="email_field">Email:</label>
            <input
              className="nes-input"
              id="email_field"
              type="email"
              name="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="nes-field is-inline">
            <label htmlFor="gender_field">Gender:</label>
            <div className={`nes-select ${styles.gender_field}`}>
              <select required id="gender_field" defaultValue="" onChange={handleSelectChange}>
                <option value="" hidden>
                  Select
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
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
            className={`nes-btn ${
              username && password && fullname && email && gender ? '' : 'is-disabled'
            }`}
            disabled={username && password && fullname && email && gender ? null : true}
          >
            Lets go
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
