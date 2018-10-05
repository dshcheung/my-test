import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getCampaigns, GET_CAMPAIGNS,
  resetCampaigns
} from '../../../actions/campaigns'

import CampaignsSearchForm from '../../forms/campaigns/search'
import CampaignsList from '../../shared/campaigns/list'
import SharedOthersSideTitle from '../../shared/others/side-title'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session'),
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

    this.state = {
      queryTimeout: null
    }

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
    const { getCampaignsInProcess, currentUser: { approved } } = this.props

    // TODO: change this back to using this.props
    const campaigns = this.props.campaigns.length > 0 ? [
      {
        active: true,
        approved: true,
        campaign_type: {
          id: 100,
          amount: 1000000,
          amount_type: "equity",
          equity_percentage: 10,
          equity_type: "ordinary",
        },
        id: "Z9r1t5KMx5vwR4E2",
        end_date: 1536506131000,
        start_date: 1535640809000,
        raised: 500000,
        goal: 1000000,
        number_of_investors: 5,
        has_reached_goal: false,
        startup: {
          id: "TeWuz4n8QC3cyCPu",
          name: "UBER",
          profile: {
            id: 11,
            avatar: {
              original: "https://image.ibb.co/dxbRdU/campaign_logo.png",
            },
            banner: {
              original: "https://image.ibb.co/cUuOQ9/campaign_banner.png"
            }
          }
        },
        status: {
          submitted: "approved"
        }
      }
    ] : []

    return (
      <div id="pages-campaigns-index">
        <SharedOthersSideTitle title="campaigns" optClass="col-xs-2" />

        <section className="col-xs-8">
          <div className="row section-header text-left">
            <div className="col-xs-10 col-xs-offset-1">
              <div className="h3">Invest in Business,</div>
              <div className="h3">That Adds Values to Your Portfolio</div>

              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos adipisci fugit sed est optio, praesentium fugiat nobis non, esse, vitae quibusdam rerum error in voluptatibus distinctio. Repellendus, illo. Expedita, sit.</p>
            </div>
          </div>

          <div className="row section-search">
            <CampaignsSearchForm
              optClass="col-xs-10 col-xs-offset-1"
              onSubmit={this.getCampaigns}
              onChange={(values, dispatch, props, preValue) => {
                const { queryTimeout } = this.state

                if (queryTimeout) {
                  window.clearInterval(queryTimeout)
                }

                if (preValue.q !== values.q) {
                  const newTimeout = window.setTimeout(() => {
                    this.getCampaigns()
                  }, 1500)

                  this.setState({ queryTimeout: newTimeout })
                } else {
                  this.getCampaigns()
                }
              }}
              submitInProcess={getCampaignsInProcess}
            />
          </div>
        </section>

        <section className="col-xs-10 col-xs-offset-1">
          <div className="row">
            <CampaignsList
              loadingInProcess={getCampaignsInProcess}
              campaigns={campaigns}
              approved={approved}
            />
          </div>
        </section>
      </div>
    )
  }
}
