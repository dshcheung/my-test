import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AutoAffix from 'react-overlays/lib/AutoAffix'
import Link from 'react-scroll/modules/components/Link'
import Element from 'react-scroll/modules/components/Element'
import RouteLink from 'react-router/lib/Link'

import { DEFAULT_STARTUP_BANNER, DEFAULT_STARTUP_AVATAR } from '../../../constants'

import {
  getStartup, GET_STARTUP,
  resetStartup
} from '../../../actions/startups'

import { dMyStartupHighlight, D_MY_STARTUP_HIGHLIGHT } from '../../../actions/my/startups/highlights'
import { dMyStartupKPI, D_MY_STARTUP_KPI } from '../../../actions/my/startups/kpis'
import { dMyStartupMilestone, D_MY_STARTUP_MILESTONE } from '../../../actions/my/startups/milestones'
import { dMyStartupFund, D_MY_STARTUP_FUND } from '../../../actions/my/startups/funds'

import LoadingSpinner from '../../shared/loading-spinner'
import ImageBanner from '../../shared/image-banner'

import MyStartupNEHighlightModal from '../../modals/my/startups/ne-highlight'
import MyStartupNEOverviewModal from '../../modals/my/startups/ne-overview'
import MyStartupNEKPIModal from '../../modals/my/startups/ne-kpi'
import MyStartupNEMilestoneModal from '../../modals/my/startups/ne-milestone'
import MyStartupNEFundModal from '../../modals/my/startups/ne-fund'
import MyStartupSTeamModal from '../../modals/my/startups/s-team'
import MyStartupSPitchDeckModal from '../../modals/my/startups/s-pitch-deck'
import MyStartupSMarketScopeModal from '../../modals/my/startups/s-market-scope'

import MyStartupEditMediaModal from '../../modals/my/startups/edit-media'

import MyStartupAddMediaModal from '../../modals/my/startups/add-media'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session', null),
    startup: _.get(state, 'startup', null),
    getStartupInProcess: _.get(state.requestStatus, GET_STARTUP),
    requestStatus: _.get(state, 'requestStatus')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStartup: bindActionCreators(getStartup, dispatch),
    resetStartup: bindActionCreators(resetStartup, dispatch),
    dMyStartupHighlight: bindActionCreators(dMyStartupHighlight, dispatch),
    dMyStartupKPI: bindActionCreators(dMyStartupKPI, dispatch),
    dMyStartupMilestone: bindActionCreators(dMyStartupMilestone, dispatch),
    dMyStartupFund: bindActionCreators(dMyStartupFund, dispatch),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class StartupsShow extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  componentWillMount() {
    this.props.getStartup({ params: this.props.routeParams })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ editable: _.get(nextProps, 'startup.is_editable', false) })

    if (this.state.editName) {
      this.setState({ editInfo: _.get(nextProps, this.state.editName) })
    }
  }

  componentWillUnmount() {
    this.props.resetStartup()
  }

  open(modalName, editMode, editInfo, editName) {
    // editName needed if passing editInfo to a add-edit modal with multiple update actions
    this.setState({ [modalName]: true, editMode, editInfo, editName })
  }

  close(modalName) {
    this.setState({ [modalName]: false, editMode: false, editInfo: null, editName: null })
  }

  title(title, modalName, editMode, editInfo, editName) {
    const iconClass = editMode ? "fa-pencil" : "fa-plus"
    return (
      <div className="h2">
        {title}
        {
          this.state.editable && (
            <button
              className="btn btn-info pull-right add"
              onClick={() => { this.open(modalName, editMode, editInfo, editName) }}
            ><i className={`fa ${iconClass}`} /></button>
          )
        }
      </div>
    )
  }

  emptyContent(title, execute, editMode) {
    const keyWord = editMode ? "Edit" : "Add"
    if (this.state.editable && execute) {
      return (
        <div>
          <p>{`Click ${keyWord} Icon To ${keyWord} ${title}`}</p>
        </div>
      )
    }

    return null
  }

  moreInfoHighlights() {
    const { startup, requestStatus, routeParams } = this.props
    const { editable } = this.state
    const title = "Highlights"
    const highlights = _.get(startup, 'highlights', [])
    return (
      <Element name={title} className="section">
        {this.title(title, 'neHighlight', false)}
        {this.emptyContent(title, highlights.length === 0)}
        {
          highlights.length > 0 && (
            <div className="row">
              <div className="col-xs-12">
                <ul className="list highlights">
                  {
                    highlights.map((highlight, i) => {
                      return (
                        <li key={i}>
                          {
                            editable && (
                              <button
                                className="btn btn-info edit pull-right"
                                onClick={() => { this.open("neHighlight", true, highlight) }}
                              >
                                <i className="fa fa-pencil" />
                              </button>
                            )
                          }
                          {
                            editable && (
                              <button
                                className="btn btn-danger delete pull-right"
                                disabled={_.get(requestStatus, `${D_MY_STARTUP_HIGHLIGHT}_${highlight.id}`)}
                                onClick={() => { this.props.dMyStartupHighlight({ ...routeParams, highlightID: highlight.id }) }}
                              >
                                <i className="fa fa-trash" />
                              </button>
                            )
                          }
                          <span dangerouslySetInnerHTML={{ __html: htmlDecode(highlight.detail) }} />
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          )
        }
      </Element>
    )
  }

  moreInfoOverview() {
    const { startup } = this.props
    const title = "Overview"
    const profile = _.get(startup, 'profile')
    const overview = _.get(startup.profile, 'overview')
    return (
      <Element name={title} className="section">
        {this.title(title, "neOverview", !!overview, profile)}
        {this.emptyContent(title, !overview, !!overview)}
        {overview && <div><p dangerouslySetInnerHTML={{ __html: htmlDecode(overview) }} /></div>}
      </Element>
    )
  }

  moreInfoKPI() {
    const { startup, requestStatus, routeParams } = this.props
    const { editable } = this.state
    const title = "KPIs"
    const kpis = _.get(startup, 'key_performance_indicators', [])
    return (
      <Element name={title} className="section">
        {this.title(title, 'neKPI', false)}
        {this.emptyContent(title, kpis.length === 0)}
        {
          kpis.length > 0 && (
            <div className="row">
              <div className="col-xs-12">
                <ul className="list">
                  {
                    kpis.map((kpi, i) => {
                      return (
                        <li key={i}>
                          {
                            editable && (
                              <button
                                className="btn btn-info edit pull-right"
                                onClick={() => { this.open("neKPI", true, kpi) }}
                              >
                                <i className="fa fa-pencil" />
                              </button>
                            )
                          }
                          {
                            editable && (
                              <button
                                className="btn btn-danger btn-outline delete pull-right"
                                disabled={_.get(requestStatus, `${D_MY_STARTUP_KPI}_${kpi.id}`)}
                                onClick={() => { this.props.dMyStartupKPI({ ...routeParams, kpiID: kpi.id }) }}
                              >
                                <i className="fa fa-trash" />
                              </button>
                            )
                          }
                          <span dangerouslySetInnerHTML={{ __html: htmlDecode(kpi.detail) }} />
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          )
        }
      </Element>
    )
  }

  moreInfoMilestones() {
    const { startup, requestStatus, routeParams } = this.props
    const { editable } = this.state
    const title = "Milestones"
    const milestones = _.get(startup, "milestones", [])
    return (
      <Element name={title} className="section">
        {this.title(title, 'neMilestone', false)}
        {this.emptyContent(title, milestones.length === 0)}
        {
          milestones.length > 0 && (
            <div className="row">
              <div className="col-xs-12">
                {
                  milestones.map((milestone, i) => {
                    return (
                      <div className="row milestone" key={i}>
                        <div className="col-xs-12">
                          {
                            editable && (
                              <button
                                className="btn btn-info edit pull-right"
                                onClick={() => { this.open("neMilestone", true, milestone) }}
                              >
                                <i className="fa fa-pencil" />
                              </button>
                            )
                          }
                          {
                            editable && (
                              <button
                                className="btn btn-danger btn-outline delete pull-right"
                                disabled={_.get(requestStatus, `${D_MY_STARTUP_MILESTONE}_${milestone.id}`)}
                                onClick={() => { this.props.dMyStartupMilestone({ ...routeParams, milestoneID: milestone.id }) }}
                              >
                                <i className="fa fa-trash" />
                              </button>
                            )
                          }
                          <div className="h3">{moment(milestone.completed_on).format('MMMM YYYY')}</div>
                          <p dangerouslySetInnerHTML={{ __html: htmlDecode(milestone.detail) }} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        }
      </Element>
    )
  }

  moreInfoFunds() {
    const { startup, requestStatus, routeParams } = this.props
    const { editable } = this.state
    const title = "Funds"
    const funds = _.get(startup, 'funds', [])
    return (
      <Element name={title} className="section">
        {this.title(title, 'neFund', false)}
        {this.emptyContent(title, funds.length === 0)}
        {
          funds.length > 0 && (
            <div className="row">
              <div className="col-xs-12">
                {
                  funds.map((fund, i) => {
                    return (
                      <div className="row fund" key={i}>
                        <div className="col-xs-12">
                          {
                            editable && (
                              <button
                                className="btn btn-info edit pull-right"
                                onClick={() => { this.open("neFund", true, fund) }}
                              >
                                <i className="fa fa-pencil" />
                              </button>
                            )
                          }
                          {
                            editable && (
                              <button
                                className="btn btn-danger btn-outline delete pull-right"
                                disabled={_.get(requestStatus, `${D_MY_STARTUP_FUND}_${fund.id}`)}
                                onClick={() => { this.props.dMyStartupFund({ ...routeParams, fundID: fund.id }) }}
                              >
                                <i className="fa fa-trash" />
                              </button>
                            )
                          }
                          <div className="h3">{moment(fund.received_at).format('MMMM YYYY')}</div>
                          <p><b>{fund.company}</b> ${fund.amount}</p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        }
      </Element>
    )
  }

  moreInfoTeam() {
    const { startup } = this.props
    const title = "Team"
    const team = _.get(startup, 'team', {})
    const founders = _.get(team, 'founders', [])
    const story = _.get(team, 'story', '')
    const members = _.get(team, 'members', [])
    const isEmpty = founders.length === 0 && members.length === 0 && !story
    const editMode = !isEmpty
    return (
      <Element name={title} className="section team">
        {this.title(title, 'sTeam', editMode, team, 'startup.team')}
        {this.emptyContent(title, isEmpty, editMode)}
        {
          story && (
            <div className="row">
              <div className="col-xs-12 team-story">{story}</div>
            </div>
          )
        }
        {
          founders.length > 0 && (
            <div className="row">
              <div className="col-xs-12 team-founder margin-bottom-20">
                <div className="h3">Founders</div>
                {
                  founders.map((member, i) => {
                    return (
                      <div key={i} className="col-xs-12">
                        <div className="col-xs-6 col-sm-4 col-md-4">
                          <img className="full-width" src={member.avatar.original} alt={member.name} />
                        </div>
                        <div className="col-xs-6 col-sm-8 col-md-8">
                          <p>
                            <span className="text-bold header">{member.name}</span>
                            <span className="title">{member.title}</span>
                            <span className="description" dangerouslySetInnerHTML={{ __html: htmlDecode(member.description) }} />
                          </p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        }
        {
          members.length > 0 && (
            <div className="row">
              <div className="col-xs-12 team-member margin-bottom-20">
                <div className="h3">Important Members</div>
                {
                  members.map((member, i) => {
                    return (
                      <div key={i} className="col-xs-6 col-sm-4 col-md-2">
                        <img className="full-width" src={member.avatar.original} alt={member.name} />
                        <p>
                          <span className="text-bold header">{member.name}</span>
                          <span className="title">{member.title}</span>
                        </p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        }
      </Element>
    )
  }

  moreInfoPitchDeck() {
    const { startup } = this.props
    const title = "Pitch Deck"
    const pitchDeck = _.get(startup, 'pitch_deck', {})
    const description = _.get(pitchDeck, 'description', '')
    const attachments = _.get(pitchDeck, 'attachments', [])
    const isEmpty = !description && attachments.length === 0
    const editMode = !isEmpty
    return (
      <Element name={title} className="section">
        {this.title(title, 'sPitchDeck', editMode, pitchDeck, 'startup.pitch_deck')}
        {this.emptyContent(title, isEmpty, editMode)}
        {
          description && (
            <div className="row">
              <div className="col-xs-12 pitch-deck-description" dangerouslySetInnerHTML={{ __html: htmlDecode(description) }} />
            </div>
          )
        }
        {
          attachments.length > 0 && (
            <div>
              <ul>
                {
                  attachments.map((attachment, i) => {
                    return (
                      <li key={i}>
                        <a href={attachment.file.original} className="btn btn-success">
                          {attachment.title}
                          <i className="fa fa-fw fa-download" />
                        </a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          )
        }
      </Element>
    )
  }

  moreInfoMarketScope() {
    const { startup } = this.props
    const title = "Market Scope"
    const marketScope = _.get(startup, 'market_scope', {})
    const description = _.get(marketScope, 'description', '')
    const attachments = _.get(marketScope, 'attachments', [])
    const isEmpty = !description && attachments.length === 0
    const editMode = !isEmpty
    return (
      <Element name={title} className="section">
        {this.title(title, 'sMarketScope', editMode, marketScope, 'startup.market_scope')}
        {this.emptyContent(title, isEmpty, editMode)}
        {
          description && (
            <div className="row">
              <div className="col-xs-12 market-scope-description" dangerouslySetInnerHTML={{ __html: htmlDecode(description) }} />
            </div>
          )
        }
        {
          attachments.length > 0 && (
            <div>
              <ul>
                {
                  attachments.map((attachment, i) => {
                    return (
                      <li key={i}>
                        <a href={attachment.file.original} className="btn btn-success">
                          {attachment.title}
                          <i className="fa fa-fw fa-download" />
                        </a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          )
        }
      </Element>
    )
  }

  // CU
  moreInfoRisks() {}

  // ADD & EDIT
  moreInfoMedia() {
    const { startup } = this.props
    const title = "Media"
    const media = _.get(startup, 'media', [])
    return (
      <Element name={title} className="section">
        {this.title(title, 'addMedia')}
        {this.emptyContent(title, media.length === 0)}
        {
          media.length > 0 && (
            <div className="row">
              {
                media.map((post, i) => {
                  return (
                    <div key={i} className="col-md-2 col-sm3 col-xs-6">
                      <a href={post.link} target="_blank">
                        <img className="img-responsive" key={i} src={post.banner.original} alt={post.title} />
                      </a>
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </Element>
    )
  }

  // CU
  moreInfoDocuments() {
    const { startup, currentUser } = this.props
    const { editable } = this.state
    const title = "Documents"
    const documents = _.get(startup, 'attachments', [])
    const blur = !editable && "blur"
    return (
      <Element name={title} className="section">
        {this.title(title, 'addDocument')}
        {this.emptyContent(title, documents.length === 0)}
        <div className={`row documents ${blur}`}>
          <div className="col-xs-12">
            <ul className="list-style-none">
              {
                documents.map((doc, i) => {
                  return (
                    <li key={i}>
                      {
                        editable && (
                          <button
                            className="btn btn-danger btn-outline delete pull-right"
                            // disabled={_.get(requestStatus, `${DELETE_MY_STARTUP_ATTACHEMENT}_${doc.id}`)}
                            // onClick={() => { this.props.deleteMyStartupAttachment({ ...routeParams, attachmentID: doc.id }) }}
                          >
                            <i className="fa fa-trash" />
                          </button>
                        )
                      }
                      <a href={doc.file.original} className="btn btn-success">
                        {doc.title}
                        <i className="fa fa-fw fa-download" />
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        {
          !currentUser && !editable && (
            <RouteLink className="text-uppercase access btn btn-warning btn-lg" to="/auth/login">
              <i className="fa fa-lock fa-fw" />
              Request Access
            </RouteLink>
          )
        }
      </Element>
    )
  }

  render() {
    const { startup, getStartupInProcess, routeParams } = this.props
    const { editable, editMode, editInfo } = this.state

    if (getStartupInProcess) return <LoadingSpinner />

    if (!startup) {
      return (
        <div className="text-center">
          <h3>No Such Startup</h3>
        </div>
      )
    }

    return (
      <div id="pages-startups-show" className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-10 col-lg-offset-1">
            <section className="row basic-info">
              <div className="col-xs-12 col-md-6">
                <div className="aspect-16-9">
                  <ImageBanner
                    src={`${_.get(startup, "profile.banner.original", null) || DEFAULT_STARTUP_BANNER}`}
                    contain
                  />
                  <img
                    className="startup-avatar position-absolute top-15 left-10"
                    src={`${_.get(startup, "profile.avatar.original", null) || DEFAULT_STARTUP_AVATAR}`}
                    alt={`Logo ${startup.name}}`}
                  />
                </div>
                <dl className="basic-details dl-horizontal">
                  <dt>Founded Year:</dt>
                  <dd>{_.get(startup, "profile.year_founded", null)}</dd>
                  <dt>Location:</dt>
                  <dd>{_.get(startup, "profile.location", null)}</dd>
                  <dt className="hide">Time left to invest:</dt>
                  <dd className="hide">xxxxxxx</dd>
                </dl>
              </div>
              <div className="col-xs-12 col-md-6">
                <h1 className="name text-uppercase">{startup.name}</h1>
                <p className="overview margin-bottom-20" dangerouslySetInnerHTML={{ __html: htmlDecode(_.get(startup.profile, 'tagline', '')) }} />
                <div className="row">
                  <div className="col-xs-12 padding-0 fundings">
                    <div className="col-md-4">
                      <div className="funding-card">
                        <div className="amount">US$1,500,000</div>
                        <div className="title">Raised</div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="funding-card">
                        <div className="amount">US$2,000,000</div>
                        <div className="title">Funding Goal</div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="funding-card">
                        <div className="amount">7</div>
                        <div className="title">Investors</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <ul className="share-list clearfix">
                      <li>
                        <div>
                          <span className="amount">8.00%</span>
                          <span className="title"> Interest Rate</span>
                        </div>
                        <div>
                          <span className="amount">20%</span>
                          <span className="title">Discount</span>
                        </div>
                      </li>
                      <li className="">
                        <div className="amount">US$10,000,000</div>
                        <div className="title">CAP</div>
                      </li>
                      <li>
                        <div className="amount">Convertible</div>
                        <div className="title">Security Type</div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bar margin-top-50">
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "75%" }} />
                    <div className="progress-start filled" />
                    <div className="progress-end" />
                  </div>
                  <div className="clearfix progress-percent">
                    <div className="pull-right">
                      <span><strong>75%</strong> achieved</span>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary btn-lg padding-20 btn-block btn-invest text-uppercase">Invest Now</button>
                <div className="warning margin-top-50 hide">
                  <span className="text-bold">Purchased securities are not currently tradeable.</span>
                  <p className="instruction">Expect to hold your investment until the company lists on a national exchange or is acquired.</p>
                </div>
              </div>
            </section>

            <hr />

            <section className="row more-info">
              <div className="col-xs-12 col-sm-3">
                <AutoAffix viewportOffsetTop={100} container={this}>
                  <div className="sidebar-wrapper">
                    <ul className="scrollto">
                      {
                        (editable || _.get(startup, "highlights[0]")) && (
                          <li><Link to="Highlights" spy smooth duration={500} offset={-100}>Highlights</Link></li>
                        )
                      }
                      {
                        (editable || _.get(startup, "profile.overview")) && (
                          <li><Link to="Overview" spy smooth duration={500} offset={-100}>Overview</Link></li>
                        )
                      }
                      {
                        (editable || _.get(startup, "key_performance_indicators[0]")) && (
                          <li><Link to="KPIs" spy smooth duration={500} offset={-100}>KPIs</Link></li>
                        )
                      }
                      {
                        (editable || _.get(startup, "milestones[0]")) && (
                          <li><Link to="Milestones" spy smooth duration={500} offset={-100}>Milestones</Link></li>
                        )
                      }
                      {
                        (editable || _.get(startup, "funds[0]")) && (
                          <li><Link to="Funds" spy smooth duration={500} offset={-100}>Funds</Link></li>
                        )
                      }
                      {
                        (editable || _.get(startup, "team")) && (
                          <li><Link to="Team" spy smooth duration={500} offset={-100}>Team</Link></li>
                        )
                      }
                      {
                        (editable || _.get(startup, "pitch_deck.title")) && (
                          <li><Link to="Pitch Deck" spy smooth duration={500} offset={-100}>Pitch Deck</Link></li>
                        )
                      }
                      {
                        (editable || _.get(startup, "market_scope.title")) && (
                          <li><Link to="Market Scope" spy smooth duration={500} offset={-100}>Market Scope</Link></li>
                        )
                      }
                      {
                        (editable || _.get(startup, "risk.title")) && (
                          <li><Link to="Risk & Disclosure" spy smooth duration={500} offset={-100}>Risk & Disclosure</Link></li>
                        )
                      }
                      {
                        (editable || _.get(startup, "media[0]")) && (
                          <li><Link to="Media" spy smooth duration={500} offset={-100}>Media</Link></li>
                        )
                      }
                      {
                        (editable || _.get(startup, "attachments[0]")) && (
                          <li><Link to="Documents" spy smooth duration={500} offset={-100}>Documents</Link></li>
                        )
                      }
                      {
                        (editable || _.get(startup, "end_notes")) && (
                          <li><Link to="End Notes" spy smooth duration={500} offset={-100}>End Notes</Link></li>
                        )
                      }
                    </ul>

                    <hr />

                    <ul className="links">
                      <li><i className="fa fa-commenting-o" /><span>Investor Discussion</span></li>
                      <li><i className="fa fa-pencil-square-o" /><span>Startup Survey</span></li>
                      <li><i className="fa fa-envelope-o" /><span>Contact AngelHub</span></li>
                    </ul>
                  </div>
                </AutoAffix>
              </div>
              <div className="col-xs-12 col-sm-9">
                {(editable || _.get(startup, "highlights[0]")) && this.moreInfoHighlights()}
                {(editable || _.get(startup, "profile.overview")) && this.moreInfoOverview()}
                {(editable || _.get(startup, "key_performance_indicators[0]")) && this.moreInfoKPI()}
                {(editable || _.get(startup, "milestones[0]")) && this.moreInfoMilestones()}
                {(editable || _.get(startup, "funds[0]")) && this.moreInfoFunds()}
                {(editable || _.get(startup, "team")) && this.moreInfoTeam()}
                {(editable || _.get(startup, "pitch_deck.attachments[0]")) && this.moreInfoPitchDeck()}
                {(editable || _.get(startup, "market_scope.attachments[0]")) && this.moreInfoMarketScope()}
                {(editable || _.get(startup, "risk.attachments[0]")) && this.moreInfoRisks()}
                {/* (editable || _.get(startup, "media[0]")) && this.moreInfoMedia() */}
                {/* (editable || _.get(startup, "attachments[0]")) && this.moreInfoDocuments() */}
                {/* (editable || _.get(startup, "end_notes")) && this.moreInfo() */}
              </div>
            </section>
          </div>
        </div>

        {this.state.neHighlight && <MyStartupNEHighlightModal close={() => { this.close("neHighlight") }} params={routeParams} editMode={editMode} highlight={editInfo} />}
        {this.state.neOverview && <MyStartupNEOverviewModal close={() => { this.close("neOverview") }} params={routeParams} editMode={editMode} profile={this.state.editInfo} />}
        {this.state.neKPI && <MyStartupNEKPIModal close={() => { this.close("neKPI") }} params={routeParams} editMode={editMode} kpi={this.state.editInfo} />}
        {this.state.neMilestone && <MyStartupNEMilestoneModal close={() => { this.close("neMilestone") }} params={routeParams} editMode={editMode} milestone={this.state.editInfo} />}
        {this.state.neFund && <MyStartupNEFundModal close={() => { this.close("neFund") }} params={routeParams} editMode={editMode} fund={this.state.editInfo} />}
        {this.state.sTeam && <MyStartupSTeamModal close={() => { this.close("sTeam") }} params={routeParams} editMode={editMode} team={this.state.editInfo} />}
        {this.state.sPitchDeck && <MyStartupSPitchDeckModal close={() => { this.close("sPitchDeck") }} params={routeParams} editMode={editMode} pitchDeck={this.state.editInfo} />}
        {this.state.sMarketScope && <MyStartupSMarketScopeModal close={() => { this.close("sMarketScope") }} params={routeParams} editMode={editMode} marketScope={this.state.editInfo} />}

        {this.state.editMedia && <MyStartupEditMediaModal close={() => { this.close("editMedia") }} params={routeParams} media={this.state.editInfo} />}
        {this.state.addMedia && <MyStartupAddMediaModal close={() => { this.close("addMedia") }} params={routeParams} />}
      </div>
    )
  }
}

const htmlDecode = (input) => {
  const e = document.createElement('div')
  e.innerHTML = input
  return e.innerHTML
}
