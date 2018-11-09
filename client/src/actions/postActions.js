import axios from 'axios'

import {
  ADD_POST, DELETE_POST, GET_ERRORS, GET_POSTS, POST_LOADING,
} from './types'

// Add post
export const addPost = postData => (dispatch) => {
  axios
    .post('/api/posts', postData)
    .then(res => dispatch({
      type: ADD_POST,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }))
}

// Delete post
export const deletePost = id => (dispatch) => {
  axios
    .delete(`/api/posts/${id}`)
    .then(() => dispatch({
      type: DELETE_POST,
      payload: id,
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }))
}

// Set loading state
export const setPostLoading = () => ({
  type: POST_LOADING,
})

// Get posts
export const getPosts = () => (dispatch) => {
  dispatch(setPostLoading())
  axios
    .get('/api/posts')
    .then(res => dispatch({
      type: GET_POSTS,
      payload: res.data,
    }))
    .catch(() => dispatch({
      type: GET_POSTS,
      payload: null,
    }))
}

// Add like
export const addLike = id => (dispatch) => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(() => dispatch(getPosts()))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }))
}

// Remove like
export const removeLike = id => (dispatch) => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(() => dispatch(getPosts()))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }))
}
