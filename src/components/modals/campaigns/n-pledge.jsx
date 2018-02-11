import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cPledge, C_PLEDGE
} from '../../../actions/campaigns/pledges'

import {
  gImmovable
} from '../../../actions/immovables'

import CampaignPledgeForm from '../../forms/campaigns/pledge'
import LoadingSpinner from '../../shared/loading-spinner'

const mapStateToProps = (state) => {
  return {
    cPledgeInProcess: _.get(state.requestStatus, C_PLEDGE),
    disclaimer: _.find(_.get(state.immovables, 'legal_agreement.legal_agreements', []), (la) => {
      return la.id === "investor-disclaimer"
    })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cPledge: bindActionCreators(cPledge, dispatch),
    gImmovable: bindActionCreators(gImmovable, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class CampaignsNPledgeModal extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount() {
    this.props.gImmovable({ immovableID: "legal_agreement" })
  }

  onSubmit(values) {
    this.props.cPledge(values, this.props.params, () => {
      this.props.close()
    })
  }

  render() {
    const { close, cPledgeInProcess, disclaimer } = this.props

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

          {
            !_.get(disclaimer, 'content') ? <LoadingSpinner /> : (
              <div dangerouslySetInnerHTML={{ __html: disclaimer.content.decode() }} />
            )
          }
        </Modal.Body>
      </Modal>
    )
  }
}
