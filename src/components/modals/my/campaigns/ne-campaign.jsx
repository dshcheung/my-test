import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cMyCampaign, C_MY_CAMPAIGN,
  uMyCampaign, U_MY_CAMPAIGN
} from '../../../../actions/my/campaigns'

import MyCampaignForm from '../../../forms/my/campaigns/basic'

const mapStateToProps = (state) => {
  return {
    cMyCampaignInProcess: _.get(state.requestStatus, C_MY_CAMPAIGN),
    uMyCampaignInProcess: _.get(state.requestStatus, U_MY_CAMPAIGN)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cMyCampaign: bindActionCreators(cMyCampaign, dispatch),
    uMyCampaign: bindActionCreators(uMyCampaign, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyCampaignsNECampaignModal extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    if (this.props.editMode) {
      this.props.uMyCampaign(values, this.props.params, () => {
        this.props.close()
      })
    } else {
      this.props.cMyCampaign(values, () => {
        this.props.close()
      })
    }
  }

  render() {
    const { close, cMyCampaignInProcess, uMyCampaignInProcess, editMode, campaign } = this.props

    const keyword = editMode ? "Edit Campaign" : "Add Campaign"
    const startDate = _.get(campaign, 'start_date', moment())
    const endDate = _.get(campaign, 'end_date', moment())
    const maturityDate = _.get(campaign, 'maturity_date', moment())
    const initialValues = editMode ? {
      name: _.get(campaign, 'campaign_type.name', ''),
      amountType: _.get(campaign, 'campaign_type.amount_type', ''),
      goal: _.get(campaign, 'goal', 0),
      amount: parseInt(_.get(campaign, 'campaign_type.amount', 0), 10),
      startDate: moment(startDate).toDate(),
      endDate: moment(endDate).toDate(),
      interestRate: _.get(campaign, 'campaign_type.interest_rate', 0),
      maturityDate: moment(maturityDate).toDate()
    } : undefined

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>{keyword}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyCampaignForm
            onSubmit={this.onSubmit}
            submitInProcess={cMyCampaignInProcess || uMyCampaignInProcess}
            initialValues={initialValues}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
