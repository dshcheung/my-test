import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SharedMyCampaignsStages from '../../../shared/my/campaigns/stages'

import {
  gMyCampaign, G_MY_CAMPAIGN,
  resetMyCampaign
} from '../../../../actions/my/campaigns'

import LoadingSpinner from '../../../shared/loading-spinner'

const mapStateToProps = (state) => {
  return {
    myCampaign: _.get(state, 'myCampaign'),
    gMyCampaignInProcess: _.get(state.requestStatus, G_MY_CAMPAIGN)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gMyCampaign: bindActionCreators(gMyCampaign, dispatch),
    resetMyCampaign: bindActionCreators(resetMyCampaign, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyCampaignsEdit extends Component {
  componentWillMount() {
    if (!this.props.myCampaign) {
      this.props.gMyCampaign({ params: this.props.routeParams })
    }
  }

  componentWillUnmount() {
    this.props.resetMyCampaign()
  }

  render() {
    const { myCampaign, gMyCampaignInProcess } = this.props

    if (myCampaign) {
      return (
        <div id="my-campaigns-edit">
          <SharedMyCampaignsStages
            router={this.props.router}
            location={this.props.location}
            routeParams={{ ...this.props.routeParams, myStartupID: myCampaign.startup.id }}
            disabled={{}}
            editMode
          />
        </div>
      )
    } else if (gMyCampaignInProcess || gMyCampaignInProcess === undefined) {
      return <LoadingSpinner />
    } else {
      return null
    }
  }
}
