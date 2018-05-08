import React, { Component } from 'react'
import { connect } from 'react-redux'

import SharedCampaignsProfile from '../../campaigns/profile'

const mapStateToProps = (state) => {
  return {
    myCampaign: _.get(state, 'myCampaign')
  }
}

@connect(mapStateToProps, null)
export default class SharedMyCampaignsStageThree extends Component {
  render() {
    const { myCampaign, router } = this.props

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
