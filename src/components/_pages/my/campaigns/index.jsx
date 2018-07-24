import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  gMyCampaigns, G_MY_CAMPAIGNS,
  resetMyCampaigns
} from '../../../../actions/my/campaigns'

import CampaignList from '../../../shared/campaigns/list'

const mapStateToProps = (state) => {
  return {
    myCampaigns: _.get(state, 'myCampaigns', []),
    gMyCampaignsInProcess: _.get(state.requestStatus, G_MY_CAMPAIGNS)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gMyCampaigns: bindActionCreators(gMyCampaigns, dispatch),
    resetMyCampaigns: bindActionCreators(resetMyCampaigns, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyCampaignsIndex extends Component {
  componentWillMount() {
    this.props.gMyCampaigns()
  }

  componentWillUnmount() {
    this.props.resetMyCampaigns()
  }

  render() {
    const { myCampaigns, gMyCampaignsInProcess } = this.props

    return (
      <div id="pages-my-campaigns" className="container">
        <CampaignList
          loadingInProcess={gMyCampaignsInProcess}
          campaigns={myCampaigns}
          newable
        />
      </div>
    )
  }
}
