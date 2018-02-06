import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  uMyStartupProfile, U_MY_STARTUP_PROFILE
} from '../../../../actions/my/startups/profile'

import MyStartupsHeaderForm from '../../../forms/my/startups/header'

const mapStateToProps = (state) => {
  return {
    startup: _.get(state, 'myCampaign.startup', null),
    uMyStartupProfileInProcess: _.get(state.requestStatus, U_MY_STARTUP_PROFILE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uMyStartupProfile: bindActionCreators(uMyStartupProfile, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsEHeaderModal extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    this.props.uMyStartupProfile(values, this.props.params, () => {
      this.props.close()
    }, 'Header')
  }

  render() {
    const { close, uMyStartupProfileInProcess, startup } = this.props

    return (
      <Modal show onHide={close} className="form-modal" id="modals-my-startups-s-risk">
        <Modal.Header closeButton>
          <Modal.Title>Edit Header</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupsHeaderForm
            onSubmit={this.onSubmit}
            submitInProcess={uMyStartupProfileInProcess}
            bannerUrl={_.get(startup, 'profile.banner.original', '')}
            avatarUrl={_.get(startup, 'profile.avatar.original', '')}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
