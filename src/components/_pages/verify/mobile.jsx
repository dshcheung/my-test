import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  verifyMyProfile, VERIFY_MY_PROFILE
} from '../../../actions/my/profile'

import VerifyMobileForm from '../../forms/verify/mobile'

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
  constructor(props) {
    super(props)

    this.verifyMyProfile = this.verifyMyProfile.bind(this)
  }

  verifyMyProfile(values) {
    this.props.verifyMyProfile(values)
  }

  render() {
    return (
      <div id="page-verify-mobile" className="container padding-top-20 padding-bottom-20">
        <div className="row">
          <VerifyMobileForm
            optClass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
            onSubmit={this.verifyMyProfile}
            submitInProcess={this.props.verifyMyProfileInProcess}
          />
        </div>
      </div>
    )
  }
}
