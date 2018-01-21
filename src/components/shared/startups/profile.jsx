import React, { Component } from 'react'
import AutoAffix from 'react-overlays/lib/AutoAffix'
import Link from 'react-scroll/modules/components/Link'
import Element from 'react-scroll/modules/components/Element'
import RouteLink from 'react-router/lib/Link'

import { DEFAULT_STARTUP_BANNER, DEFAULT_STARTUP_AVATAR, DEFAULT_USER_AVATAR } from '../../../constants'

import LoadingSpinner from '../loading-spinner'

export default class StartupsProfile extends Component {
  render() {
    const { campaign, startup, loadingInProcess } = this.props

    if (loadingInProcess) return <LoadingSpinner />

    if (!startup) {
      return (
        <div className="text-center">
          <h3>No Such Startup</h3>
        </div>
      )
    }

    const banner = _.get(startup, "profile.banner.original", DEFAULT_STARTUP_BANNER)
    const avatar = _.get(startup, "profile.avatar.original", DEFAULT_STARTUP_AVATAR)
    const bannerStyles = { backgroundImage: `url(${banner})` }
    const campaignName = campaign.campaign_type.name
    const startupName = startup.name
    const tagline = startup.profile.tagline

    const goal = campaign.goal
    const raised = campaign.raised
    const achieved = Math.floor((raised / goal) * 100)
    const investorNum = campaign.number_of_investors
    const endDate = moment(campaign.end_date).diff(moment(), 'days')

    const campaignType = campaign.campaign_type
    const valuationType = campaignType.amount_type === "valuation_cap" ? "Valuation Cap" : "Equity Cap"
    const interestRate = campaignType.interest_rate
    const maturityDate = moment(campaignType.maturity_date).format("YYYY MMMM DD")

    return (
      <div id="shared-startups-profile" className="container-fluid">
        <div className="row header">
          <div className="col-xs-12 startup-banner" style={bannerStyles}>
            <img src={avatar} className="startup-avatar" alt="Startup Avatar" />
            <div className="h1 campaign-name">{campaignName}</div>
            <div className="h2 startup-name">by {startupName}</div>
            <div className="startup-tagline">{tagline}</div>
          </div>
        </div>

        <div className="row campaign-stats">
          <div className="col-xs-12 col-sm-6 left">
            <div className="h3 valuation-type">{valuationType}</div>

            <div className="finance-stat">
              <div className="stat-group">
                <div>{interestRate}</div>
                <div>Percent</div>
              </div>

              <div className="stat-group">
                <div>{maturityDate}</div>
                <div>Maturity Date</div>
              </div>
            </div>
          </div>

          <div className="col-xs-12 col-sm-6 right">
            <div className="progress">
              <div className="progress-bar" role="progressbar" aria-valuenow={achieved} aria-valuemin="0" aria-valuemax="100" style={{ width: `${achieved}%` }} />
              <div className="progress-start filled" />
              <div className="progress-end" />
            </div>

            <div className="amount-stat">
              <div className="stat-group">
                <div>$ {raised.currency()}</div>
                <div>Raised of ${goal.currency()}</div>
              </div>

              <div className="stat-group">
                <div>{investorNum}</div>
                <div>Investors</div>
              </div>

              <div className="stat-group">
                <div>{endDate}</div>
                <div>Days Left</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row pledge">
          <div className="col-xs-12 clearfix">
            <button
              className="btn btn-primary btn-block btn-lg"
            >Pledge Now</button>
          </div>
        </div>

        <div className="row startup-info">
          <div className="col-xs-12 col-sm-3 auto-affix">
            <AutoAffix viewportOffsetTop={100} container={this}>
              <div className="sidebar-wrapper">
                <ul className="scrollto">
                  {
                    _.get(startup, "highlights[0]") && (
                      <li><Link to="Highlights" spy smooth duration={500} offset={-100}>Highlights</Link></li>
                    )
                  }
                  {
                    _.get(startup, "profile.overview") && (
                      <li><Link to="Overview" spy smooth duration={500} offset={-100}>Overview</Link></li>
                    )
                  }
                  {
                    _.get(startup, "key_performance_indicators[0]") && (
                      <li><Link to="KPIs" spy smooth duration={500} offset={-100}>KPIs</Link></li>
                    )
                  }
                  {
                    _.get(startup, "milestones[0]") && (
                      <li><Link to="Milestones" spy smooth duration={500} offset={-100}>Milestones</Link></li>
                    )
                  }
                  {
                    _.get(startup, "funds[0]") && (
                      <li><Link to="Funds" spy smooth duration={500} offset={-100}>Funds</Link></li>
                    )
                  }
                  {
                    _.get(startup, "team") && (
                      <li><Link to="Team" spy smooth duration={500} offset={-100}>Team</Link></li>
                    )
                  }
                  {
                    _.get(startup, "pitch_deck") && (
                      <li><Link to="Pitch Deck" spy smooth duration={500} offset={-100}>Pitch Deck</Link></li>
                    )
                  }
                  {
                    _.get(startup, "market_scope") && (
                      <li><Link to="Market Scope" spy smooth duration={500} offset={-100}>Market Scope</Link></li>
                    )
                  }
                  {
                    _.get(startup, "risk") && (
                      <li><Link to="Risk & Disclosure" spy smooth duration={500} offset={-100}>Risk & Disclosure</Link></li>
                    )
                  }
                  {
                    _.get(startup, "media[0]") && (
                      <li><Link to="Media" spy smooth duration={500} offset={-100}>Media</Link></li>
                    )
                  }
                  {
                    _.get(startup, "attachments[0]") && (
                      <li><Link to="Documents" spy smooth duration={500} offset={-100}>Documents</Link></li>
                    )
                  }
                  {
                    _.get(startup, "end_notes") && (
                      <li><Link to="End Notes" spy smooth duration={500} offset={-100}>End Notes</Link></li>
                    )
                  }
                </ul>

                <hr />

                <ul className="links">
                  <li><i className="fa fa-commenting-o" /><span>Investor Discussion</span></li>
                  <li><i className="fa fa-envelope-o" /><span>{ `Contact ${startup.name}` }</span></li>
                </ul>
              </div>
            </AutoAffix>
          </div>
        </div>
      </div>
    )
  }
}
