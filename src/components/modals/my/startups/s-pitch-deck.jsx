import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

// import {
//   cuMyStartupPitchDeck, CU_MY_STARTUP_PITCH_DECK
// } from '../../../../actions/my/startups/pitch-deck'

import MyStartupsNEPitchDeckDescriptionModal from './ne-pitch-deck-description'
import MyStartupsNEPitchDeckAttachmentModal from './ne-pitch-deck-attachment'

const mapStateToProps = () => {
  return {
    // cuMyStartupPitchDeckInProcess: _.get(state.requestStatus, CU_MY_STARTUP_PITCH_DECK)
  }
}

const mapDispatchToProps = () => {
  return {
    // cuMyStartupPitchDeck: bindActionCreators(cuMyStartupPitchDeck, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsSPitchDeckModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sPitchDeck: true
    }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open(modalName, stateEditMode, editInfo, editIndex) {
    this.setState({ sPitchDeck: false, [modalName]: true, stateEditMode, editInfo, editIndex })
  }

  close(modalName) {
    this.setState({ sPitchDeck: true, [modalName]: false, stateEditMode: false, editInfo: null, editIndex: null })
  }

  render() {
    const { close, editMode, pitchDeck, params } = this.props
    const { stateEditMode, editInfo } = this.state

    const description = _.get(pitchDeck, 'description', '')
    const attachments = _.get(pitchDeck, 'attachments', [])

    const hasDescription = !!description
    const hasAttachments = attachments.length > 0

    const descriptionIconClass = hasDescription ? "fa-pencil" : "fa-plus"
    const keyword = editMode ? "Edit" : "Add"

    return (
      <Modal show onHide={close} className={`form-modal ${!this.state.sPitchDeck && 'hide'}`} id="modals-my-startups-s-pitch-deck">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Pitch Deck</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className="description">
            <div className="h3 margin-top-0">
              Description
              <button
                className="btn btn-info pull-right"
                onClick={() => { this.open('nePitchDeckDescription', hasDescription, description) }}
              ><i className={`fa ${descriptionIconClass}`} /></button>
            </div>
            {
              hasDescription ? (
                <div dangerouslySetInnerHTML={{ __html: htmlDecode(description) }} />
              ) : (
                <div>Click Add Icon To Add Description</div>
              )
            }
          </section>

          <hr />

          <section className="attachments">
            <div className="h3 margin-top-0">
              Attachments
              <button
                className="btn btn-info pull-right"
                onClick={() => { this.open('nePitchDeckAttachment', false) }}
              ><i className="fa fa-plus" /></button>
            </div>
            {
              hasAttachments ? (
                <ul className="attachment-list">
                  {
                    attachments.map((attachment, i) => {
                      const file = _.get(attachment, 'file.original')
                      const title = _.get(attachment, 'title')

                      return (
                        <li key={i} className="attachment">
                          <button
                            className="btn btn-info edit pull-right"
                            onClick={() => { this.open("nePitchDeckAttachment", true, attachment, i) }}
                          >
                            <i className="fa fa-pencil" />
                          </button>
                          <button
                            className="btn btn-danger btn-outline delete pull-right"
                          >
                            <i className="fa fa-trash" />
                          </button>
                          <a href={file} className="btn btn-success">
                            {title}
                            <i className="fa fa-fw fa-download" />
                          </a>
                        </li>
                      )
                    })
                  }
                </ul>
              ) : (
                <div>Click Add Icon To Add Attachment</div>
              )
            }
          </section>
        </Modal.Body>

        {this.state.nePitchDeckDescription && <MyStartupsNEPitchDeckDescriptionModal close={() => { this.close("nePitchDeckDescription") }} params={params} editMode={stateEditMode} description={editInfo} /> }
        {this.state.nePitchDeckAttachment && <MyStartupsNEPitchDeckAttachmentModal close={() => { this.close("nePitchDeckAttachment") }} params={params} editMode={stateEditMode} attachment={editInfo} />}
      </Modal>
    )
  }
}

const htmlDecode = (input) => {
  const e = document.createElement('div')
  e.innerHTML = input
  return e.innerHTML
}
