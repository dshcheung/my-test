import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cMyStartupAttachment, C_MY_STARTUP_ATTACHMENT,
  uMyStartupAttachment, U_MY_STARTUP_ATTACHMENT
} from '../../../../actions/my/startups/attachments'

import MyStartupsAttachmentsAttachmentForm from '../../../forms/my/startups/attachments-attachment'

const mapStateToProps = (state) => {
  return {
    cMyStartupAttachmentInProcess: _.get(state.requestStatus, C_MY_STARTUP_ATTACHMENT),
    uMyStartupAttachmentInProcess: _.get(state.requestStatus, U_MY_STARTUP_ATTACHMENT)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cMyStartupAttachment: bindActionCreators(cMyStartupAttachment, dispatch),
    uMyStartupAttachment: bindActionCreators(uMyStartupAttachment, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsNEAttachmentsAttachmentModal extends Component {
  constructor(props) {
    super(props)

    this.cuMyStartupAttachment = this.cuMyStartupAttachment.bind(this)
  }

  cuMyStartupAttachment(values) {
    if (this.props.editMode) {
      this.props.uMyStartupAttachment(values, {
        ...this.props.params,
        attachmentID: this.props.attachment.id
      }, () => {
        this.props.close()
      })
    } else {
      this.props.cMyStartupAttachment(values, this.props.params, () => {
        this.props.close()
      })
    }
  }

  render() {
    const { close, cMyStartupAttachmentInProcess, uMyStartupAttachmentInProcess, editMode, attachment } = this.props

    const keyword = editMode ? "Edit" : "Add"
    const initialValues = editMode ? {
      title: _.get(attachment, 'title', ''),
      file: _.get(attachment, 'file', '')
    } : undefined

    return (
      <Modal show onHide={close} className="form-modal" bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Document Attachment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupsAttachmentsAttachmentForm
            onSubmit={this.cuMyStartupAttachment}
            submitInProcess={cMyStartupAttachmentInProcess || uMyStartupAttachmentInProcess}
            initialValues={initialValues}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
