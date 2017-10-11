import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cMyStartup, C_MY_STARTUP,
  uMyStartup, U_MY_STARTUP
} from '../../../../actions/my/startups'

import MyStartupNameForm from '../../../forms/my/startups/name'

const mapStateToProps = (state) => {
  return {
    cMyStartupInProcess: _.get(state.requestStatus, C_MY_STARTUP),
    uMyStartupInProcess: _.get(state.requestStatus, U_MY_STARTUP)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cMyStartup: bindActionCreators(cMyStartup, dispatch),
    uMyStartup: bindActionCreators(uMyStartup, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsNEStartupModal extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    if (this.props.editMode) {
      this.props.uMyStartup(values, this.props.params, () => {
        this.props.close()
      })
    } else {
      this.props.cMyStartup(values, () => {
        this.props.close()
      })
    }
  }

  render() {
    const { close, cMyStartupInProcess, uMyStartupInProcess, editMode, name } = this.props

    const keyword = editMode ? "Edit Startup Name" : "Add Startup"
    const initialValues = editMode ? {
      name: name || ''
    } : undefined

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>{keyword}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupNameForm
            onSubmit={this.onSubmit}
            submitInProcess={cMyStartupInProcess || uMyStartupInProcess}
            initialValues={initialValues}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
