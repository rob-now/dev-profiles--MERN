import React, { Component } from 'react'
import spinner from './spinner.gif'

class Spinner extends Component {
  render() {
    return (
      <img
        src={spinner}
        style={{
          width: '64px',
          margin: 'auto',
          display: 'block',
        }}
        alt="Loading"
      />
    )
  }
}

export default Spinner
