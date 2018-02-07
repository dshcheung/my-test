import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Tabs from 'react-bootstrap/lib/Tabs'
import Tab from 'react-bootstrap/lib/Tab'
import { Link } from 'react-router'

import { gMyDashboard, G_MY_DASHBOARD, resetMyDashboard } from '../../../actions/my/dashboard'

import LoadingSpinner from '../../shared/loading-spinner'

const mapStateToProps = (state) => {
  return {
    gMyDashboardInProcess: _.get(state.requestStatus, G_MY_DASHBOARD),
    myDashboard: _.get(state, 'myDashboard', []),
    gMyDashBoardNextHref: _.get(state.pagination, G_MY_DASHBOARD)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gMyDashboard: bindActionCreators(gMyDashboard, dispatch),
    resetMyDashboard: bindActionCreators(resetMyDashboard, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyPortfolio extends Component {
  componentWillMount() {
    this.props.gMyDashboard()
  }

  componentWillUnmount() {
    this.props.resetMyDashboard()
  }

  render() {
    const { myDashboard, gMyDashboardInProcess, gMyDashBoardNextHref } = this.props

    const campaigns = _.get(myDashboard, 'campaigns', [])

    if (gMyDashboardInProcess && campaigns.length === 0) return <LoadingSpinner />

    return (
      <div id="page-my-portfolio" className="container">
        {
          campaigns.length === 0 ? (
            <div>No Campaigns Found, Click <Link to="/campaigns">Here</Link> To Browse</div>
          ) : (
            <Tabs defaultActiveKey={1} id="portfolio-tabs">
              <Tab eventKey={1} title="Pledged Campaigns">
                <div className="row">
                  <div className="col-xs-12">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Days Left</th>
                          <th>Goal</th>
                          <th>Raised</th>
                          <th>Pledged</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          campaigns.map((c, i) => {
                            const goal = c.goal || 0
                            const raised = c.raised || 0
                            // TODO: User your own campaign_pledges
                            const pledgedAmount = _.get(c, 'campaign_pledges[0].amount')
                            return (
                              <tr
                                key={i}
                                className="pointer"
                                onClick={() => {
                                  this.props.router.push(`/campaigns/${c.id}`)
                                }}
                              >
                                <td>{c.startup.name}</td>
                                <td>{moment(c.end_date).diff(moment(), 'days')}</td>
                                <td>${goal.currency()}</td>
                                <td>${raised.currency()}</td>
                                <td>${pledgedAmount.currency()}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                  {
                    gMyDashBoardNextHref && (
                      <div className="col-xs-12 text-center">
                        <button
                          className={`btn btn-info ${gMyDashboardInProcess && "m-progress"}`}
                          disabled={gMyDashboardInProcess}
                          onClick={() => {
                            this.props.gMyDashboard({ nextHref: gMyDashBoardNextHref })
                          }}
                        >Load More</button>
                      </div>
                    )
                  }
                </div>
              </Tab>
              <Tab eventKey={2} title="Diversification Analysis">
                In Development
              </Tab>
            </Tabs>
          )
        }
      </div>
    )
  }
}
