import axios from 'axios'
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
} from './types'

// Profile loading
export const setProfileLoading = () => ({
  type: PROFILE_LOADING,
})

// GET current profile
export const getCurrentProfile = () => (dispatch) => {
  // Let reducer know that content is loading
  dispatch(setProfileLoading())
  // Getting profile
  axios
    .get('api/profile')
    // Dispatch GET_PROFILE to reducer
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data,
    }))
    // If no profile found, dispatch GET_PROFILE with empty object
    .catch(() => dispatch({
      type: GET_PROFILE,
      payload: {},
    }))
}

// Create profile
export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post('/api/profile', profileData)
    .then(() => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }))
}

// Add experience
export const addExperience = (expData, history) => (dispatch) => {
  axios
    .post('api/profile/experience', expData)
    .then(() => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }))
}

// Add education
export const addEducation = (eduData, history) => (dispatch) => {
  axios
    .post('api/profile/education', eduData)
    .then(() => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }))
}

// Delete experience
export const deleteExperience = expId => (dispatch) => {
  axios
    .delete(`/api/profile/experience/${expId}`)
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }))
}

// Delete education
export const deleteEducation = eduId => (dispatch) => {
  axios
    .delete(`/api/profile/education/${eduId}`)
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }))
}

// Delete account and profile
export const deleteAccount = () => (dispatch) => {
  if (window.confirm('Are you sure? This cannot be undone!')) {
    axios
      .delete('/api/profile')
      .then(() => dispatch({
        type: SET_CURRENT_USER,
        payload: {},
      }))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }))
  }
}

// Clear profile
export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE,
})
