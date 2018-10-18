import React, { Component } from 'react'
import { Link } from 'react-router'

import { DEFAULT_STARTUP_BANNER, DEFAULT_STARTUP_AVATAR } from '../../../services/constants'

import LoadingSpinner from '../others/loading-spinner'

export default class CampaignList extends Component {
  render() {
    const { loadingInProcess, campaigns, newable, approved } = this.props

    return (
      <div id="shared-campaigns-list">
        {
          (() => {
            let component = null
            if (loadingInProcess) {
              component = <LoadingSpinner />
            } else if (campaigns.length < 1 && !newable) {
              component = (
                <div key="no-campaigns" className="col-xs-12 margin-top-20 text-center">
                  {
                    approved ? (
                      <h3>No Campaigns Found</h3>
                    ) : (
                      <h3>As per SFC only verified investors can access startup's fundrainsing campaigns</h3>
                    )
                  }
                </div>
              )
            } else {
              const createNewCampaign = newable && (
                <div key="new-campaign" className="col-xs-12 col-sm-6 col-md-4 text-center campaign-card">
                  <Link to="/my/campaigns/new" className="clearfix card-banner-wrapper">
                    <div
                      className="col-xs-12 card-banner clearfix"
                      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${DEFAULT_STARTUP_BANNER})` }}
                    />
                    <div
                      className="campaign-logo"
                      style={{ backgroundImage: `url(${DEFAULT_STARTUP_AVATAR})` }}
                    />
                  </Link>
                  <div className="col xs-12 card-info">
                    <Link className="h3" to="/my/campaigns/new">Create A New Campaign</Link>
                  </div>
                </div>
              )

              const campaignsItems = campaigns.map((campaign, i) => {
                // campaign.profile stuff
                const banner = _.get(campaign, 'profile.banner.original') || DEFAULT_STARTUP_BANNER
                const avatar = _.get(campaign, 'profile.avatar.original') || DEFAULT_STARTUP_AVATAR
                const bannerStyle = { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner})` }
                const logoStyle = { backgroundImage: `url(${avatar}` }
                const tagline = _.get(campaign, 'profile.tagline') || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab quo maiores doloribus, placeat, corporis ex libero nihil corrupti iusto doloremque saepe ipsa perspiciatis? Asperiores sunt, laboriosam magnam esse culpa repellat."

                // campaign stuff
                const startupName = campaign.name || "None"
                const campaignID = campaign.id
                const goal = campaign.goal || 0
                const raised = campaign.raised || 0
                const achieved = Math.floor((raised / goal) * 100)
                const progressStyle = { width: `${achieved}%` }

                const endDate = moment(campaign.end_date).fromNow()
                const ended = moment().unix() > moment(campaign.end_date).unix()

                let linkTo = `/campaigns/${campaignID}`
                const isApproved = campaign.approved
                const isActive = campaign.active

                // TODO: change to /my/campaigns/${campaignID}/edit/null only since it has redirect?
                if (newable) {
                  if (isApproved) {
                    linkTo = `/my/campaigns/${campaignID}`
                  } else {
                    linkTo = `/my/campaigns/${campaignID}/edit/null`
                  }
                }

                return (
                  <div key={i} className="col-xs-12 col-sm-6 col-md-4 text-center campaign-card">
                    <div className="clearfix card-banner-wrapper">
                      <Link to={linkTo}><div className="col-xs-12 card-banner clearfix" style={bannerStyle} /></Link>
                      <Link to={linkTo}><div className="campaign-logo" style={logoStyle} /></Link>
                      <Link to={linkTo}><h3 className="name text-bold">{startupName}</h3></Link>
                      <div className="status-bubble">
                        { !isApproved && <span className="label label-warning">Waiting for Approval</span> }
                        { isApproved && <span className="label label-default">{ended ? "Ended" : `Ends ${endDate}`}</span> }
                      </div>
                      <div className="active-bubble">
                        { isActive && <span className="label label-success">Live</span> }
                        { !isActive && <span className="label label-warning">To Be Live Soon</span>}
                      </div>
                    </div>

                    <div className="col-xs-12 card-info">
                      {
                        isApproved && (
                          <div className="stats">
                            <div className="progress">
                              <div className="progress-bar" style={progressStyle} />
                            </div>

                            <div className="clearfix investment-stat">
                              <div>HKD$ {raised.currency()}</div>
                              <div>HKD$ {goal.currency()}</div>
                            </div>

                            <div className="description">
                              <p>{tagline}</p>
                            </div>

                            <Link to={linkTo} className="btn btn-primary btn-block read-more">
                              Read More
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
