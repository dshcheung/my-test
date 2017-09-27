import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  updateMyProfile, UPDATE_MY_PROFILE
} from '../../../actions/my/profile'

import MyProfileForm from '../../forms/my/profile'

const mapStateToProps = (state) => {
  return {
    updateMyProfileInProcess: _.get(state.requestStatus, UPDATE_MY_PROFILE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMyProfile: bindActionCreators(updateMyProfile, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class EditMyProfileModal extends Component {
  constructor(props) {
    super(props)

    this.updateMyProfile = this.updateMyProfile.bind(this)
  }

  updateMyProfile(values) {
    this.props.updateMyProfile(values, () => {
      this.props.close()
    })
  }

  render() {
    const { close, updateMyProfileInProcess, profile } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyProfileForm
            onSubmit={this.updateMyProfile}
            submitInProcess={updateMyProfileInProcess}
            avatarUrl={_.get(profile, "avatar.original")}
            bannerUrl={_.get(profile, "banner.original")}
            initialValues={{
              firstName: _.get(profile, "first_name", ""),
              lastName: _.get(profile, "last_name", ""),
              bio: _.get(profile, "bio", "")
            }}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
