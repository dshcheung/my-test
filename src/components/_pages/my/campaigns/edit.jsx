import React, { Component } from 'react'
import { connect } from 'react-redux'

import SharedMyCampaignsStages from '../../../shared/my/campaigns/stages'

const mapStateToProps = (state) => {
  return {
    myCampaign: _.get(state, 'myCampaign')
  }
}

@connect(mapStateToProps, null)
export default class MyCampaignsEdit extends Component {
  render() {
    const { myCampaign } = this.props

    return (
      <div id="my-campaigns-edit">
        <SharedMyCampaignsStages
          router={this.props.router}
          location={this.props.location}
          routeParams={{ ...this.props.routeParams, myStartupID: _.get(myCampaign, 'startup.id') }}
          disabled={{}}
          editMode
        />
      </div>
    )
  }
}
