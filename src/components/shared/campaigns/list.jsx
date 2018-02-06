import React, { Component } from 'react'
import { Link } from 'react-router'

import { DEFAULT_STARTUP_BANNER, DEFAULT_STARTUP_AVATAR } from '../../../constants'

import LoadingSpinner from '../loading-spinner'

export default class CampaignList extends Component {
  render() {
    const { loadingInProcess, campaigns } = this.props

    return (
      <div className="row" id="shared-campaigns-list">
        {
          (() => {
            let component = null
            if (loadingInProcess) {
              component = <LoadingSpinner />
            } else {
              const createNewCampaign = (
                <div key="new-campaign" className="col-xs-12 col-sm-6 col-md-4 text-center campaign-card">
                  <Link to="/my/campaigns/new" className="clearfix card-banner-wrapper">
                    <div className="col-xs-12 card-banner clearfix" style={{ backgroundImage: `url(${DEFAULT_STARTUP_BANNER})` }}>
                      <img className="campaign-logo position-absolute top-15 left-10" src={DEFAULT_STARTUP_AVATAR} alt={`Logo New Campaign`} />
                    </div>
                  </Link>
                  <div className="col xs-12 card-info">
                    <Link className="h1" to="/my/campaigns/new">Create A New Startup</Link>
                  </div>
                </div>
              )

              const campaignsItems = campaigns.map((campaign, i) => {
                const banner = _.get(campaign, 'startup.profile.banner.orignal', null) || DEFAULT_STARTUP_BANNER
                const avatar = _.get(campaign, 'startup.profile.avatar.original', null) || DEFAULT_STARTUP_AVATAR
                const styles = { backgroundImage: `url(${banner})` }

                const isApproved = campaign.approved
                const campaignID = campaign.id
                const campaignName = campaign.campaign_type.name
                const amountType = campaign.campaign_type.amount_type === "valuation_cap" ? "Valuation Cap" : "Equity"

                const endDate = moment(campaign.end_date).diff(moment(), 'days')
                const goal = campaign.goal || 0
                const raised = campaign.raised || 0
                const achieved = Math.floor((campaign.raised / goal) * 100)
                const investorNum = campaign.number_of_investors

                const startupName = campaign.startup.name

                const linkTo = campaign.approved ? `/campaigns/${campaignID}` : `/my/campaigns/${campaignID}/edit`

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
                            {/* TODO: also show different info depending on submittion status */}
                            <Link to={linkTo}>Pending Submittion & Pending Approval & Rejected</Link>
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
