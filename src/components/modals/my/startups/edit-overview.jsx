import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  updateMyStartupProfile, UPDATE_MY_STARTUP_PROFILE
} from '../../../../actions/my/startups/profile'

import MyStartupOverviewForm from '../../../forms/my/startups/overview'

const mapStateToProps = (state) => {
  return {
    updateMyStartupProfileInProcess: _.get(state.requestStatus, UPDATE_MY_STARTUP_PROFILE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMyStartupProfile: bindActionCreators(updateMyStartupProfile, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsEditOverviewModal extends Component {
  constructor(props) {
    super(props)

    this.updateMyStartupProfile = this.updateMyStartupProfile.bind(this)
  }

  updateMyStartupProfile(values) {
    this.props.updateMyStartupProfile(values, this.props.params, () => {
      this.props.close()
    })
  }

  render() {
    const { close, updateMyStartupProfileInProcess, profile: { overview } } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Overview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupOverviewForm
            onSubmit={this.updateMyStartupProfile}
            submitInProcess={updateMyStartupProfileInProcess}
            initialValues={{
              overview: overview || ''
            }}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
