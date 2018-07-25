import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  gMyCampaign, G_MY_CAMPAIGN, resetMyCampaign
} from '../../../../actions/my/campaigns'

import LoadingSpinner from '../../../shared/others/loading-spinner'

const mapStateToProps = (state) => {
  return {
    myCampaign: _.get(state, 'myCampaign'),
    gMyCampaignInProcess: _.get(state.requestStatus, G_MY_CAMPAIGN),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gMyCampaign: bindActionCreators(gMyCampaign, dispatch),
    resetMyCampaign: bindActionCreators(resetMyCampaign, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyCampaignsShowWrapper extends Component {
  componentWillMount() {
    if (!this.props.myCampaign) {
      this.props.gMyCampaign({ params: this.props.router.params })
    }
  }

  componentWillUnmount() {
    this.props.resetMyCampaign()
  }

  render() {
    const { myCampaign, gMyCampaignInProcess } = this.props

    if (gMyCampaignInProcess) return <LoadingSpinner />

    if (myCampaign) {
      return this.props.children
    }

    return (
      <div className="text-center">
        <h3>No Such Campaign</h3>
      </div>
    )
  }
}
