import React, { Component } from 'react'
import AutoAffix from 'react-overlays/lib/AutoAffix'
import Link from 'react-scroll/modules/components/Link'
import { Link as RouteLink } from 'react-router'

import { DEFAULT_STARTUP_BANNER, DEFAULT_STARTUP_AVATAR } from '../../../constants'

import SharedStartupsHighlights from '../startups/highlights'
import SharedStartupsOverview from '../startups/overview'
import SharedStartupsKPIs from '../startups/kpis'
import SharedStartupsMilestones from '../startups/milestones'
import SharedStartupsFunds from '../startups/funds'
import SharedStartupsTeam from '../startups/team'
import SharedStartupsPitchDeck from '../startups/pitch-deck'
import SharedStartupsMarketScope from '../startups/market-scope'
import SharedStartupsRisk from '../startups/risk'
import SharedStartupsMedia from '../startups/media'
import SharedStartupsAttachments from '../startups/attachments'

import MyStartupsEHeaderModal from '../../modals/my/startups/e-header'
import CampaignsNPledgeModal from '../../modals/campaigns/n-pledge'

export default class SharedCampaignsProfile extends Component {
  constructor(props) {
    super(props)

    this.state = { nPledge: false, eHeader: false }

    this.close = this.close.bind(this)
  }

  close() {
    this.setState({ nPledge: false, eHeader: false })
  }

  render() {
    const { campaign, startup, editMode } = this.props
    const editable = _.get(campaign, 'can.edit', false)
    const modalEditable = editMode && editable
    const canPledge = _.get(campaign, 'can.pledge', false)
    const hasPledged = _.get(campaign, 'can.view_pledge', false)
    // TODO: dataroom...remind gram to add is_owner flag
    // const canViewDataRoom = _.get(campaign, 'can.view_data_room', null)

    const routeParams = { ...this.props.routeParams, startupID: startup.id }

    // startup profile stuff
    const banner = _.get(startup, "profile.banner.original") || DEFAULT_STARTUP_BANNER
    const avatar = _.get(startup, "profile.avatar.original") || DEFAULT_STARTUP_AVATAR
    const bannerStyles = { backgroundImage: `url(${banner})` }
    const startupName = _.get(startup, 'name')
    const tagline = _.get(startup, 'profile.tagline')

    // campaign stuff
    const goal = _.get(campaign, 'goal') || 0
    const raised = _.get(campaign, 'raised') || 0
    const achieved = Math.floor((raised / goal) * 100)
    const investorNum = _.get(campaign, 'number_of_investors')
    const endDate = moment(_.get(campaign, 'end_date')).diff(moment(), 'days')

    const campaignType = _.get(campaign, 'campaign_type')
    const campaignName = _.get(campaignType, 'name')
    const valuationType = _.get(campaignType, 'amount_type') === "valuation_cap" ? "Valuation Cap" : "Equity Cap"
    const interestRate = _.get(campaignType, 'interest_rate')
    const maturityDate = moment(_.get(campaignType, 'maturity_date')).format("YYYY MMMM DD")

    // startup content stuff
    const highlights = _.get(startup, "highlights", [])
    const highlightsExist = highlights.length > 0
    const overview = _.get(startup, "profile.overview", null)
    const overviewExist = !!overview
    const kpis = _.get(startup, "key_performance_indicators", [])
    const kpisExist = kpis.length > 0
    const milestones = _.get(startup, "milestones", [])
    const milestonesExist = milestones.length > 0
    const funds = _.get(startup, "funds", [])
    const fundsExist = funds.length > 0
    const team = _.get(startup, "team", {})
    const teamExist = !!team
    const pitchDeck = _.get(startup, "pitch_deck", {})
    const pitchDeckExist = !!pitchDeck
    const marketScope = _.get(startup, "market_scope", {})
    const marketScopeExist = !!marketScope
    const risk = _.get(startup, "risk", {})
    const riskExist = !!risk
    const media = _.get(startup, "media", [])
    const mediaExist = media.length > 0
    const attachments = _.get(startup, "attachments", null)
    const attachmentsExist = !!attachments

    return (
      <div id="shared-campaigns-profile" className="container-fluid">
        {
          editMode && (
            <div className="text-center margin-bottom-15">
              <RouteLink to={`/my/campaigns/${campaign.id}`} className="btn btn-info">Preview This</RouteLink>
            </div>
          )
        }
        {
          editable && !editMode && (
            <div className="row margin-top-15 edit-mode-actions">
              <div className="col-xs-12 text-center">
                <button
                  className="btn btn-info"
                  onClick={() => { this.props.router.push(`/my/campaigns/${campaign.id}/edit#stage_four`) }}
                ><i className="fa fa-pencil" /> Edit Startup</button>
              </div>
            </div>
          )
        }
        <div className="row header">
          <div className="col-xs-12 startup-banner" style={bannerStyles}>
            {
              modalEditable && <button
                className="btn btn-info top-15 right-15 position-absolute"
                onClick={() => { this.setState({ eHeader: true }) }}
              ><i className="fa fa-pencil" /></button>
            }
            <img src={avatar} className="startup-avatar" alt="Startup Avatar" />
            {campaignName && <div className="h1 campaign-name">{campaignName}</div>}
            {startupName && <div className="h2 startup-name">by {startupName}</div>}
            {tagline && <div className="startup-tagline">{tagline}</div>}
          </div>
        </div>

        <div className="container body">
          {
            campaign && !editMode && (
              <div className="row campaign">
                <div className="campaign-stats">
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

                {
                  (canPledge || hasPledged) && (
                    <div className="pledge">
                      <div className="col-xs-12 clearfix">
                        <button
                          className="btn btn-primary btn-block btn-lg"
                          onClick={() => { this.setState({ nPledge: true }) }}
                          disabled={hasPledged}
                        >{canPledge && "Pledge Now"}{hasPledged && "You Have Pledged"}</button>
                      </div>
                    </div>
                  )
                }
              </div>
            )
          }

          <div className="row startup">
            { campaign && <hr /> }
            <div className="col-xs-12 col-sm-3 auto-affix hidden-xs">
              <AutoAffix viewportOffsetTop={100} container={this}>
                <div className="sidebar-wrapper">
                  <ul className="scrollto">
                    {
                      (modalEditable || highlightsExist) && (
                        <li><Link to="Highlights" spy smooth duration={500} offset={-100}>Highlights</Link></li>
                      )
                    }
                    {
                      (modalEditable || overviewExist) && (
                        <li><Link to="Overview" spy smooth duration={500} offset={-100}>Overview</Link></li>
                      )
                    }
                    {
                      (modalEditable || kpisExist) && (
                        <li><Link to="KPIs" spy smooth duration={500} offset={-100}>KPIs</Link></li>
                      )
                    }
                    {
                      (modalEditable && milestonesExist) && (
                        <li><Link to="Milestones" spy smooth duration={500} offset={-100}>Milestones</Link></li>
                      )
                    }
                    {
                      (modalEditable || fundsExist) && (
                        <li><Link to="Funds" spy smooth duration={500} offset={-100}>Funds</Link></li>
                      )
                    }
                    {
                      (modalEditable || teamExist) && (
                        <li><Link to="Team" spy smooth duration={500} offset={-100}>Team</Link></li>
                      )
                    }
                    {
                      (modalEditable || pitchDeckExist) && (
                        <li><Link to="Pitch Deck" spy smooth duration={500} offset={-100}>Pitch Deck</Link></li>
                      )
                    }
                    {
                      (modalEditable || marketScopeExist) && (
                        <li><Link to="Market Scope" spy smooth duration={500} offset={-100}>Market Scope</Link></li>
                      )
                    }
                    {
                      (modalEditable || riskExist) && (
                        <li><Link to="Risk & Disclosure" spy smooth duration={500} offset={-100}>Risk & Disclosure</Link></li>
                      )
                    }
                    {
                      (modalEditable || mediaExist) && (
                        <li><Link to="Media" spy smooth duration={500} offset={-100}>Media</Link></li>
                      )
                    }
                    {
                      (modalEditable || attachmentsExist) && (
                        <li><Link to="Documents" spy smooth duration={500} offset={-100}>Documents</Link></li>
                      )
                    }
                  </ul>

                  {/*
                    <hr />

                    <ul className="links">
                      <li><i className="fa fa-commenting-o" /><span>Investor Discussion</span></li>
                      <li><i className="fa fa-envelope-o" /><span>{ `Contact ${startup.name}` }</span></li>
                    </ul>
                  */}
                </div>
              </AutoAffix>
            </div>
            <div className="col-xs-12 col-sm-9 startup-content">
              {(modalEditable || highlightsExist) && <SharedStartupsHighlights highlights={highlights} editable={modalEditable} routeParams={routeParams} />}
              {(modalEditable || overviewExist) && <SharedStartupsOverview overview={overview} editable={modalEditable} routeParams={routeParams} />}
              {(modalEditable || kpisExist) && <SharedStartupsKPIs kpis={kpis} editable={modalEditable} routeParams={routeParams} />}
              {(modalEditable || milestonesExist) && <SharedStartupsMilestones milestones={milestones} editable={modalEditable} routeParams={routeParams} />}
              {(modalEditable || fundsExist) && <SharedStartupsFunds funds={funds} editable={modalEditable} routeParams={routeParams} />}
              {(modalEditable || teamExist) && <SharedStartupsTeam team={team} editable={modalEditable} routeParams={routeParams} />}
              {(modalEditable || pitchDeckExist) && <SharedStartupsPitchDeck pitchDeck={pitchDeck} editable={modalEditable} routeParams={routeParams} />}
              {(modalEditable || marketScopeExist) && <SharedStartupsMarketScope marketScope={marketScope} editable={modalEditable} routeParams={routeParams} />}
              {(modalEditable || riskExist) && <SharedStartupsRisk risk={risk} editable={modalEditable} routeParams={routeParams} />}
              {(modalEditable || mediaExist) && <SharedStartupsMedia media={media} editable={modalEditable} routeParams={routeParams} />}
              {(modalEditable || attachmentsExist) && <SharedStartupsAttachments attachments={attachments} editable={modalEditable} routeParams={routeParams} />}
            </div>
          </div>
        </div>

        {this.state.eHeader && <MyStartupsEHeaderModal close={this.close} params={routeParams} /> }
        {this.state.nPledge && <CampaignsNPledgeModal close={this.close} params={routeParams} />}
      </div>
    )
  }
}
