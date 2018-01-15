import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import { DEFAULT_STARTUP_BANNER, DEFAULT_STARTUP_AVATAR } from '../../../constants'

import {
  getCampaigns, GET_CAMPAIGNS,
  resetCampaigns
} from '../../../actions/campaigns'

import CampaignSearchForm from '../../forms/campaigns/search'
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
            <CampaignSearchForm
              optClass=""
              onSubmit={this.getCampaigns}
              submitInProcess={getCampaignsInProcess}
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
                    component = campaigns.map((campaign, i) => {
                      const banner = _.get(campaign, 'startup.profile.banner.orignal', null) || DEFAULT_STARTUP_BANNER
                      const avatar = _.get(campaign, 'startup.profile.avatar.original', null) || DEFAULT_STARTUP_AVATAR
                      const styles = { backgroundImgae: `url(${banner})` }

                      return (
                        <div key={i} className="col-xs-12 col-sm-6 col-md-4 text-center campaign card">
                          <div className="col-xs-12 card-header text-white bg-info">ACCEPETING INVESTMENT</div>

                          <Link to={`/campaigns/${campaign.id}`} className="clearfix card-banner-wrapper">
                            <div className="col-xs-12 card-banner clearfix" style={styles}>
                              <img className="campaign-logo position-absolute top-15 left-10" src={avatar} alt={`Logo ${campaign.name}`} />
                            </div>
                          </Link>

                          <div className="col-xs-12 card-info">
                            <div className="name">
                              <div className="h4">{campaign.category}</div>
                              <div className="h3 margin-top-5 margin-bottom-5 text-bold text-gray-dark">
                                <Link to={`/campaigns/${campaign.id}`}>{campaign.name}</Link>
                              </div>
                            </div>

                            <div className="about">
                              <hr />
                              <div>{campaign.startup.profile.tagline}</div>
                            </div>

                            <div className="stats">
                              <hr />
                              <div className="clearfix">
                                <div className="pull-left"><strong>US$1,500,000</strong> raised</div>
                                <div className="pull-right"><strong>7</strong> investors</div>
                              </div>
                              <div className="progress">
                                <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "75%" }} />
                                <div className="progress-start filled" />
                                <div className="progress-end" />
                              </div>
                              <div className="clearfix">
                                <div className="pull-left"><strong>75%</strong> achieved</div>
                                <div className="pull-right"><strong>{ moment('2017-10-31').diff(moment(), 'days') }</strong> days left</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
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

// <table className="campaign-table table table-striped">
//   <tbody>
//     {
//       campaigns.map((campaign, i) => {
//         const format = "MMM DD YYYY"
//         const maturityDate = moment(campaign.campaign_type.maturity_date).format(format)
//         const startDate = moment(campaign.start_date).format(format)
//         const endDate = moment(campaign.end_date).format(format)
//         return (
//           <tr key={i}>
//             <td>
//               <div>{campaign.startup.name}</div>
//               <div><Link to={`/startups/${campaign.startup.id}`}>View Startup</Link></div>
//             </td>
//             <td>
//               <div>{campaign.campaign_type.name}</div>
//               <div><Link to={`/campaigns/${campaign.id}`}>View Campaign</Link></div>
//             </td>
//             <td>
//               <div>{campaign.campaign_type.interest_rate}%</div>
//               <div>{maturityDate}</div>
//             </td>
//             <td>
//               <div>{startDate}</div>
//               <div>{endDate}</div>
//             </td>
//             <td>
//               <div>${campaign.goal}</div>
//               <div>{campaign.has_reached_goal ? "Yes" : "No"}</div>
//             </td>
//           </tr>
//         )
//       })
//     }
//   </tbody>
// </table>
