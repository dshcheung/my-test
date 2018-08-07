import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { scrollTop } from '../../../../services/utils'

import { updateMyProfile, UPDATE_MY_PROFILE } from '../../../../actions/my/profile'

import ProfileInvestorUpdateForm from '../../../forms/profile/investor-update'

import SharedOthersSideTitle from '../../../shared/others/side-title'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session'),
    updateMyProfileInProcess: _.get(state.requestStatus, UPDATE_MY_PROFILE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMyProfile: bindActionCreators(updateMyProfile, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyInvestorValidationsVerification extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sideTitleNumber: 1,
      updateUserStep: true,
      dummyTest: false
    }

    this.onUpdateMyProfile = this.onUpdateMyProfile.bind(this)
  }

  onUpdateMyProfile(values) {
    this.props.updateMyProfile(values, () => {
      this.state({ sideTitleNumber: 2, updateUserStep: false, dummyTest: true })
      scrollTop()
    })
  }

  updateUserRender() {
    return (
      <ProfileInvestorUpdateForm
        optClass="col-sm-6"
        onSubmit={this.updateMyProfile}
        initialValues={{
          chinese_name: '',
          hkid: '',
          nationality: '',
          residence: '',
          date_of_birth: ''
        }}
        submitInProcess={this.props.updateMyProfileInProcess}
      />
    )
  }

  render() {
    const { sideTitleNumber, updateUserStep } = this.state

    return (
      <div id="page-my-investor-validations-verification">
        <SharedOthersSideTitle title="investor" number={sideTitleNumber} optClass="hidden-xs col-sm-3 col-md-offset-1 col-md-2" />

        { updateUserStep && this.updateUserRender() }
      </div>
    )
  }
}
