import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  REFRESH_G_MY_CAMPAIGN
} from '../../../../actions/my/campaigns'

import LoadingSpinner from '../../../shared/loading-spinner'
import SharedCampaignsProfile from '../../campaigns/profile'

const mapStateToProps = (state) => {
  return {
    myCampaign: _.get(state, 'myCampaign'),
    refreshGMyCampaignInprocess: _.get(state.requestStatus, REFRESH_G_MY_CAMPAIGN)
  }
}

@connect(mapStateToProps, null)
export default class SharedMyCampaignsStageThree extends Component {
  render() {
    const { myCampaign, router, refreshGMyCampaignInprocess } = this.props

    if (refreshGMyCampaignInprocess) return <LoadingSpinner />

    return (
      <div className="stage-three">
        <SharedCampaignsProfile
          startup={_.get(myCampaign, 'startup', null)}
          campaign={myCampaign}
          routeParams={router.params}
          router={router}
          editMode
        />
      </div>
    )
  }
}
