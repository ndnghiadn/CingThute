import axiosClient from './axiosClient'

const userAPI = {
  getCurrentUser() {
    return axiosClient.get('/user/getCurrentUser')
  },
  getUsersByUsername(username) {
    return axiosClient.get(`/user/getUsersByUsername/${username}`)
  },
  getUserByUsername(username) {
    return axiosClient.get(`/user/getUserByUsername/${username}`)
  },
  follow(userId) {
    return axiosClient.get(`/user/follow/${userId}`)
  },
  unfollow(userId) {
    return axiosClient.get(`/user/unfollow/${userId}`)
  },
  setAvatarAndDesc(data) {
    return axiosClient.post(`/user/setAvatarAndDesc`, data)
  },
  setDesc(desc) {
    return axiosClient.post(`/user/setDesc`, { desc })
  },
}

export default userAPI
