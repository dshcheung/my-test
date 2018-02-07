import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getCampaigns, GET_CAMPAIGNS,
  resetCampaigns
} from '../../../actions/campaigns'

import CampaignsSearchForm from '../../forms/campaigns/search'
import CampaignsList from '../../shared/campaigns/list'

const mapStateToProps = (state) => {
  return {
    campaigns: _.get(state, 'campaigns', []),
    getCampaignsInProcess: _.get(state.requestStatus, GET_CAMPAIGNS)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCampaigns: bindActionCreators(getCampaigns, dispatch),
    resetCampaigns: bindActionCreators(resetCampaigns, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class CampaignsIndex extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.getCampaigns = this.getCampaigns.bind(this)
  }

  componentWillMount() {
    this.props.getCampaigns()
  }

  componentWillUnmount() {
    this.props.resetCampaigns()
  }

  getCampaigns(values) {
    this.props.getCampaigns({
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
    const { campaigns, getCampaignsInProcess } = this.props

    return (
      <div id="pages-campaigns-index" className="container-fluid">
        <section className="container">
          <div className="row section-header">
            <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
              <h1>LIVE CAMPAIGNS</h1>
              <p>Invest into businesses you believe in</p>
            </div>
          </div>
          <div className="row section-search">
            <CampaignsSearchForm
              optClass=""
              onSubmit={this.getCampaigns}
              submitInProcess={getCampaignsInProcess}
            />
          </div>
          <CampaignsList
            loadingInProcess={getCampaignsInProcess}
            campaigns={campaigns}
            investorViewable
          />
        </section>
      </div>
    )
  }
}
