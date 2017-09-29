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
  render() {
    return (
      <div id="page-auth-forgot-password" className="container padding-top-20 padding-bottom-20">
        <div className="row">
          <AuthForgotPasswordForm
            optClass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
            onSubmit={this.props.requestForgetPassword}
            submitInProcess={this.props.requestForgetPasswordInProcess}
          />
        </div>
      </div>
    )
  }
}
