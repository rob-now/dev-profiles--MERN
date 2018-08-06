import { TEST_DISPATCH } from './types'

// Action creator
export const registerUser = userData => ({
  type: TEST_DISPATCH,
  payload: userData,
})
