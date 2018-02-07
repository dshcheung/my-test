import React, { Component } from 'react'
import { connect } from 'react-redux'

import SharedCampaignsProfile from '../../../shared/campaigns/profile'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session', null),
    myCampaign: _.get(state, 'myCampaign', null)
  }
}

@connect(mapStateToProps, null)
export default class CampaignsShow extends Component {
  render() {
    const { myCampaign, routeParams } = this.props

    return (
      <SharedCampaignsProfile
        startup={_.get(myCampaign, 'startup', null)}
        campaign={myCampaign}
        routeParams={routeParams}
        router={this.props.router}
      />
    )
  }
}
