import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  updateMyStartupHighlight, UPDATE_MY_STARTUP_HIGHLIGHT
} from '../../../../actions/my/startups/highlights'

import MyStartupHighlightForm from '../../../forms/my/startups/highlight'

const mapStateToProps = (state) => {
  return {
    updateMyStartupHighlightInProcess: _.get(state.requestStatus, UPDATE_MY_STARTUP_HIGHLIGHT)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMyStartupHighlight: bindActionCreators(updateMyStartupHighlight, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsEditHighlightModal extends Component {
  constructor(props) {
    super(props)

    this.updateMyStartupHighlight = this.updateMyStartupHighlight.bind(this)
  }

  updateMyStartupHighlight(values) {
    this.props.updateMyStartupHighlight(values, {
      ...this.props.params,
      highlightID: this.props.highlight.id
    }, () => {
      this.props.close()
    })
  }

  render() {
    const { close, updateMyStartupHighlightInProcess, highlight } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Highlight</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupHighlightForm
            onSubmit={this.updateMyStartupHighlight}
            submitInProcess={updateMyStartupHighlightInProcess}
            initialValues={{
              detail: _.get(highlight, 'detail', '')
            }}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
