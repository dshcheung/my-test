import React, { Component } from 'react'
import { Link } from 'react-router'

import { DEFAULT_STARTUP_BANNER, DEFAULT_STARTUP_AVATAR } from '../../../services/constants'

import LoadingSpinner from '../others/loading-spinner'

export default class CampaignList extends Component {
  render() {
    const { loadingInProcess, campaigns, newable } = this.props

    return (
      <div id="shared-campaigns-list">
        {
          (() => {
            let component = null
            if (loadingInProcess) {
              component = <LoadingSpinner />
            } else if (campaigns.length < 1) {
              component = (
                <div key="no-campaigns" className="col-xs-12">
                  <h3>No Campaigns Found</h3>
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
                // startup profile stuff
                const banner = _.get(campaign, 'startup.profile.banner.original') || DEFAULT_STARTUP_BANNER
                const avatar = _.get(campaign, 'startup.profile.avatar.original') || DEFAULT_STARTUP_AVATAR
                const bannerStyle = { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner})` }
                const logoStyle = { backgroundImage: `url(${avatar}` }
                const startupName = campaign.startup.name
                const tagline = _.get(campaign, 'startup.profile.tagline') || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab quo maiores doloribus, placeat, corporis ex libero nihil corrupti iusto doloremque saepe ipsa perspiciatis? Asperiores sunt, laboriosam magnam esse culpa repellat."

                // campaign stuff
                const campaignID = campaign.id
                const endDate = moment(campaign.end_date).fromNow()
                const goal = campaign.goal || 0
                const raised = campaign.raised || 0
                const achieved = Math.floor((raised / goal) * 100)
                const progressStyle = { width: `${achieved}%` }

                let linkTo = `/campaigns/${campaignID}`

                // TODO: change behaviour when profile is done
                if (newable) {
                  if (campaign.can.edit) {
                    linkTo = `/my/campaigns/${campaignID}/edit/basic`
                  } else {
                    linkTo = `/my/campaigns/${campaignID}/edit/success`
                  }
                }

                const displayPermissions = {
                  stats: ["approved", "accepted", "completed"],
                  danger: ["waiting_for_update", "rejected"],
                  warning: ["pending", "first_approval", "investment_committee", "selection_committee"],
                  info: ["not_submitted"]
                }

                const submitStatus = _.get(campaign, 'status.submitted')
                const isActive = campaign.active
                const isCompleted = submitStatus === "completed"
                const displayStats = _.indexOf(displayPermissions.stats, submitStatus) >= 0
                const displayDanger = _.indexOf(displayPermissions.danger, submitStatus) >= 0
                const displayWarning = _.indexOf(displayPermissions.warning, submitStatus) >= 0
                const displayInfo = _.indexOf(displayPermissions.info, submitStatus) >= 0

                return (
                  <div key={i} className="col-xs-12 col-sm-6 col-md-4 text-center campaign-card">
                    <div className="clearfix card-banner-wrapper">
                      <Link to={linkTo}><div className="col-xs-12 card-banner clearfix" style={bannerStyle} /></Link>
                      <Link to={linkTo}><div className="campaign-logo" style={logoStyle} /></Link>
                      <Link to={linkTo}><h3 className="name text-bold">{startupName}</h3></Link>
                      <div className="status-bubble">
                        { displayDanger && <span className="label label-danger">{submitStatus.splitCap("_")}</span> }
                        { displayWarning && <span className="label label-warning">Pending Review</span> }
                        { displayInfo && <span className="label label-info">Not Submitted For Review</span> }
                        { displayStats && <span className="label label-default">Ends {endDate}</span> }
                      </div>
                      <div className="active-bubble">
                        { isActive && <span className="label label-success">Live</span> }
                        { isCompleted && <span className="label label-success">Completed</span> }
                        { !isActive && !isCompleted && <span className="label label-warning">To Be Live Soon</span>}
                      </div>
                    </div>

                    <div className="col-xs-12 card-info">
                      {
                        displayStats && (
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
