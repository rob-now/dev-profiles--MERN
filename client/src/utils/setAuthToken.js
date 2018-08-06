import axios from 'axios'

const setAuthToken = (token) => {
  if (token) {
    // Always attach token to Authorization header
    axios.defaults.headers.common.Authorization = token
  } else {
    // Remove Authorization header
    delete axios.defaults.header.common.Authorization
  }
}

export default setAuthToken
