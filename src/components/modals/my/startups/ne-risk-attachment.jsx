import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cuMyStartupRisk, CU_MY_STARTUP_RISK
} from '../../../../actions/my/startups/risk'

import MyStartupRiskAttachmentForm from '../../../forms/my/startups/risk-attachment'

const mapStateToProps = (state) => {
  return {
    cuMyStartupRiskInProcess: _.get(state.requestStatus, CU_MY_STARTUP_RISK)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cuMyStartupRisk: bindActionCreators(cuMyStartupRisk, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsNERiskAttachmentModal extends Component {
  constructor(props) {
    super(props)

    this.cuMyStartupRisk = this.cuMyStartupRisk.bind(this)
  }

  cuMyStartupRisk(values) {
    this.props.cuMyStartupRisk({
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
    const { close, cuMyStartupRiskInProcess, editMode, attachment } = this.props

    const keyword = editMode ? "Edit" : "Add"
    const initialValues = editMode ? {
      title: _.get(attachment, 'title', '')
    } : undefined

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Risk Attachment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupRiskAttachmentForm
            onSubmit={this.cuMyStartupRisk}
            submitInProcess={cuMyStartupRiskInProcess}
            initialValues={initialValues}
            fileUrl={_.get(attachment, 'file.original', '')}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
