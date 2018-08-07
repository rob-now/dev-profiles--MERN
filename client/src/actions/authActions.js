import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import setAuthToken from '../utils/setAuthToken'

// Action creators

// Register user
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post('/api/users/register', userData)
    .then((res) => {
      history.push('/login')
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }))
}

// Login user
// Set logged in user
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded,
})

// Get User Token
export const loginUser = userData => (dispatch) => {
  axios
    .post('/api/users/login', userData)
    .then((res) => {
      // Save to localStorage
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      // Set token to Authorization header
      setAuthToken(token)
      // Decode token to get user data
      const decoded = jwt_decode(token)
      // Set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }))
}

// Logout user
export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken')
  // Remove Authorization header
  setAuthToken(false)
  // Set current user to empty object
  // which automatically sets isAuthenticated to false,
  // because the payload object will be empty
  dispatch(setCurrentUser({}))
}
