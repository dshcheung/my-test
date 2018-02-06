import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cuMyStartupMarketScope, CU_MY_STARTUP_MARKET_SCOPE
} from '../../../../actions/my/startups/market-scope'

import MyStartupsMarketScopeAttachmentForm from '../../../forms/my/startups/market-scope-attachment'

const mapStateToProps = (state) => {
  return {
    cuMyStartupMarketScopeInProcess: _.get(state.requestStatus, CU_MY_STARTUP_MARKET_SCOPE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cuMyStartupMarketScope: bindActionCreators(cuMyStartupMarketScope, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsNEMarketScopeAttachmentModal extends Component {
  constructor(props) {
    super(props)

    this.cuMyStartupMarketScope = this.cuMyStartupMarketScope.bind(this)
  }

  cuMyStartupMarketScope(values) {
    this.props.cuMyStartupMarketScope({
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
    const { close, cuMyStartupMarketScopeInProcess, editMode, attachment } = this.props

    const keyword = editMode ? "Edit" : "Add"
    const initialValues = editMode ? {
      title: _.get(attachment, 'title', '')
    } : undefined

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Market Scope Attachment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupsMarketScopeAttachmentForm
            onSubmit={this.cuMyStartupMarketScope}
            submitInProcess={cuMyStartupMarketScopeInProcess}
            initialValues={initialValues}
            fileUrl={_.get(attachment, 'file.original', '')}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
