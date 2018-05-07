import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  uMyCampaign, U_MY_CAMPAIGN
} from '../../../../actions/my/campaigns'

import MyCampaignsBasicForm from '../../../forms/my/campaigns/basic'

const mapStateToProps = (state) => {
  return {
    myCampaign: _.get(state, 'myCampaign'),
    uMyCampaignInProcess: _.get(state.requestStatus, U_MY_CAMPAIGN),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uMyCampaign: bindActionCreators(uMyCampaign, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SharedMyCampaignsStageFour extends Component {
  constructor(props) {
    super(props)

    this.uMyCampaign = this.uMyCampaign.bind(this)
  }

  uMyCampaign(values) {
    this.props.uMyCampaign(values, this.props.routeParams)
  }

  render() {
    const { uMyCampaignInProcess, myCampaign } = this.props

    // TODO: fix this mess

    const startDate = _.get(myCampaign, 'start_date')
    const endDate = _.get(myCampaign, 'end_date')
    const maturityDate = _.get(myCampaign, 'maturity_date')
    const initialValues = {
      id: _.get(myCampaign, 'campaign_type.id', ''),
      name: _.get(myCampaign, 'campaign_type.name', ''),
      amountType: _.get(myCampaign, 'campaign_type.amount_type', ''),
      goal: _.get(myCampaign, 'goal', 0),
      amount: parseInt(_.get(myCampaign, 'campaign_type.amount', 0), 10),
      startDate: startDate ? moment(startDate).toDate() : moment().toDate(),
      endDate: endDate ? moment(endDate).toDate() : moment().toDate(),
      interestRate: _.get(myCampaign, 'campaign_type.interest_rate', 0),
      maturityDate: maturityDate ? moment(maturityDate).toDate() : moment().toDate()
    }

    return (
      <div className="stage-four row">
        <MyCampaignsBasicForm
          optClass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
          onSubmit={this.uMyCampaign}
          submitInProcess={uMyCampaignInProcess}
          title="Edit Campaign Details"
          initialValues={initialValues}
        />
      </div>
    )
  }
}
