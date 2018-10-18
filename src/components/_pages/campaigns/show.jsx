import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SharedCampaignsProfile from '../../shared/campaigns/profile'

import LoadingSpinner from '../../shared/others/loading-spinner'

import {
  getCampaign, GET_CAMPAIGN,
  resetCampaign
} from '../../../actions/campaigns'

const mapStateToProps = (state) => {
  return {
    campaign: _.get(state, 'campaign', null),
    getCampaignInProcess: _.get(state.requestStatus, GET_CAMPAIGN)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCampaign: bindActionCreators(getCampaign, dispatch),
    resetCampaign: bindActionCreators(resetCampaign, dispatch),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class CampaignsShow extends Component {
  componentWillMount() {
    this.props.getCampaign({ params: this.props.routeParams })
  }

  componentWillUnmount() {
    this.props.resetCampaign()
  }

  render() {
    const { campaign, getCampaignInProcess, routeParams } = this.props

    if (getCampaignInProcess) return <LoadingSpinner />

    if (campaign) {
      return (
        <SharedCampaignsProfile
          startup={_.get(campaign, 'startup', null)}
          campaign={campaign}
          routeParams={routeParams}
          router={this.props.router}
        />
      )
    }

    return (
      <div className="text-center">
        <h3>No Such Campaign</h3>
      </div>
    )
  }
}
