import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import styles from '../../styles/Searchbox.module.css'

import userApi from '../../api/userAPI'

const Searchbox = () => {
  const browserHistory = useHistory()

  const content = useSelector((state) => state.search.content)

  const [list, setList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      if (content) {
        const response = await userApi.getUsersByUsername(content)
        setList(response.users)
      } else {
        setList([])
      }
    }

    fetchData()

    return () => {}
  }, [content])

  return (
    <div className={`${styles.box}`}>
      {list.map((item, index) => (
        <div
          key={index}
          onMouseDown={() => browserHistory.push(`/${item.username}`)}
          className={`${styles.item}`}
        >
          <img className={`${styles.avatar}`} src={item.avatar} alt="Avatar" />
          <p className={`${styles.username}`}>{item.username}</p>
        </div>
      ))}
    </div>
  )
}

export default Searchbox
