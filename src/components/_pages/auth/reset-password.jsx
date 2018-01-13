import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { resetPassword, RESET_PASSWORD } from '../../../actions/my/profile'

import AuthResetPasswordForm from '../../forms/auth/reset-password'

const mapStateToProps = (state) => {
  return {
    resetPasswordInProcess: _.get(state.requestStatus, RESET_PASSWORD)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: bindActionCreators(resetPassword, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ResetPassword extends Component {
  constructor(props) {
    super(props)

    this.resetPassword = this.resetPassword.bind(this)
  }

  resetPassword(values) {
    this.props.resetPassword(values)
  }

  render() {
    return (
      <div id="page-auth-reset-password" className="container padding-top-20 padding-bottom-20">
        <div className="row">
          <AuthResetPasswordForm
            optClass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
            onSubmit={this.resetPassword}
            submitInProcess={this.props.resetPasswordInProcess}
          />
        </div>
      </div>
    )
  }
}
