import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cMyStartupHighlight, C_MY_STARTUP_HIGHLIGHT,
  uMyStartupHighlight, U_MY_STARTUP_HIGHLIGHT
} from '../../../../actions/my/startups/highlights'

import MyStartupsHighlightForm from '../../../forms/my/startups/highlight'

const mapStateToProps = (state) => {
  return {
    cMyStartupHighlightInProcess: _.get(state.requestStatus, C_MY_STARTUP_HIGHLIGHT),
    uMyStartupHighlightInProcess: _.get(state.requestStatus, U_MY_STARTUP_HIGHLIGHT)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cMyStartupHighlight: bindActionCreators(cMyStartupHighlight, dispatch),
    uMyStartupHighlight: bindActionCreators(uMyStartupHighlight, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsNEHighlightModal extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    if (this.props.editMode) {
      this.props.uMyStartupHighlight(values, {
        ...this.props.params,
        highlightID: this.props.highlight.id
      }, () => {
        this.props.close()
      })
    } else {
      this.props.cMyStartupHighlight(values, this.props.params, () => {
        this.props.close()
      })
    }
  }

  render() {
    const { close, cMyStartupHighlightInProcess, uMyStartupHighlightInProcess, editMode, highlight } = this.props

    const keyword = editMode ? "Edit" : "Add"
    const initialValues = editMode ? {
      detail: _.get(highlight, 'detail', '')
    } : undefined

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Highlight</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupsHighlightForm
            onSubmit={this.onSubmit}
            submitInProcess={cMyStartupHighlightInProcess || uMyStartupHighlightInProcess}
            initialValues={initialValues}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
