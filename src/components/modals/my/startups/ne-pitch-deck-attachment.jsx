import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cuMyStartupPitchDeck, CU_MY_STARTUP_PITCH_DECK
} from '../../../../actions/my/startups/pitch-deck'

import MyStartupsPitchDeckAttachmentForm from '../../../forms/my/startups/pitch-deck-attachment'

const mapStateToProps = (state) => {
  return {
    cuMyStartupPitchDeckInProcess: _.get(state.requestStatus, CU_MY_STARTUP_PITCH_DECK)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cuMyStartupPitchDeck: bindActionCreators(cuMyStartupPitchDeck, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsNEPitchDeckAttachmentModal extends Component {
  constructor(props) {
    super(props)

    this.cuMyStartupPitchDeck = this.cuMyStartupPitchDeck.bind(this)
  }

  cuMyStartupPitchDeck(values) {
    this.props.cuMyStartupPitchDeck({
      attachments: [
        {
          id: _.get(this.props.attachment, 'id', null),
          title: _.get(values, 'title', null),
          file: _.get(values, 'file[0]', null)
        }
      ]
    }, this.props.params, () => {
      this.props.close()
    }, this.props.editMode, "Attachment")
  }

  render() {
    const { close, cuMyStartupPitchDeckInProcess, editMode, attachment } = this.props

    const keyword = editMode ? "Edit" : "Add"
    const initialValues = editMode ? {
      title: _.get(attachment, 'title', ''),
      file: _.get(attachment, 'file', '')
    } : undefined

    return (
      <Modal show onHide={close} className="form-modal" bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Pitch Deck Attachment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupsPitchDeckAttachmentForm
            onSubmit={this.cuMyStartupPitchDeck}
            submitInProcess={cuMyStartupPitchDeckInProcess}
            initialValues={initialValues}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
