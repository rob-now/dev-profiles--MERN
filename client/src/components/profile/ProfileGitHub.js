import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class ProfileGitHub extends Component {
  state = {
    clientId: '0760d73923c85bc1ee36',
    clientSecret: 'ba6fb9d434099d4fae0addbadb0f9453270b0d42',
    reposCount: 7,
    sort: 'updated',
    order: 'asc',
    repos: [],
  }

  componentDidMount() {
    const { username } = this.props
    const {
      reposCount, sort, order, clientId, clientSecret,
    } = this.state

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${reposCount}&sort=${sort}&order=${order}&client_id=${clientId}&client_secret=${clientSecret}`,
    )
      .then(res => res.json())
      .then((repos) => {
        if (this.refs.myRef) {
          this.setState({
            repos,
          })
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const { repos } = this.state

    const reposItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a
                href={repo.html_url}
                className="text-info"
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </a>
              {/* <Link
                to={repo.html_url}
                className="text-info"
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </Link> */}
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">Stars: {repo.stargazers_count}</span>
            <span className="badge badge-secondary mr-1">Watchers: {repo.watchers_count}</span>
            <span className="badge badge-success">Forks: {repo.forks_count}</span>
          </div>
        </div>
      </div>
    ))

    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest GitHub repositories</h3>
        {reposItems}
      </div>
    )
  }
}

ProfileGitHub.propTypes = {
  username: PropTypes.string.isRequired,
}

export default ProfileGitHub
