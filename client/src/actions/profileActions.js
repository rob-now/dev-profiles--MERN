import axios from 'axios'
import { GET_PROFILE, PROFILE_LOADING } from './types'

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
