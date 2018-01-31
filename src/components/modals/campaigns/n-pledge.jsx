import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cPledge, C_PLEDGE
} from '../../../actions/campaigns/pledges'

import CampaignPledgeForm from '../../forms/campaigns/pledge'

const mapStateToProps = (state) => {
  return {
    cPledgeInProcess: _.get(state.requestStatus, C_PLEDGE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cPledge: bindActionCreators(cPledge, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class CampaignsNPledgeModal extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    this.props.cPledge(values, this.props.params, () => {
      this.props.close()
    })
  }

  render() {
    const { close, cPledgeInProcess } = this.props

    const keyword = "Pledge"

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>{keyword}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CampaignPledgeForm
            onSubmit={this.onSubmit}
            submitInProcess={cPledgeInProcess}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
