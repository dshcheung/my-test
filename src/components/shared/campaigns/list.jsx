import React, { Component } from 'react'
import { Link } from 'react-router'

import { DEFAULT_STARTUP_BANNER, DEFAULT_STARTUP_AVATAR } from '../../../constants'

import LoadingSpinner from '../loading-spinner'

export default class CampaignList extends Component {
  render() {
    const { loadingInProcess, campaigns, newable } = this.props

    return (
      <div className="row" id="shared-campaigns-list">
        {
          (() => {
            let component = null
            if (loadingInProcess) {
              component = <LoadingSpinner />
            } else {
              const createNewCampaign = newable ? (
                <div key="new-campaign" className="col-xs-12 col-sm-6 col-md-4 text-center campaign-card">
                  <Link to="/my/campaigns/new" className="clearfix card-banner-wrapper">
                    <div className="col-xs-12 card-banner clearfix" style={{ backgroundImage: `url(${DEFAULT_STARTUP_BANNER})` }}>
                      <img className="campaign-logo position-absolute top-15 left-10" src={DEFAULT_STARTUP_AVATAR} alt={`Logo New Campaign`} />
                    </div>
                  </Link>
                  <div className="col xs-12 card-info">
                    <Link className="h3" to="/my/campaigns/new">Create A New Startup</Link>
                  </div>
                </div>
              ) : false

              const campaignsItems = campaigns.map((campaign, i) => {
                const banner = _.get(campaign, 'startup.profile.banner.orignal', null) || DEFAULT_STARTUP_BANNER
                const avatar = _.get(campaign, 'startup.profile.avatar.original', null) || DEFAULT_STARTUP_AVATAR
                const styles = { backgroundImage: `url(${banner})` }

                const campaignID = campaign.id
                const campaignName = campaign.campaign_type.name
                const amountType = campaign.campaign_type.amount_type === "valuation_cap" ? "Valuation Cap" : "Equity"

                const endDate = moment(campaign.end_date).diff(moment(), 'days')
                const goal = campaign.goal || 0
                const raised = campaign.raised || 0
                const achieved = Math.floor((campaign.raised / goal) * 100)
                const investorNum = campaign.number_of_investors

                const startupName = campaign.startup.name

                let linkTo = `/campaigns/${campaignID}`

                if (newable) {
                  if (campaign.can.edit) {
                    linkTo = `/my/campaigns/${campaignID}/edit#stage_four`
                  } else {
                    linkTo = `/my/campaigns/${campaignID}`
                  }
                }

                const submitStatus = _.get(campaign, 'status.submitted')
                const isApproved = submitStatus === "accepted"

                return (
                  <div key={i} className="col-xs-12 col-sm-6 col-md-4 text-center campaign-card">
                    <Link to={linkTo} className="clearfix card-banner-wrapper">
                      <div className="col-xs-12 card-banner clearfix" style={styles}>
                        <img className="campaign-logo position-absolute top-15 left-10" src={avatar} alt={`Logo ${campaignName}`} />
                      </div>
                    </Link>

                    <div className="col-xs-12 card-info">
                      <div className="name margin-top-5 margin-bottom-5 text-bold text-gray-dark">
                        <Link to={linkTo}>{campaignName}</Link>
                        <div>by {startupName}</div>
                      </div>

                      {
                        isApproved ? (
                          <div className="stats">
                            <hr />

                            <div className="h4">{amountType}</div>

                            <div className="progress">
                              <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "75%" }} />
                              <div className="progress-start filled" />
                              <div className="progress-end" />
                            </div>

                            <div className="clearfix text-left">
                              <div>$ {raised.currency()} raised of ${goal.currency()}</div>
                              <div>{achieved}% achieved</div>
                              <div>{investorNum} investors</div>
                              <div>{endDate} days left</div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <hr />
                            <Link to={linkTo}>
                              { submitStatus === "not_submitted" && <div className="bg-default">{submitStatus.splitCap("_")}</div> }
                              { submitStatus === "pending" && <div className="bg-warning">{submitStatus.splitCap("_")}</div> }
                              { submitStatus === "rejected" && <div className="bg-danger">{submitStatus.splitCap("_")}</div> }
                            </Link>
                          </div>
                        )
                      }
                    </div>
                  </div>
                )
              })

              component = [createNewCampaign, ...campaignsItems]
            }
            return component
          })()
        }
      </div>
    )
  }
}
