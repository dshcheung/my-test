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
      <div id="page-auth-reset-password">
        <div className="row">
          <AuthResetPasswordForm
            optClass="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4"
            onSubmit={this.resetPassword}
            initialValues={{ reset_token: this.props.router.location.query.code }}
            submitInProcess={this.props.resetPasswordInProcess}
          />
        </div>
      </div>
    )
  }
}
