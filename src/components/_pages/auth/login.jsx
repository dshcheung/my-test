import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import { createSession, CREATE_SESSION } from '../../../actions/session'

import LoginForm from '../../forms/auth/login'

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
      <div id="page-auth-login" className="container padding-top-20 padding-bottom-20">
        <div className="row">
          <LoginForm
            optClass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
            onSubmit={this.createSession}
            submitInProcess={this.props.createSessionInProcess}
          />
        </div>

        <div className="row">
          <div className="create-account col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <span>New to AngelHub? </span>
            <Link to="/auth/signup">Create An Account</Link>
          </div>
        </div>
      </div>
    )
  }
}
