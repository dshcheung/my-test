import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cuMyStartupPitchDeck, CU_MY_STARTUP_PITCH_DECK
} from '../../../../actions/my/startups/pitch-decks'

import MyStartupPitchDeckForm from '../../../forms/my/startups/pitch-deck'

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
export default class MyStartupsNEPitchDeckModal extends Component {
  constructor(props) {
    super(props)

    this.cuMyStartupPitchDeck = this.cuMyStartupPitchDeck.bind(this)
  }

  cuMyStartupPitchDeck(values) {
    this.props.cuMyStartupPitchDeck(values, this.props.params, () => {
      this.props.close()
    })
  }

  render() {
    const { close, cuMyStartupPitchDeckInProcess, editMode, attachment } = this.props

    const keyword = editMode ? "Edit" : "Add"
    const initialValues = editMode ? {
      title: _.get(attachment, 'title', '')
    } : undefined

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Pitch Deck</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupPitchDeckForm
            onSubmit={this.cuMyStartupPitchDeck}
            submitInProcess={cuMyStartupPitchDeckInProcess}
            initialValues={initialValues}
            fileUrl={_.get(attachment, 'file.original', null)}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
