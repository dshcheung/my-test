import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import { createSession, CREATE_SESSION } from '../../../actions/session'

import AuthLoginForm from '../../forms/auth/login'

const mapStateToProps = (state) => {
  return {
    createSessionInProcess: _.get(state.requestStatus, CREATE_SESSION)
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
      <div id="page-auth-login">
        <div className="row">
          <AuthLoginForm
            optClass="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4"
            onSubmit={this.createSession}
            submitInProcess={this.props.createSessionInProcess}
          />
        </div>

        <div className="row">
          <div className="create-account col-sm-4 col-sm-offset-4">
            <span>New to AngelHub? </span>
            <Link to="/auth/signup" className="text-uppercase">Create An Account</Link>
          </div>
        </div>
      </div>
    )
  }
}
