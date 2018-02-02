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
              if (campaigns.length === 0) {
                component = <div className="col-xs-12"><h3>No Campaigns Found</h3></div>
              } else {
                component = campaigns.map((campaign, i) => {
                  const banner = _.get(campaign, 'startup.profile.banner.orignal', null) || DEFAULT_STARTUP_BANNER
                  const avatar = _.get(campaign, 'startup.profile.avatar.original', null) || DEFAULT_STARTUP_AVATAR
                  const styles = { backgroundImage: `url(${banner})` }

                  const campaignID = campaign.id
                  const campaignName = campaign.campaign_type.name
                  const amountType = campaign.campaign_type.amount_type === "valuation_cap" ? "Valuation Cap" : "Equity"

                  const endDate = moment(campaign.end_date).diff(moment(), 'days')
                  const goal = campaign.goal
                  const raised = campaign.raised.currency()
                  const achieved = Math.floor((campaign.raised / goal) * 100)
                  const investorNum = campaign.number_of_investors

                  const startupName = campaign.startup.name

                  return (
                    <div key={i} className="col-xs-12 col-sm-6 col-md-4 text-center campaign-card">
                      <Link to={`/campaigns/${campaignID}`} className="clearfix card-banner-wrapper">
                        <div className="col-xs-12 card-banner clearfix" style={styles}>
                          <img className="campaign-logo position-absolute top-15 left-10" src={avatar} alt={`Logo ${campaignName}`} />
                        </div>
                      </Link>

                      <div className="col-xs-12 card-info">
                        <div className="name margin-top-5 margin-bottom-5 text-bold text-gray-dark">
                          <Link to={`/campaigns/${campaignID}`}>{campaignName}</Link>
                          <div>by {startupName}</div>
                        </div>


                        <div className="stats">
                          <hr />

                          <div className="h4">{amountType}</div>

                          <div className="progress">
                            <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "75%" }} />
                            <div className="progress-start filled" />
                            <div className="progress-end" />
                          </div>

                          <div className="clearfix text-left">
                            <div>$ {raised} raised</div>
                            <div>{achieved}% achieved</div>
                            <div>{investorNum} investors</div>
                            <div>{endDate} days left</div>
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
    )
  }
}
