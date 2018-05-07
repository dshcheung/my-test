import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cuMyStartupProfile, CU_MY_STARTUP_PROFILE
} from '../../../../actions/my/startups/profile'

import MyStartupsHeaderForm from '../../../forms/my/startups/header'

const mapStateToProps = (state) => {
  return {
    startup: _.get(state, 'myCampaign.startup', null),
    cuMyStartupProfileInProcess: _.get(state.requestStatus, CU_MY_STARTUP_PROFILE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cuMyStartupProfile: bindActionCreators(cuMyStartupProfile, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsEHeaderModal extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    this.props.cuMyStartupProfile(values, this.props.params, () => {
      this.props.close()
    }, 'Header')
  }

  render() {
    const { close, cuMyStartupProfileInProcess, startup } = this.props

    return (
      <Modal show onHide={close} className="form-modal" id="modals-my-startups-s-risk">
        <Modal.Header closeButton>
          <Modal.Title>Edit Header</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupsHeaderForm
            onSubmit={this.onSubmit}
            submitInProcess={cuMyStartupProfileInProcess}
            initialValues={{
              avatar: _.get(startup, 'profile.avatar', ''),
              banner: _.get(startup, 'profile.banner', '')
            }}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
