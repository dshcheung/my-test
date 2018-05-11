import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'

import SharedSlider from '../../../shared/slider'

import MyStartupsNEPitchDeckDescriptionModal from './ne-pitch-deck-description'
import MyStartupsNEPitchDeckAttachmentModal from './ne-pitch-deck-attachment'

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
    const { close, pitchDeck, params } = this.props
    const { stateEditMode, editInfo } = this.state

    const description = _.get(pitchDeck, 'description', '')
    const attachment = _.get(pitchDeck, 'original', '')
    const attachments = _.get(pitchDeck, 'attachments', [])

    const hasDescription = !!description
    const hasAttachment = !!attachment
    const hasAttachments = attachments.length > 0

    const descriptionIconClass = hasDescription ? "fa-edit" : "fa-plus"
    const attachmentIconClass = hasAttachment ? "fa-edit" : "fa-plus"

    return (
      <Modal show onHide={close} className={`form-modal ${!this.state.sPitchDeck && 'hide'}`} id="modals-my-startups-s-pitch-deck" bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>Pitch Deck</Modal.Title>
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
                <div>Click Edit Icon To Edit Description</div>
              )
            }
          </section>

          <hr />

          <section className="attachments">
            <div className="h3 margin-top-0">
              Attachment
              <button
                className="btn btn-info pull-right"
                onClick={() => { this.open('nePitchDeckAttachment', hasAttachment, attachment) }}
              ><i className={`fa ${attachmentIconClass}`} /></button>
            </div>
            {
              hasAttachment && hasAttachments ? (
                <SharedSlider
                  id="s-modal-pitch-deck-slider"
                  data={attachments}
                  srcKey="file.original"
                  titleKey="title"
                />
              ) : (
                <div>Click Edit Icon To Edit Attachment</div>
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
