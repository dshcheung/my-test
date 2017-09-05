import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import LoginForm from '../../forms/auth/login'

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends Component {
  render() {
    return (
      <div id="page-auth-login" className="container clearfix">
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
