import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  createMyStartupHighlight, CREATE_MY_STARTUP_HIGHLIGHT
} from '../../../../actions/my/startups/highlights'

import MyStartupHighlightForm from '../../../forms/my/startups/highlight'

const mapStateToProps = (state) => {
  return {
    createMyStartupHighlightInProcess: _.get(state.requestStatus, CREATE_MY_STARTUP_HIGHLIGHT)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMyStartupHighlight: bindActionCreators(createMyStartupHighlight, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsAddHighlightModal extends Component {
  constructor(props) {
    super(props)

    this.createMyStartupHighlight = this.createMyStartupHighlight.bind(this)
  }

  createMyStartupHighlight(values) {
    this.props.createMyStartupHighlight(values, this.props.params, () => {
      this.props.close()
    })
  }

  render() {
    const { close, createMyStartupHighlightInProcess } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Highlight</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupHighlightForm
            onSubmit={this.createMyStartupHighlight}
            submitInProcess={createMyStartupHighlightInProcess}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
