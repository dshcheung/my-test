import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  createMyStartup, CREATE_MY_STARTUP
} from '../../../../actions/my/startups'

import MyStartupForm from '../../../forms/my/startups/startup'

const mapStateToProps = (state) => {
  return {
    createMyStartupInProcess: _.get(state.requestStatus, CREATE_MY_STARTUP)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMyStartup: bindActionCreators(createMyStartup, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AddMyStartupModal extends Component {
  constructor(props) {
    super(props)

    this.createMyStartup = this.createMyStartup.bind(this)
  }

  createMyStartup(values) {
    this.props.createMyStartup(values, () => {
      this.props.close()
    })
  }

  render() {
    const { close, createMyStartupInProcess } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Startup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupForm
            onSubmit={this.createMyStartup}
            submitInProcess={createMyStartupInProcess}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
