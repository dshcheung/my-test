import React, { Component } from 'react'

import SharedMyCampaignsStages from '../../../shared/my/campaigns/stages'

export default class MyCampaignsNew extends Component {
  render() {
    return (
      <div id="my-campaigns-new">
        <SharedMyCampaignsStages
          router={this.props.router}
          location={this.props.location}
          disabled={{ stage_two: true, stage_three: true, stage_four: true }}
        />
      </div>
    )
  }
}
