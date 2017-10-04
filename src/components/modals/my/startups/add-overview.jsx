import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  createMyStartupProfile, CREATE_MY_STARTUP_PROFILE
} from '../../../../actions/my/startups/profile'

import MyStartupOverviewForm from '../../../forms/my/startups/overview'

const mapStateToProps = (state) => {
  return {
    createMyStartupProfileInProcess: _.get(state.requestStatus, CREATE_MY_STARTUP_PROFILE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMyStartupProfile: bindActionCreators(createMyStartupProfile, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsAddOverviewModal extends Component {
  constructor(props) {
    super(props)

    this.createMyStartupProfile = this.createMyStartupProfile.bind(this)
  }

  createMyStartupProfile(values) {
    this.props.createMyStartupProfile(values, this.props.params, () => {
      this.props.close()
    })
  }

  render() {
    const { close, createMyStartupProfileInProcess } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Overview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupOverviewForm
            onSubmit={this.createMyStartupProfile}
            submitInProcess={createMyStartupProfileInProcess}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
