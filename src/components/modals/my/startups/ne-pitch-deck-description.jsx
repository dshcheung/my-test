import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cuMyStartupPitchDeck, CU_MY_STARTUP_PITCH_DECK
} from '../../../../actions/my/startups/pitch-deck'

import MyStartupsPitchDeckDescriptionForm from '../../../forms/my/startups/pitch-deck-description'

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
export default class MyStartupsNEPitchDeckDescriptionModal extends Component {
  constructor(props) {
    super(props)

    this.cuMyStartupPitchDeck = this.cuMyStartupPitchDeck.bind(this)
  }

  cuMyStartupPitchDeck(values) {
    this.props.cuMyStartupPitchDeck(values, this.props.params, () => {
      this.props.close()
    }, this.props.editMode, "Description")
  }

  render() {
    const { close, cuMyStartupPitchDeckInProcess, editMode, description } = this.props

    const keyword = editMode ? "Edit" : "Add"
    const initialValues = editMode ? {
      description: description || ''
    } : undefined

    return (
      <Modal show onHide={close} className="form-modal" bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Pitch Deck Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupsPitchDeckDescriptionForm
            onSubmit={this.cuMyStartupPitchDeck}
            submitInProcess={cuMyStartupPitchDeckInProcess}
            initialValues={initialValues}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
