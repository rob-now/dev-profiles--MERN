import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

// Initial state of the store
const initialState = {}

// Create middleware variable which is array of different middlewares
const middleware = [thunk]

// Template store with all 3 arguments (reducer, initial state, enhancer = middleware)
// Use spread operator on middleware to apply all middleware from the array of middlewares
/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer, // Reducer
  initialState, // Initial state
  compose(
    applyMiddleware(...middleware), // Middleware
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
)
/* eslint-enable */

export default store
