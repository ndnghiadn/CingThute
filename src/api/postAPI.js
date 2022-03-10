import axiosClient from './axiosClient'

const postAPI = {
  getPosts() {
    return axiosClient.get(`/post/getPosts`)
  },
  star(postId) {
    return axiosClient.get(`/post/star/${postId}`)
  },
  unstar(postId) {
    return axiosClient.get(`/post/unstar/${postId}`)
  },
  getPostsByUserId(userId) {
    return axiosClient.get(`/post/getPostsByUserId/${userId}`)
  },
  createPost(data) {
    return axiosClient.post(`/post/createPost`, data)
  },
  getPost(postId) {
    return axiosClient.get(`/post/getPost/${postId}`)
  },
}

export default postAPI
