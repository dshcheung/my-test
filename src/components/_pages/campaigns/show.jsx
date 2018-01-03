import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { DEFAULT_STARTUP_BANNER, DEFAULT_STARTUP_AVATAR } from '../../../constants'

import {
  getCampaign, GET_CAMPAIGN,
  resetCampaign
} from '../../../actions/campaigns'

import LoadingSpinner from '../../shared/loading-spinner'
import ImageBanner from '../../shared/image-banner'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session', null),
    campaign: _.get(state, 'campaign', null),
    getCampaignInProcess: _.get(state.requestStatus, GET_CAMPAIGN),
    requestStatus: _.get(state, 'requestStatus')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCampaign: bindActionCreators(getCampaign, dispatch),
    resetCampaign: bindActionCreators(resetCampaign, dispatch),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class CampaignsShow extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillMount() {
    this.props.getCampaign({ params: this.props.routeParams })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ editable: _.get(nextProps, 'campaign.is_editable', false) })

    if (this.state.editName) {
      this.setState({ editInfo: _.get(nextProps, this.state.editName) })
    }
  }

  componentWillUnmount() {
    this.props.resetCampaign()
  }

  render() {
    const { campaign, getCampaignInProcess } = this.props

    if (getCampaignInProcess) return <LoadingSpinner />

    if (!campaign) {
      return (
        <div className="text-center">
          <h3>No Such Campaign</h3>
        </div>
      )
    }

    return (
      <div id="pages-campaigns-show" className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-10 col-lg-offset-1">
            <section className="row basic-info">
              <div className="col-xs-12 col-md-6">
                <div className="aspect-16-9">
                  <ImageBanner
                    src={`${_.get(campaign, "profile.banner.original", null) || DEFAULT_STARTUP_BANNER}`}
                    contain
                  />
                  <img
                    className="startup-avatar position-absolute top-15 left-10"
                    src={`${_.get(campaign, "profile.avatar.original", null) || DEFAULT_STARTUP_AVATAR}`}
                    alt={`Logo ${campaign.name}}`}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6">
                <h1 className="name text-uppercase">{campaign.startup.name}</h1>
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
                        <div className="amount">US${campaign.goal}</div>
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
                <button className="btn btn-primary btn-lg btn-block btn-invest text-uppercase">Invest Now</button>
                <div className="warning margin-top-50 hide">
                  <span className="text-bold">Purchased securities are not currently tradeable.</span>
                  <p className="instruction">Expect to hold your investment until the company lists on a national exchange or is acquired.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }
}
