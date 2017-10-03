import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AutoAffix from 'react-overlays/lib/AutoAffix'
import Link from 'react-scroll/modules/components/Link'
import Element from 'react-scroll/modules/components/Element'
// import RouteLink from 'react-router/lib/Link'

import { DEFAULT_STARTUP_BANNER, DEFAULT_STARTUP_AVATAR } from '../../../constants'

import {
  getStartup, GET_STARTUP,
  resetStartup
} from '../../../actions/startups'

import LoadingSpinner from '../../shared/loading-spinner'
import ImageBanner from '../../shared/image-banner'

import MyStartupEditOverviewModal from '../../modals/my/startups/edit-overview'

import MyStartupAddHighlightModal from '../../modals/my/startups/add-highlight'
import MyStartupAddKPIModal from '../../modals/my/startups/add-kpi'
import MyStartupAddMilestoneModal from '../../modals/my/startups/add-milestone'
import MyStartupAddPitchDeckModal from '../../modals/my/startups/add-pitch-deck'

const mapStateToProps = (state) => {
  return {
    startup: _.get(state, 'startup', null),
    getStartupInProcess: _.get(state.requestStatus, GET_STARTUP)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStartup: bindActionCreators(getStartup, dispatch),
    resetStartup: bindActionCreators(resetStartup, dispatch)
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
  }

  componentWillUnmount() {
    this.props.resetStartup()
  }

  open(name, editInfo) {
    this.setState({ [name]: true, editInfo })
  }

  close(name) {
    this.setState({ [name]: false, editInfo: false })
  }

  title(title, modalName, editInfo, icon) {
    const iconClass = icon === "edit" ? "fa-pencil" : "fa-plus"
    return (
      <div className="h2">
        {title}
        {
          this.state.editable && (
            <button
              className="btn btn-info pull-right add"
              onClick={() => { this.open(modalName, editInfo) }}
            ><i className={`fa ${iconClass}`} /></button>
          )
        }
      </div>
    )
  }

  emptyContent(title, execute, mode) {
    const keyWord = mode === "edit" ? "Edit" : "Add"
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
    const { startup } = this.props
    const title = "Highlights"
    const highlights = _.get(startup, 'highlights', [])
    return (
      <Element name={title} className="section">
        {this.title(title, 'addHighlight')}
        {this.emptyContent(title, highlights.length === 0)}
        {
          highlights.length > 0 && (
            <div className="row">
              <div className="col-xs-12">
                <ul className="list highlights">
                  {
                    highlights.map((highlight, i) => {
                      return (
                        <li key={i} dangerouslySetInnerHTML={{ __html: htmlDecode(highlight.detail) }} />
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
    const overview = _.get(startup.profile, 'overview')
    return (
      <Element name={title} className="section">
        {this.title(title, "editOverview", overview, "edit")}
        {this.emptyContent(title, !overview, "edit")}
        {overview && <div><p dangerouslySetInnerHTML={{ __html: htmlDecode(overview) }} /></div>}
      </Element>
    )
  }

  moreInfoContentKPI() {
    const { startup } = this.props
    const title = "KPIs"
    const kpis = _.get(startup, 'key_performance_indicators', [])
    return (
      <Element name={title} className="section">
        {this.title(title, 'addKPI')}
        {this.emptyContent(title, kpis.length === 0)}
        {
          kpis.length > 0 && (
            <div className="row">
              <div className="col-xs-12">
                <ul className="list">
                  {
                    kpis.map((kpi, i) => {
                      return (
                        <li key={i} dangerouslySetInnerHTML={{ __html: htmlDecode(kpi.detail) }} />
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

  moreInfoContentMilestones() {
    const { startup } = this.props
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

  moreInfoContentPitchDecks() {
    const { startup } = this.props
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

  render() {
    const { startup, getStartupInProcess, routeParams } = this.props
    const { editable } = this.state

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
                    <ul className="share-list">
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
                {(editable || _.get(startup, "milestones[0]")) && this.moreInfoContentMilestones()}
                {(editable || _.get(startup, "pitch_deck.attachments")) && this.moreInfoContentPitchDecks()}
              </div>
            </section>
          </div>
        </div>

        {this.state.editOverview && <MyStartupEditOverviewModal close={() => { this.close("editOverview") }} params={routeParams} overview={this.state.editInfo} />}

        {this.state.addHighlight && <MyStartupAddHighlightModal close={() => { this.close("addHighlight") }} params={routeParams} />}
        {this.state.addKPI && <MyStartupAddKPIModal close={() => { this.close("addKPI") }} params={routeParams} />}
        {this.state.addMilestone && <MyStartupAddMilestoneModal close={() => { this.close("addMilestone") }} params={routeParams} />}
        {this.state.addPitchDeck && <MyStartupAddPitchDeckModal close={() => { this.close("addPitchDeck") }} params={routeParams} />}
      </div>
    )
  }
}

const htmlDecode = (input) => {
  const e = document.createElement('div')
  e.innerHTML = input
  return e.innerHTML
}
