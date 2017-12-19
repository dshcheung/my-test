import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import {
  gMyCampaigns, G_MY_CAMPAIGNS,
  resetMyCampaigns
} from '../../../actions/my/campaigns'

import StartupsSearchForm from '../../forms/startups/search'
import LoadingSpinner from '../../shared/loading-spinner'

import MyCampaignsNECampaignModal from '../../modals/my/campaigns/ne-campaign'

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
            <StartupsSearchForm
              optClass=""
              onSubmit={this.gMyCampaigns}
              submitInProcess={gMyCampaignsInProcess}
            />
          </div>
          <div className="new-campaign">
            <button onClick={this.open} className="btn">NEW</button>
          </div>
          <div className="row campaign-list">
            {
              (() => {
                let component = null
                if (gMyCampaignsInProcess) {
                  component = <LoadingSpinner />
                } else {
                  if (myCampaigns.length === 0) {
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
                            myCampaigns.map((campaign, i) => {
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

        {this.state.neCampaign && <MyCampaignsNECampaignModal close={this.close} />}
      </div>
    )
  }
}
