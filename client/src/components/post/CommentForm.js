import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { addComment } from '../../actions/postActions'

class CommentForm extends Component {
  state = {
    text: '',
    errors: {},
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      })
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    const { user } = this.props.auth
    const { postId } = this.props

    event.preventDefault()

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
    }

    this.props.addComment(postId, newComment)

    this.setState({
      text: '',
    })
  }

  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Write a comment...</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply to post"
                  name="text"
                  value={this.state.text}
                  onChange={this.handleChange}
                  error={this.state.errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
})

export default connect(
  mapStateToProps,
  { addComment },
)(CommentForm)
