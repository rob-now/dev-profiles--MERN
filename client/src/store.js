import { createStore, applyMiddleware } from 'redux'

// Template store with all 3 arguments (reducer, initial state, enhancer = middleware)
const store = createStore(() => [], {}, applyMiddleware())

export default store
