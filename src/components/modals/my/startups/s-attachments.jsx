import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  dMyStartupAttachment, D_MY_STARTUP_ATTACHMENT
} from '../../../../actions/my/startups/attachments'

import MyStartupsNEAttachmentsAttachmentModal from './ne-attachments-attachment'

const mapStateToProps = (state) => {
  return {
    requestStatus: _.get(state, 'requestStatus')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dMyStartupAttachment: bindActionCreators(dMyStartupAttachment, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsSAttachmentsModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sAttachments: true
    }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open(modalName, stateEditMode, editInfo, editIndex) {
    this.setState({ sAttachments: false, [modalName]: true, stateEditMode, editInfo, editIndex })
  }

  close(modalName) {
    this.setState({ sAttachments: true, [modalName]: false, stateEditMode: false, editInfo: null, editIndex: null })
  }

  dMyStartupAttachment(id) {
    this.props.dMyStartupAttachment({
      ...this.props.params,
      attachmentID: id
    })
  }


  render() {
    const { close, editMode, attachments, params, requestStatus } = this.props
    const { stateEditMode, editInfo } = this.state

    const hasAttachments = !!attachments

    const keyword = editMode ? "Edit" : "Add"

    return (
      <Modal show onHide={close} className={`form-modal ${!this.state.sAttachments && 'hide'}`} id="modals-my-startups-s-attachments" bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Data Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className="attachments">
            <div className="h3 margin-top-0">
              Attachments
              <button
                className="btn btn-info pull-right"
                onClick={() => { this.open('neAttachmentsAttachment', false) }}
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
                            disabled={_.get(requestStatus, `${D_MY_STARTUP_ATTACHMENT}_${attachment.id}`)}
                            onClick={() => { this.open("neAttachmentsAttachment", true, attachment, i) }}
                          >
                            <i className="fa fa-pencil" />
                          </button>
                          <button
                            className="btn btn-danger btn-outline delete pull-right"
                            disabled={_.get(requestStatus, `${D_MY_STARTUP_ATTACHMENT}_${attachment.id}`)}
                            onClick={() => { this.dMyStartupAttachment(attachment.id) }}
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

        {this.state.neAttachmentsAttachment && <MyStartupsNEAttachmentsAttachmentModal close={() => { this.close("neAttachmentsAttachment") }} params={params} editMode={stateEditMode} attachment={editInfo} />}
      </Modal>
    )
  }
}
