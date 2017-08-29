import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getStartup,
  resetStartup
} from '../../../actions/startups'

import ImageBanner from '../../shared/image-banner'

const mapStateToProps = (state) => {
  return {
    startup: _.get(state, 'startups.show', null)
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
    const { startup } = this.props

    if (!startup) return null

    return (
      <div id="pages-startups-show" className="container">
        <section className="row basic-info">
          <div className="col-xs-12 col-md-6">
            <div className="aspect-16-9">
              <ImageBanner
                src={`${_.get(startup, "profile.banner.original", null) || "/company-logo.jpg"}`}
                contain
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <h1 className="name">{startup.name}</h1>
            <p className="overview">{startup.profile.overview}</p>
            <div className="fundings clearfix">
              <div className="funding-card">
                <div className="amount">$140,000</div>
                <div className="title">Raised</div>
              </div>
              <div className="funding-card">
                <div className="amount">$140,000</div>
                <div className="title">Funding Goal</div>
              </div>
              <div className="funding-card">
                <div className="amount">4</div>
                <div className="title">Investors</div>
              </div>
              <div className="funding-card">
                <div className="amount">$3.00</div>
                <div className="title">Share Price</div>
              </div>
              <div className="funding-card">
                <div className="amount">$140,000</div>
                <div className="title">Pre-Money Valuation</div>
              </div>
              <div className="funding-card">
                <div className="amount">Preferred Equity</div>
                <div className="title">Security Type</div>
              </div>
            </div>
            <div className="bar">
              <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }} />
              </div>
              <div className="clearfix">
                <div className="pull-right"><b>80%</b> achieved</div>
              </div>
            </div>
            <button className="btn btn-primary btn-block">SIGNUP TO INVEST</button>
            <div className="warning">
              <h4>Purchased securities are not currently tradeable.</h4>
              <h4 className="instruction">Expect to hold your investment until the company lists on a nation al exchange or is acquired.</h4>
            </div>
          </div>
        </section>

        <hr />

        <section className="row more-info">
          something
        </section>
      </div>
    )
  }
}
