import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  createMyStartupPitchDeck, CREATE_MY_STARTUP_PITCH_DECK
} from '../../../../actions/my/startups/pitch-decks'

import MyStartupPitchDeckForm from '../../../forms/my/startups/pitch-deck'

const mapStateToProps = (state) => {
  return {
    createMyStartupPitchDeckInProcess: _.get(state.requestStatus, CREATE_MY_STARTUP_PITCH_DECK)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMyStartupPitchDeck: bindActionCreators(createMyStartupPitchDeck, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsAddPitchDeckModal extends Component {
  constructor(props) {
    super(props)

    this.createMyStartupPitchDeck = this.createMyStartupPitchDeck.bind(this)
  }

  createMyStartupPitchDeck(values) {
    this.props.createMyStartupPitchDeck(values, this.props.params, () => {
      this.props.close()
    })
  }

  render() {
    const { close, createMyStartupPitchDeckInProcess } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Pitch Deck</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupPitchDeckForm
            onSubmit={this.createMyStartupPitchDeck}
            submitInProcess={createMyStartupPitchDeckInProcess}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
