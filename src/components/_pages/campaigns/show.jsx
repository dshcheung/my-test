import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SharedStartupsProfile from '../../shared/startups/profile'

import {
  getCampaign, GET_CAMPAIGN,
  resetCampaign
} from '../../../actions/campaigns'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session', null),
    campaign: _.get(state, 'campaign', null),
    getCampaignInProcess: _.get(state.requestStatus, GET_CAMPAIGN),
    requestStatus: _.get(state, 'requestStatus')
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

    return (
      <SharedStartupsProfile
        startup={_.get(campaign, 'startup', null)}
        campaign={campaign}
        loadingInProcess={getCampaignInProcess}
        routeParams={routeParams}
        router={this.props.router}
      />
    )
  }
}
