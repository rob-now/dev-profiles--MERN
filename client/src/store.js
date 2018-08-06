import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// Create middleware variable which is array of different middlewares
const middleware = [thunk]

// Template store with all 3 arguments (reducer, initial state, enhancer = middleware)
// Use spread operator on middleware to apply all middleware from the array of middlewares
const store = createStore(
  () => [], // Reducer
  {}, // Initial state
  applyMiddleware(...middleware), // Middleware
)

export default store
