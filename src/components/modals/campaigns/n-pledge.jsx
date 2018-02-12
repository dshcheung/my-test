import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StripeProvider, Elements } from 'react-stripe-elements'

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

  renderBody() {
    const { cPledgeInProcess, campaign } = this.props

    return (
      <Modal.Body>
        <div className="row">
          <div className="col-xs-12">
            <StripeProvider apiKey="pk_test_12345">
              <Elements>
                <CampaignPledgeForm
                  onSubmit={this.onSubmit}
                  submitInProcess={cPledgeInProcess}
                  step={campaign.minimum_increment}
                  min={campaign.minimum_pledge}
                />
              </Elements>
            </StripeProvider>
          </div>
        </div>
      </Modal.Body>
    )
  }

  render() {
    const { close } = this.props

    const keyword = "Pledge"

    return (
      <Modal show onHide={close} className="form-modal" bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>{keyword}</Modal.Title>
        </Modal.Header>
        {
          this.renderBody()
        }
      </Modal>
    )
  }
}
