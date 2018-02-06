import React, { Component } from 'react'
import { connect } from 'react-redux'

import SharedCampaignsProfile from '../../campaigns/profile'

const mapStateToProps = (state) => {
  return {
    myCampaign: _.get(state, 'myCampaign')
  }
}

@connect(mapStateToProps, null)
export default class SharedMyCampaignsStageTwo extends Component {
  render() {
    const { editMode, myCampaign, routeParams } = this.props

    return (
      <div className="stage-one row">
        <SharedCampaignsProfile
          startup={_.get(myCampaign, 'startup', null)}
          campaign={myCampaign}
          loadingInProcess={null}
          routeParams={routeParams}
          router={this.props.router}
          editMode={editMode}
        />
      </div>
    )
  }
}
