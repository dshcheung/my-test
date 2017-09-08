import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AutoAffix from 'react-overlays/lib/AutoAffix'
import Link from 'react-scroll/modules/components/Link'
import Element from 'react-scroll/modules/components/Element'
import RouteLink from 'react-router/lib/Link'

import {
  getStartup,
  resetStartup
} from '../../../actions/startups'

import LoadingSpinner from '../../shared/loading-spinner'
import ImageBanner from '../../shared/image-banner'

const mapStateToProps = (state) => {
  return {
    startup: _.get(state, 'startups.show', null),
    getStartupInProcess: _.get(state, 'requestStatus.GET_STARTUP')
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
  componentWillMount() {
    this.props.getStartup({ params: this.props.routeParams })
  }

  componentWillUnmount() {
    this.props.resetStartup()
  }

  htmlDecode(input) {
    const e = document.createElement('div')
    e.innerHTML = input
    return e.innerHTML
  }

  render() {
    const { startup, getStartupInProcess } = this.props

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
                    src={`${_.get(startup, "profile.banner.original", null) || "/company-logo.jpg"}`}
                    contain
                  />
                  <img className="startup-avatar position-absolute top-15 left-10" src={`${_.get(startup, "profile.avatar.original", null) || "/company-logo.jpg"}`} alt={`Logo ${startup.name}}`} />
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
                <p className="overview margin-bottom-20" dangerouslySetInnerHTML={{ __html: this.htmlDecode(startup.profile.tagline) }} />
                <div className="row">
                  <div className="col-xs-12 padding-0 fundings">
                    <div className="col-md-4">
                      <div className="funding-card">
                        <div className="amount">US$900,000</div>
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
                        <div className="amount">8.00%</div>
                        <div className="title">Interest Rate</div>
                        <div className="amount">20%</div>
                        <div className="title">Discount</div>
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
                    <div className="progress-bar" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={{ width: "45%" }} />
                    <div className="progress-start filled" />
                    <div className="progress-end" />
                  </div>
                  <div className="clearfix progress-percent">
                    <div className="pull-right">
                      <span><strong>45%</strong> achieved</span>
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

            <section className="row more-info" id="denis">
              <div className="col-xs-12 col-sm-3">
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
                        _.get(startup, "pitch_deck.title") && (
                          <li><Link to="Pitch Deck" spy smooth duration={500} offset={-100}>Pitch Deck</Link></li>
                        )
                      }
                      {
                        _.get(startup, "media[0]") && (
                          <li><Link to="Media" spy smooth duration={500} offset={-100}>Media</Link></li>
                        )
                      }
                      {
                        _.get(startup, "members[0]") && (
                          <li><Link to="Team" spy smooth duration={500} offset={-100}>Team</Link></li>
                        )
                      }
                      {
                        _.get(startup, "market_scope.title") && (
                          <li><Link to="Market Scope" spy smooth duration={500} offset={-100}>Market Scope</Link></li>
                        )
                      }
                      {
                        _.get(startup, "risk.title") && (
                          <li><Link to="Risk & Disclosure" spy smooth duration={500} offset={-100}>Risk & Disclosure</Link></li>
                        )
                      }
                      {
                        _.get(startup, "end_notes") && (
                          <li><Link to="End Notes" spy smooth duration={500} offset={-100}>End Notes</Link></li>
                        )
                      }
                      {
                        _.get(startup, "attachments[0]") && (
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
                {_.get(startup, "highlights[0]") && moreInfoContentList("Highlights", startup.highlights, 'highlights')}
                {_.get(startup, "profile.overview") && moreInfoContent("Overview", startup.profile.overview)}
                {_.get(startup, "key_performance_indicators[0]") && moreInfoContentList("KPIs", startup.key_performance_indicators)}
                {_.get(startup, "milestones[0]") && moreInfoContentMilestones("Milestones", startup.milestones)}
                {_.get(startup, "pitch_deck.title") && moreInfoContentPitchDeck("Pitch Deck", startup.pitch_deck.attachments)}
                {_.get(startup, "media[0]") && moreInfoContentMedia("Media", startup.media)}
                {_.get(startup, "members[0]") && moreInfoContentTeam("Team", startup.members)}
                {_.get(startup, "market_scope.title") && moreInfoContentMarketScope("Market Scope", startup.market_scope.title, startup.market_scope.description, startup.market_scope.attachments)}
                {_.get(startup, "risk.title") && moreInfoContent("Risk & Disclosure", startup.risk.title)}
                {_.get(startup, "end_notes") && moreInfoContent("End Notes", startup.end_notes)}
                {_.get(startup, "attachments[0]") && moreInfoDocuments("Documents", startup.attachments)}
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

const moreInfoContent = (title, content) => {
  return (
    <Element name={title} className="section">
      <div className="h2">{title}</div>
      <div>
        <p dangerouslySetInnerHTML={{ __html: htmlDecode(content) }} />
      </div>
    </Element>
  )
}

const moreInfoContentList = (title, items, className) => {
  return (
    <Element name={title} className="section">
      <div className="h2">{title}</div>
      <div className="row">
        <div className="col-xs-12">
          <ul className={"list " + className}>
            {
              items.map((item, k) => {
                return (
                  <li key={k} dangerouslySetInnerHTML={{ __html: htmlDecode(item.detail) }} />
                )
              })
            }
          </ul>
        </div>
      </div>
    </Element>
  )
}

const moreInfoContentMilestones = (title, milestones) => {
  return (
    <Element name={title} className="section">
      <div className="h2">{title}</div>
      <div className="row">
        <div className="col-xs-12">
          {
            milestones.map((milestone) => {
              return (
                <div className="row milestone" key={milestone.id}>
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
    </Element>
  )
}

const moreInfoContentPitchDeck = (title, attachments) => {
  return (
    <Element name={title} className="section">
      <div className="h2">{title}</div>
      <div>
        <ul className="">
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
    </Element>
  )
}

const moreInfoContentMedia = (title, media) => {
  return (
    <Element name={title} className="section">
      <div className="h2">{title}</div>
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
    </Element>
  )
}

const moreInfoContentTeam = (title, members) => {
  return (
    <Element name={title} className="section">
      <div className="h2">{title}</div>
      <div className="row">
        {
          members.map((member) => {
            return (
              <div className="col-xs-12 team-member margin-bottom-20" key={member.id}>
                <div className="col-xs-6 col-sm-4 col-md-2">
                  <img className="full-width" src={member.avatar.original} alt={member.name} />
                </div>
                <div className="col-xs-6 col-sm-8 col-md-10">
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
    </Element>
  )
}

const moreInfoContentMarketScope = (title, contentTitle, details, attachments) => {
  return (
    <Element name={title} className="section">
      <div className="h2">{title}</div>
      <div className="row">
        <div className="col-xs-12">
          <p dangerouslySetInnerHTML={{ __html: htmlDecode(details) }} />
          {
            _.some(attachments) && (
              <p className="gallery">
                {
                  attachments.map((attachment) => {
                    return (
                      <img className="img-responsive" src={attachment.file.original} alt={attachment.file.title} />
                    )
                  })
                }
              </p>
            )
          }
        </div>
      </div>
    </Element>
  )
}

const moreInfoDocuments = (title, documents) => {
  return (
    <Element name={title} className="section">
      <div className="h2">{title}</div>
      <div className="row documents">
        <div className="col-xs-12">
          <ul className="list-style-none">
            {
              documents.map((doc, i) => {
                return (
                  <li key={i}>
                    <div className="inline-block">
                      <i className="fa fa-file-text fa-3x" />
                    </div>
                    <div className="inline-block">
                      <span className="display-block text-bold">{doc.title}</span>
                      <span className="text-gray">{moment().format('MMM YYYY')}</span>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
      <RouteLink className="text-uppercase access btn btn-warning btn-lg" to="/auth/login">
        <i className="fa fa-lock fa-fw" />
        Request Access
      </RouteLink>
    </Element>
  )
}

const htmlDecode = (input) => {
  const e = document.createElement('div')
  e.innerHTML = input
  return e.innerHTML
}
