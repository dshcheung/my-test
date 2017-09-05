import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import { createSession } from '../../../actions/session'

import LoginForm from '../../forms/auth/login'

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createSession: bindActionCreators(createSession, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends Component {
  constructor(props) {
    super(props)

    this.createSession = this.createSession.bind(this)
  }

  createSession(values) {
    this.props.createSession(values)
  }

  render() {
    return (
      <div id="page-auth-login" className="container padding-top-20 padding-bottom-20">
        <div className="row">
          <LoginForm
            optClass="col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4"
            onSubmit={this.createSession}
          />
        </div>

        <div className="row">
          <div className="create-account col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
            <span>New to AngelHub? </span>
            <Link to="/auth/signup">Create An Account</Link>
          </div>
        </div>
      </div>
    )
  }
}
