import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { resetPassword, RESET_PASSWORD } from '../../../actions/my/profile'

import ResetPasswordForm from '../../forms/auth/reset-password'

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
  render() {
    return (
      <div id="page-auth-reset-password" className="container padding-top-20 padding-bottom-20">
        <div className="row">
          <ResetPasswordForm
            optClass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
            onSubmit={this.props.resetPassword}
            submitInProcess={this.props.resetPasswordInProcess}
          />
        </div>
      </div>
    )
  }
}