import React, { Component } from 'react'
import AutoAffix from 'react-overlays/lib/AutoAffix'
import Link from 'react-scroll/modules/components/Link'
import { Link as RouteLink } from 'react-router'

import { DEFAULT_STARTUP_BANNER, DEFAULT_STARTUP_AVATAR } from '../../../constants'


import SharedStartupsTextSection from '../startups/text-section'
import SharedStartupsPitchDeck from '../startups/pitch-deck'
import SharedStartupsTeam from '../startups/team'
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
    const updates = _.get(startup, "profile.updates")
    const highlights = _.get(startup, "profile.highlights")
    const overview = _.get(startup, "profile.overview")
    const pitchDeck = _.get(startup, "pitch_deck")
    const market = _.get(startup, "profile.market")
    const strategy = _.get(startup, "profile.strategy")
    const team = _.get(startup, "team")
    const useOfFunds = _.get(startup, "profile.use_of_funds")
    const media = _.get(startup, "media")
    const attachments = _.get(startup, "attachments")

    const startupData = [
      { // TODO: remind gram to add canUpdate? to campaign.can to allow updates to be updated after submittion
        key: "updates",
        title: "Updates",
        modal: SharedStartupsTextSection,
        data: updates,
        exist: !!updates
      },
      {
        key: "highlights",
        title: "Highlights",
        modal: SharedStartupsTextSection,
        data: highlights,
        exist: !!highlights
      },
      {
        key: "overview",
        title: "Overview",
        modal: SharedStartupsTextSection,
        data: overview,
        exist: !!overview
      },
      {
        title: "Pitch Deck",
        modal: SharedStartupsPitchDeck,
        data: pitchDeck,
        exist: !!pitchDeck
      },
      {
        key: "market",
        title: "Market",
        modal: SharedStartupsTextSection,
        data: market,
        exist: !!market
      },
      {
        key: "strategy",
        title: "Strategy",
        modal: SharedStartupsTextSection,
        data: strategy,
        exist: !!strategy
      },
      {
        title: "Team",
        modal: SharedStartupsTeam,
        data: team,
        exist: !!team
      },
      {
        key: "useOfFunds",
        title: "Use of Funds",
        modal: SharedStartupsTextSection,
        data: useOfFunds,
        exist: !!useOfFunds
      },
      {
        title: "Media",
        modal: SharedStartupsMedia,
        data: media,
        exist: media.length >= 0
      },
      {
        title: "Dataroom",
        modal: SharedStartupsAttachments,
        data: attachments,
        exist: attachments.length >= 0,
        extra: { viewDataRoom: campaign.can.view_data_room }
      }
    ]

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
                  onClick={() => { this.props.router.push(`/my/campaigns/${campaign.id}/edit/stage_three`) }}
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
                        >{canPledge && !hasPledged && "Invest Now"}{hasPledged && "You Have Invested"}</button>
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
                      startupData.map((d) => {
                        return (modalEditable || d.exist) ? (
                          <li key={d.title}><Link to={d.title} spy smooth duration={500} offset={-100}>{d.title}</Link></li>
                        ) : null
                      })
                    }
                  </ul>
                </div>
              </AutoAffix>
            </div>
            <div className="col-xs-12 col-sm-9 startup-content">
              {
                startupData.map((d) => {
                  return (modalEditable || d.exist) ? (
                    <d.modal key={d.title} data={d} editable={modalEditable} routeParams={routeParams} {...d.extra} />
                  ) : null
                })
              }
            </div>
          </div>
        </div>

        {this.state.eHeader && <MyStartupsEHeaderModal close={this.close} params={routeParams} /> }
        {this.state.nPledge && <CampaignsNPledgeModal close={this.close} params={routeParams} campaign={campaign} />}
      </div>
    )
  }
}
