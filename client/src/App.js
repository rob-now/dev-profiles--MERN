import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import store from './store'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/authorization/Register'
import Login from './components/authorization/Login'
import Dashboard from './components/dashboard/Dashboard'
import { clearCurrentProfile } from './actions/profileActions'
import PrivateRoute from './components/common/PrivateRoute'

// Check for token
if (localStorage.jwtToken) {
  // Set token in Authorization header
  setAuthToken(localStorage.jwtToken)
  // Decode the token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))
  // Check if token expired
  const currentTime = Date.now() / 1000 // seconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser())
    // Clear current profile
    store.dispatch(clearCurrentProfile())
    // Redirect to login page
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
