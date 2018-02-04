import React, { Component } from 'react'
import AutoAffix from 'react-overlays/lib/AutoAffix'
import Link from 'react-scroll/modules/components/Link'

import { DEFAULT_STARTUP_BANNER, DEFAULT_STARTUP_AVATAR } from '../../../constants'

import LoadingSpinner from '../loading-spinner'
import SharedStartupsHighlights from './highlights'
import SharedStartupsOverview from './overview'
import SharedStartupsKPIs from './kpis'
import SharedStartupsMilestones from './milestones'
import SharedStartupsFunds from './funds'
import SharedStartupsTeam from './team'
import SharedStartupsPitchDeck from './pitch-deck'
import SharedStartupsMarketScope from './market-scope'
import SharedStartupsRisk from './risk'
import SharedStartupsMedia from './media'
import SharedStartupsAttachments from './attachments'

import MyStartupEProfileModal from '../../modals/my/startups/e-profile'
import MyCampaignsNECampaignModal from '../../modals/my/campaigns/ne-campaign'
import CampaignsNPledgeModal from '../../modals/campaigns/n-pledge'

export default class SharedStartupsProfile extends Component {
  constructor(props) {
    super(props)

    this.state = { eSProfile: false, eCProfile: false, nPledge: false }

    this.close = this.close.bind(this)
  }

  close() {
    this.setState({ eSProfile: false, eCProfile: false, nPledge: false })
  }

  render() {
    const { campaign, startup, loadingInProcess, mainFocus } = this.props
    const sEditable = _.get(startup, 'can.edit', false) && mainFocus === "startup"
    const cEditable = _.get(campaign, 'can.edit', false) && mainFocus === "campaign"
    const canPledge = _.get(campaign, 'can.pledge', false)
    const hasPledged = _.get(campaign, 'can.has_pledged', false)
    const keyword = (sEditable && "Startup Profile") || (cEditable && "Campaign")

    if (loadingInProcess) return <LoadingSpinner />

    if (!startup) {
      return (
        <div className="text-center">
          <h3>No Such Startup</h3>
        </div>
      )
    }

    const routeParams = { ...this.props.routeParams, startupID: startup.id }

    // startup profile stuff
    const banner = _.get(startup, "profile.banner.original") || DEFAULT_STARTUP_BANNER
    const avatar = _.get(startup, "profile.avatar.original") || DEFAULT_STARTUP_AVATAR
    const bannerStyles = { backgroundImage: `url(${banner})` }
    const startupName = _.get(startup, 'name')
    const tagline = _.get(startup, 'profile.tagline')

    // campaign stuff
    const goal = _.get(campaign, 'goal')
    const raised = _.get(campaign, 'raised')
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
      <div id="shared-startups-profile" className="container-fluid">
        <div className="row header">
          <div className="col-xs-12 startup-banner" style={bannerStyles}>
            {
              (sEditable || cEditable) && (
                <div className="row margin-top-15 edit-mode-actions">
                  <div className="col-xs-12 text-center">
                    <button
                      className="btn btn-info"
                      onClick={() => { this.setState({ eSProfile: sEditable, eCProfile: cEditable }) }}
                    ><i className="fa fa-pencil" /> Edit {keyword}</button>
                  </div>
                </div>
              )
            }
            <img src={avatar} className="startup-avatar" alt="Startup Avatar" />
            {campaignName && <div className="h1 campaign-name">{campaignName}</div>}
            {startupName && <div className="h2 startup-name">by {startupName}</div>}
            {tagline && <div className="startup-tagline">{tagline}</div>}
          </div>
        </div>

        <div className="container body">
          {
            campaign && (
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
                      (sEditable || highlightsExist) && (
                        <li><Link to="Highlights" spy smooth duration={500} offset={-100}>Highlights</Link></li>
                      )
                    }
                    {
                      (sEditable || overviewExist) && (
                        <li><Link to="Overview" spy smooth duration={500} offset={-100}>Overview</Link></li>
                      )
                    }
                    {
                      (sEditable || kpisExist) && (
                        <li><Link to="KPIs" spy smooth duration={500} offset={-100}>KPIs</Link></li>
                      )
                    }
                    {
                      (sEditable && milestonesExist) && (
                        <li><Link to="Milestones" spy smooth duration={500} offset={-100}>Milestones</Link></li>
                      )
                    }
                    {
                      (sEditable || fundsExist) && (
                        <li><Link to="Funds" spy smooth duration={500} offset={-100}>Funds</Link></li>
                      )
                    }
                    {
                      (sEditable || teamExist) && (
                        <li><Link to="Team" spy smooth duration={500} offset={-100}>Team</Link></li>
                      )
                    }
                    {
                      (sEditable || pitchDeckExist) && (
                        <li><Link to="Pitch Deck" spy smooth duration={500} offset={-100}>Pitch Deck</Link></li>
                      )
                    }
                    {
                      (sEditable || marketScopeExist) && (
                        <li><Link to="Market Scope" spy smooth duration={500} offset={-100}>Market Scope</Link></li>
                      )
                    }
                    {
                      (sEditable || riskExist) && (
                        <li><Link to="Risk & Disclosure" spy smooth duration={500} offset={-100}>Risk & Disclosure</Link></li>
                      )
                    }
                    {
                      (sEditable || mediaExist) && (
                        <li><Link to="Media" spy smooth duration={500} offset={-100}>Media</Link></li>
                      )
                    }
                    {
                      (sEditable || attachmentsExist) && (
                        <li><Link to="Documents" spy smooth duration={500} offset={-100}>Documents</Link></li>
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
            <div className="col-xs-12 col-sm-9 startup-content">
              {(sEditable || highlightsExist) && <SharedStartupsHighlights highlights={highlights} editable={sEditable} routeParams={routeParams} />}
              {(sEditable || overviewExist) && <SharedStartupsOverview overview={overview} editable={sEditable} routeParams={routeParams} />}
              {(sEditable || kpisExist) && <SharedStartupsKPIs kpis={kpis} editable={sEditable} routeParams={routeParams} />}
              {(sEditable || milestonesExist) && <SharedStartupsMilestones milestones={milestones} editable={sEditable} routeParams={routeParams} />}
              {(sEditable || fundsExist) && <SharedStartupsFunds funds={funds} editable={sEditable} routeParams={routeParams} />}
              {(sEditable || teamExist) && <SharedStartupsTeam team={team} editable={sEditable} routeParams={routeParams} />}
              {(sEditable || pitchDeckExist) && <SharedStartupsPitchDeck pitchDeck={pitchDeck} editable={sEditable} routeParams={routeParams} />}
              {(sEditable || marketScopeExist) && <SharedStartupsMarketScope marketScope={marketScope} editable={sEditable} routeParams={routeParams} />}
              {(sEditable || riskExist) && <SharedStartupsRisk risk={risk} editable={sEditable} routeParams={routeParams} />}
              {(sEditable || mediaExist) && <SharedStartupsMedia media={media} editable={sEditable} routeParams={routeParams} />}
              {(sEditable || attachmentsExist) && <SharedStartupsAttachments attachments={attachments} editable={sEditable} routeParams={routeParams} />}
            </div>
          </div>
        </div>

        {this.state.eSProfile && <MyStartupEProfileModal startup={startup} params={routeParams} close={this.close} />}
        {this.state.eCProfile && <MyCampaignsNECampaignModal campaign={campaign} params={routeParams} close={this.close} editMode />}
        {this.state.nPledge && <CampaignsNPledgeModal close={this.close} params={routeParams} />}
      </div>
    )
  }
}
