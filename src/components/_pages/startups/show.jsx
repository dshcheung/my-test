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
import { deleteMyStartupMilestone, DELETE_MY_STARTUP_MILESTONE } from '../../../actions/my/startups/milestones'
import { deleteMyStartupPitchDeck, DELETE_MY_STARTUP_PITCH_DECK } from '../../../actions/my/startups/pitch-decks'
import { deleteMyStartupMedia, DELETE_MY_STARTUP_MEDIA } from '../../../actions/my/startups/media'
import { deleteMyStartupFund, DELETE_MY_STARTUP_FUND } from '../../../actions/my/startups/funds'

import LoadingSpinner from '../../shared/loading-spinner'
import ImageBanner from '../../shared/image-banner'

import MyStartupAddEditTeamModal from '../../modals/my/startups/add-edit-team'

import MyStartupNEHighlightModal from '../../modals/my/startups/ne-highlight'
import MyStartupNEOverviewModal from '../../modals/my/startups/ne-overview'
import MyStartupNEKPIModal from '../../modals/my/startups/ne-kpi'

import MyStartupEditMilestoneModal from '../../modals/my/startups/edit-milestone'
import MyStartupEditMediaModal from '../../modals/my/startups/edit-media'
import MyStartupEditFundModal from '../../modals/my/startups/edit-fund'

import MyStartupAddMilestoneModal from '../../modals/my/startups/add-milestone'
import MyStartupAddPitchDeckModal from '../../modals/my/startups/add-pitch-deck'
import MyStartupAddMediaModal from '../../modals/my/startups/add-media'
import MyStartupAddFundModal from '../../modals/my/startups/add-fund'

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
    deleteMyStartupMilestone: bindActionCreators(deleteMyStartupMilestone, dispatch),
    deleteMyStartupPitchDeck: bindActionCreators(deleteMyStartupPitchDeck, dispatch),
    deleteMyStartupMedia: bindActionCreators(deleteMyStartupMedia, dispatch),
    deleteMyStartupFund: bindActionCreators(deleteMyStartupFund, dispatch)
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

  open(name, editMode, editInfo, editName) {
    // editName needed if passing editInfo to a add-edit modal with multiple update actions
    this.setState({ [name]: true, editMode, editInfo, editName })
  }

  close(name) {
    this.setState({ [name]: false, editMode: false, editInfo: null, editName: null })
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

  moreInfoContentHighlights() {
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
                                className="btn btn-danger btn-outline delete pull-right"
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

  moreInfoContentOverview() {
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

  // ADD & EDIT
  moreInfoContentKPI() {
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

  // ADD & EDIT
  moreInfoContentMilestones() {
    const { startup, requestStatus, routeParams } = this.props
    const { editable } = this.state
    const title = "Milestones"
    const milestones = _.get(startup, "milestones", [])
    return (
      <Element name={title} className="section">
        {this.title(title, 'addMilestone')}
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
                                onClick={() => { this.open("editMilestone", milestone) }}
                              >
                                <i className="fa fa-pencil" />
                              </button>
                            )
                          }
                          {
                            editable && (
                              <button
                                className="btn btn-danger btn-outline delete pull-right"
                                disabled={_.get(requestStatus, `${DELETE_MY_STARTUP_MILESTONE}_${milestone.id}`)}
                                onClick={() => { this.props.deleteMyStartupMilestone({ ...routeParams, milestoneID: milestone.id }) }}
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

  // ADD & EDIT
  moreInfoContentPitchDecks() {
    const { startup, requestStatus, routeParams } = this.props
    const { editable } = this.state
    const title = "Pitch Deck"
    const attachments = _.get(startup.pitch_deck, 'attachments', [])
    return (
      <Element name={title} className="section">
        {this.title(title, 'addPitchDeck')}
        {this.emptyContent(title, attachments.length === 0)}
        {
          attachments.length > 0 && (
            <div>
              <ul>
                {
                  attachments.map((attachment, i) => {
                    return (
                      <li key={i}>
                        {
                          editable && (
                            <button
                              className="btn btn-danger btn-outline delete pull-right"
                              disabled={_.get(requestStatus, `${DELETE_MY_STARTUP_PITCH_DECK}_${attachment.id}`)}
                              onClick={() => { this.props.deleteMyStartupPitchDeck({ ...routeParams, pitchDeckID: attachment.id }) }}
                            >
                              <i className="fa fa-trash" />
                            </button>
                          )
                        }
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

  // ADD & EDIT
  moreInfoContentMedia() {
    const { startup, requestStatus, routeParams } = this.props
    const { editable } = this.state
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
                      <div className="text-center">
                        {
                          editable && (
                            <button
                              className="btn btn-danger btn-outline delete"
                              disabled={_.get(requestStatus, `${DELETE_MY_STARTUP_MEDIA}_${post.id}`)}
                              onClick={() => { this.props.deleteMyStartupMedia({ ...routeParams, mediaID: post.id }) }}
                            >
                              <i className="fa fa-trash" />
                            </button>
                          )
                        }
                        {
                          editable && (
                            <button
                              className="btn btn-info edit"
                              onClick={() => { this.open("editMedia", post) }}
                            >
                              <i className="fa fa-pencil" />
                            </button>
                          )
                        }
                      </div>
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

  // SHOW & EDIT
  moreInfoContentTeam() {
    const { startup } = this.props
    const title = "Team"
    const team = _.get(startup, 'team', {})
    const founders = _.get(team, 'founders', [])
    const story = _.get(team, 'story', '')
    const members = _.get(team, 'members', [])
    const isEmpty = founders.length === 0 && members.length === 0 && !story
    return (
      <Element name={title} className="section team">
        {this.title(title, 'addEditTeam', team, "edit", 'startup.team')}
        {this.emptyContent(title, isEmpty, "edit")}
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

  // ADD & EDIT
  moreInfoContentMarketScope() {}

  // ADD & EDIT
  moreInfoContentRisks() {}

  // ADD & EDIT
  moreInfoContentFunds() {
    const { startup, requestStatus, routeParams } = this.props
    const { editable } = this.state
    const title = "Funds"
    const funds = _.get(startup, 'funds', [])
    return (
      <Element name={title} className="section">
        {this.title(title, 'addFund')}
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
                                onClick={() => { this.open("editFund", fund) }}
                              >
                                <i className="fa fa-pencil" />
                              </button>
                            )
                          }
                          {
                            editable && (
                              <button
                                className="btn btn-danger btn-outline delete pull-right"
                                disabled={_.get(requestStatus, `${DELETE_MY_STARTUP_FUND}_${fund.id}`)}
                                onClick={() => { this.props.deleteMyStartupFund({ ...routeParams, fundID: fund.id }) }}
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

  // ADD & EDIT
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
                  <dd>2016</dd>
                  <dt>Location:</dt>
                  <dd>Hong Kong</dd>
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
                        (editable || _.get(startup, "pitch_deck.title")) && (
                          <li><Link to="Pitch Deck" spy smooth duration={500} offset={-100}>Pitch Deck</Link></li>
                        )
                      }
                      {
                        (editable || _.get(startup, "media[0]")) && (
                          <li><Link to="Media" spy smooth duration={500} offset={-100}>Media</Link></li>
                        )
                      }
                      {
                        (editable || _.get(startup, "team")) && (
                          <li><Link to="Team" spy smooth duration={500} offset={-100}>Team</Link></li>
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
                        (editable || _.get(startup, "funds[0]")) && (
                          <li><Link to="Funds" spy smooth duration={500} offset={-100}>Funds</Link></li>
                        )
                      }
                      {
                        (editable || _.get(startup, "end_notes")) && (
                          <li><Link to="End Notes" spy smooth duration={500} offset={-100}>End Notes</Link></li>
                        )
                      }
                      {
                        (editable || _.get(startup, "attachments[0]")) && (
                          <li><Link to="Documents" spy smooth duration={500} offset={-100}>Documents</Link></li>
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
                {(editable || _.get(startup, "highlights[0]")) && this.moreInfoContentHighlights()}
                {(editable || _.get(startup, "profile.overview")) && this.moreInfoContentOverview()}
                {(editable || _.get(startup, "key_performance_indicators[0]")) && this.moreInfoContentKPI()}
                {/* (editable || _.get(startup, "milestones[0]")) && this.moreInfoContentMilestones() */}
                {/* (editable || _.get(startup, "pitch_deck.attachments")) && this.moreInfoContentPitchDecks() */}
                {/* (editable || _.get(startup, "media[0]")) && this.moreInfoContentMedia() */}
                {/* (editable || _.get(startup, "team")) && this.moreInfoContentTeam() */}
                {/* (editable || _.get(startup, "funds[0]")) && this.moreInfoContentFunds() */}
                {/* (editable || _.get(startup, "attachments[0]")) && this.moreInfoDocuments() */}
              </div>
            </section>
          </div>
        </div>

        {this.state.addEditTeam && <MyStartupAddEditTeamModal close={() => { this.close("addEditTeam") }} params={routeParams} team={this.state.editInfo} />}

        {this.state.neHighlight && <MyStartupNEHighlightModal close={() => { this.close("neHighlight") }} params={routeParams} editMode={editMode} highlight={editInfo} />}
        {this.state.neOverview && <MyStartupNEOverviewModal close={() => { this.close("neOverview") }} params={routeParams} editMode={editMode} profile={this.state.editInfo} />}
        {this.state.neKPI && <MyStartupNEKPIModal close={() => { this.close("neKPI") }} params={routeParams} editMode={editMode} kpi={this.state.editInfo} />}

        {this.state.editMilestone && <MyStartupEditMilestoneModal close={() => { this.close("editMilestone") }} params={routeParams} milestone={this.state.editInfo} />}
        {this.state.editMedia && <MyStartupEditMediaModal close={() => { this.close("editMedia") }} params={routeParams} media={this.state.editInfo} />}
        {this.state.editFund && <MyStartupEditFundModal close={() => { this.close("editFund") }} params={routeParams} fund={this.state.editInfo} />}

        {this.state.addMilestone && <MyStartupAddMilestoneModal close={() => { this.close("addMilestone") }} params={routeParams} />}
        {this.state.addPitchDeck && <MyStartupAddPitchDeckModal close={() => { this.close("addPitchDeck") }} params={routeParams} />}
        {this.state.addMedia && <MyStartupAddMediaModal close={() => { this.close("addMedia") }} params={routeParams} />}
        {this.state.addFund && <MyStartupAddFundModal close={() => { this.close("addFund") }} params={routeParams} />}
      </div>
    )
  }
}

const htmlDecode = (input) => {
  const e = document.createElement('div')
  e.innerHTML = input
  return e.innerHTML
}
