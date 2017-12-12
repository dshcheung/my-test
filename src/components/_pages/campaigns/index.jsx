import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import {
  getCampaigns, GET_CAMPAIGNS,
  resetCampaigns
} from '../../../actions/campaigns'

import StartupsSearchForm from '../../forms/startups/search'
import LoadingSpinner from '../../shared/loading-spinner'

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
            <StartupsSearchForm
              optClass=""
              onSubmit={this.getCampaigns}
              submitInProcess={this.props.getCampaignsInProcess}
            />
          </div>
          <div className="row campaign-list">
            {
              (() => {
                let component = null
                if (getCampaignsInProcess) {
                  component = <LoadingSpinner />
                } else {
                  if (campaigns.length === 0) {
                    component = <div className="col-xs-12"><h3>No Campaigns Found</h3></div>
                  } else {
                    component = (
                      <table className="campaign-table table table-striped">
                        <thead>
                          <tr>
                            <th>
                              <div>Startup</div>
                            </th>
                            <th>
                              <div>Campaign</div>
                            </th>
                            <th>
                              <div>Interest</div>
                              <div>Maturity</div>
                            </th>
                            <th>
                              <div>Start Date</div>
                              <div>End Date</div>
                            </th>
                            <th>
                              <div>Goal</div>
                              <div>Completed</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            campaigns.map((campaign, i) => {
                              const format = "MMM DD YYYY"
                              const maturityDate = moment(campaign.campaign_type.maturity_date).format(format)
                              const startDate = moment(campaign.start_date).format(format)
                              const endDate = moment(campaign.end_date).format(format)
                              return (
                                <tr key={i}>
                                  <td>
                                    <div>{campaign.startup.name}</div>
                                    <div><Link to={`/startups/${campaign.startup.id}`}>View Startup</Link></div>
                                  </td>
                                  <td>
                                    <div>{campaign.campaign_type.name}</div>
                                    <div><Link to={`/campaigns/${campaign.id}`}>View Campaign</Link></div>
                                  </td>
                                  <td>
                                    <div>{campaign.campaign_type.interest_rate}%</div>
                                    <div>{maturityDate}</div>
                                  </td>
                                  <td>
                                    <div>{startDate}</div>
                                    <div>{endDate}</div>
                                  </td>
                                  <td>
                                    <div>${campaign.goal}</div>
                                    <div>{campaign.has_reached_goal ? "Yes" : "No"}</div>
                                  </td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
                    )
                  }
                }
                return component
              })()
            }
          </div>
        </section>
      </div>
    )
  }
}
