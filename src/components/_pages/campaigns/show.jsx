import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import StartupsProfile from '../../shared/startups/profile'

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
  constructor(props) {
    super(props)

    this.state = {}

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  componentWillMount() {
    this.props.getCampaign({ params: this.props.routeParams })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ editable: _.get(nextProps, 'campaign.is_editable', false) })

    if (this.state.editName) {
      this.setState({ editInfo: _.get(nextProps, this.state.editName) })
    }
  }

  componentWillUnmount() {
    this.props.resetCampaign()
  }

  open() {
    this.setState({ nPledge: true })
  }

  close() {
    this.setState({ nPledge: false })
  }

  render() {
    const { campaign, getCampaignInProcess, routePrams } = this.props

    return (
      <StartupsProfile
        startup={_.get(campaign, 'startup', null)}
        campaign={campaign}
        loadingInProcess={getCampaignInProcess}
        routeParams={routePrams}
      />
    )
  }
}
