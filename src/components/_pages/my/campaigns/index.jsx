import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  gMyCampaigns, G_MY_CAMPAIGNS,
  resetMyCampaigns
} from '../../../../actions/my/campaigns'

import CampaignsSearchForm from '../../../forms/campaigns/search'
import CampaignList from '../../../shared/campaigns/list'

import MyCampaignsNECampaignModal from '../../../modals/my/campaigns/ne-campaign'

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
export default class MyCampaigns extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.gMyCampaigns = this.gMyCampaigns.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  componentWillMount() {
    this.props.gMyCampaigns()
  }

  componentWillUnmount() {
    this.props.resetMyCampaigns()
  }

  open() {
    this.setState({ neCampaign: true })
  }

  close() {
    this.setState({ neCampaign: false })
  }

  gMyCampaigns(values) {
    this.props.gMyCampaigns({
      queries: {
        q: _.get(values, "keyword"),
        filter_by: _.get(values, "filter") ? "category_id" : "",
        filter: _.get(values, "filter"),
        sort_by: _.get(values, "sortBy"),
        sort: _.get(values, "sort")
      }
    })
  }

  render() {
    const { myCampaigns, gMyCampaignsInProcess } = this.props

    return (
      <div id="pages-my-campaigns" className="container-fluid">
        <section className="container">
          <div className="row section-search">
            <CampaignsSearchForm
              optClass=""
              onSubmit={this.gMyCampaigns}
              submitInProcess={gMyCampaignsInProcess}
            />
          </div>

          <div className="new-campaign">
            <button onClick={this.open} className="btn">NEW</button>
          </div>

          <CampaignList
            loadingInProcess={gMyCampaignsInProcess}
            campaigns={myCampaigns}
          />
        </section>

        {this.state.neCampaign && <MyCampaignsNECampaignModal close={this.close} />}
      </div>
    )
  }
}
