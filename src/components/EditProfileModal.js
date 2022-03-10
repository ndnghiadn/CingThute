import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setAvtAndDesc, setDescription } from '../features/auth/authSlice'

import userAPI from '../api/userAPI'

import styles from '../styles/EditProfileModal.module.css'

const EditProfileModal = ({ isOpen, setModalVisible }) => {
  const { description } = useSelector((state) => state.auth.user)

  const dispatch = useDispatch()

  const [file, setFile] = useState()

  const [desc, setDesc] = useState(description ? description : '')

  const descLength = 50

  const handleSave = async () => {
    setModalVisible(null)
    if (desc.length <= descLength) {
      if (!file) {
        if (desc !== description) {
          await userAPI.setDesc(desc)
          dispatch(setDescription(desc))
        }
      } else {
        const data = new FormData()
        data.append('avatar', file)
        data.append('desc', desc)
        try {
          const response = await userAPI.setAvatarAndDesc(data)
          dispatch(
            setAvtAndDesc({
              avatar: `${process.env.REACT_APP_SERVER_URL}/images/avatar/${response?.filename}`,
              desc,
            })
          )
        } catch (err) {
          console.log(err)
        }
      }
    }
  }

  return (
    <dialog open={isOpen} className={`nes-dialog ${styles.modal}`}>
      <form method="dialog">
        <div className={`${styles.avatar}`}>
          <label htmlFor="fileInput">Avatar</label>
          <label
            className={styles.fileBtn}
            style={file ? { border: '2px solid var(--whitepink)' } : {}}
            htmlFor="fileInput"
          >
            Choose an image
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className={`${styles.desc}`}>
          <div className={`${styles.desc_header}`}>
            <label htmlFor="descText">Description</label>
            <p style={{ color: `${desc.length > descLength ? 'red' : 'green'}` }}>
              {desc.length}/{descLength}
            </p>
          </div>
          <input
            type="text"
            id="descText"
            className="nes-input"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          ></input>
          {desc.length > 50 ? (
            <span style={{ fontFamily: 'sans-serif', color: 'red' }}>
              *Description must be shorter
            </span>
          ) : null}
        </div>
        <div className={`${styles.buttons}`}>
          <button className="nes-btn" onClick={() => setModalVisible(null)}>
            Cancel
          </button>
          <button className="nes-btn is-primary" onClick={handleSave}>
            <i className="far fa-save fa-2x"></i>
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default EditProfileModal
