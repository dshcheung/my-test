import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AutoAffix from 'react-overlays/lib/AutoAffix'
import Link from 'react-scroll/modules/components/Link'
import Element from 'react-scroll/modules/components/Element'

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

  render() {
    const { startup, getStartupInProcess } = this.props

    if (getStartupInProcess) return <LoadingSpinner optClass="text-center" />

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
                  <dt>Time left to invest:</dt>
                  <dd>xxxxxxx</dd>
                </dl>
              </div>
              <div className="col-xs-12 col-md-6">
                <h1 className="name text-uppercase">{startup.name}</h1>
                <p className="overview margin-bottom-20">{startup.profile.overview}</p>
                <div className="row">
                  <div className="col-xs-12 padding-0 fundings">
                    <div className="col-md-4">
                      <div className="funding-card">
                        <div className="amount">$140,000</div>
                        <div className="title">Raised</div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="funding-card">
                        <div className="amount">$140,000</div>
                        <div className="title">Funding Goal</div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="funding-card">
                        <div className="amount">4</div>
                        <div className="title">Investors</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <ul className="share-list">
                      <li>
                        <div className="amount">$3.00</div>
                        <div className="title">Share Price</div>
                      </li>
                      <li>
                        <div className="amount">$140,000</div>
                        <div className="title">Pre-Money Valuation</div>
                      </li>
                      <li>
                        <div className="amount">Preferred Equity</div>
                        <div className="title">Security Type</div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bar margin-top-50">
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }} />
                    <div className="progress-start filled" />
                    <div className="progress-end" />
                  </div>
                  <div className="clearfix progress-percent">
                    <div className="pull-right">
                      <span><strong>80%</strong> achieved</span>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary btn-lg padding-20 btn-block btn-invest">SIGNUP TO INVEST</button>
                <div className="warning margin-top-50">
                  <span className="text-bold">Purchased securities are not currently tradeable.</span>
                  <p className="instruction">Expect to hold your investment until the company lists on a nation al exchange or is acquired.</p>
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
                    </ul>

                    <hr />

                    <ul className="links">
                      <li><i className="fa fa-commenting-o fa-2x" /><span>Investor Discussion</span></li>
                      <li><i className="fa fa-pencil-square-o fa-2x" /><span>Startup Survey</span></li>
                      <li><i className="fa fa-envelope-o fa-2x" /><span>Contact AngelHub</span></li>
                    </ul>
                  </div>
                </AutoAffix>
              </div>
              <div className="col-xs-12 col-sm-9">
                {_.get(startup, "highlights[0]") && moreInfoContentHighlights("Highlights", startup.highlights)}
                {_.get(startup, "profile.overview") && moreInfoContent("Overview", startup.profile.overview)}
                {_.get(startup, "pitch_deck.title") && moreInfoContent("Pitch Deck", startup.pitch_deck.title)}
                {_.get(startup, "media[0]") && moreInfoContentMedia("Media", startup.media)}
                {_.get(startup, "members[0]") && moreInfoContentTeam("Team", startup.members)}
                {_.get(startup, "market_scope.title") && moreInfoContent("Market Scope", startup.market_scope.title)}
                {_.get(startup, "risk.title") && moreInfoContent("Risk & Disclosure", startup.risk.title)}
                {_.get(startup, "end_notes") && moreInfoContent("End Notes", startup.end_notes)}
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
      <p>{content}</p>
    </Element>
  )
}

const moreInfoContentHighlights = (title) => {
  return (
    <Element name={title} className="section">
      <div className="h2">{title}</div>
    </Element>
  )
}

const moreInfoContentMedia = (title) => {
  return (
    <Element name={title} className="section">
      <div className="h2">{title}</div>
    </Element>
  )
}

const moreInfoContentTeam = (title) => {
  return (
    <Element name={title} className="section">
      <div className="h2">{title}</div>
    </Element>
  )
}
