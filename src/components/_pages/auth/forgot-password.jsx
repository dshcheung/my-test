import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { requestForgetPassword, REQUEST_FORGET_PASSWORD } from '../../../actions/session'

import AuthForgotPasswordForm from '../../forms/auth/forgot-password'

const mapStateToProps = (state) => {
  return {
    requestForgetPasswordInProcess: _.get(state.requestStatus, REQUEST_FORGET_PASSWORD)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestForgetPassword: bindActionCreators(requestForgetPassword, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ForgotPassword extends Component {
  constructor(props) {
    super(props)

    this.requestForgetPassword = this.requestForgetPassword.bind(this)
  }

  requestForgetPassword(values) {
    this.props.requestForgetPassword(values)
  }

  render() {
    return (
      <div id="page-auth-forgot-password" className="margin-top-50">
        <AuthForgotPasswordForm
          optClass="col-sm-6 col-sm-offset-3"
          onSubmit={this.requestForgetPassword}
          submitInProcess={this.props.requestForgetPasswordInProcess}
        />
      </div>
    )
  }
}
