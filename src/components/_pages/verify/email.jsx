import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  verifyMyProfile, VERIFY_MY_PROFILE
} from '../../../actions/my/profile'

import VerifyEmailForm from '../../forms/verify/email'

const mapStateToProps = (state) => {
  return {
    verifyMyProfileInProcess: _.get(state.requestStatus, VERIFY_MY_PROFILE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyMyProfile: bindActionCreators(verifyMyProfile, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class VerifyEmail extends Component {
  render() {
    return (
      <div id="page-verify-email" className="container padding-top-20 padding-bottom-20">
        <div className="row">
          <VerifyEmailForm
            optClass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
            onSubmit={this.props.verifyMyProfile}
            submitInProcess={this.props.verifyMyProfileInProcess}
          />
        </div>
      </div>
    )
  }
}
