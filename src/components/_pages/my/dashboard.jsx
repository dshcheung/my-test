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
    myDashboard: _.get(state, 'myDashboard'),
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
export default class MyDashboard extends Component {
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
      <div id="page-my-dashboard" className="container">
        {
          campaigns.length === 0 ? (
            <div>No Campaigns Found, Click <Link to="/campaigns">Here</Link> To Create One</div>
          ) : (
            <Tabs defaultActiveKey={1} id="dashboard-tabs">
              <Tab eventKey={1} title="My Campaigns">
                <div className="row">
                  <div className="col-xs-12">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Days Left</th>
                          <th>Goal</th>
                          <th>Raised</th>
                          <th>Investors</th>
                          <th>Completed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          campaigns.map((c, i) => {
                            const submitted = _.get(c, 'status.submitted')
                            if (submitted === "accepted") {
                              const goal = c.goal || 0
                              const raised = c.raised || 0
                              return (
                                <tr
                                  key={i}
                                  className="pointer"
                                  onClick={() => {
                                    this.props.router.push(`/my/campaigns/${c.id}`)
                                  }}
                                >
                                  <td>{c.startup.name}</td>
                                  <td>{moment(c.end_date).diff(moment(), 'days')}</td>
                                  <td>${goal.currency()}</td>
                                  <td>${raised.currency()}</td>
                                  <td>{c.number_of_investors}</td>
                                  <td>{c.has_reached_goal ? "Yes" : "No"}</td>
                                </tr>
                              )
                            } else {
                              return (
                                <tr
                                  key={i}
                                  className="pointer"
                                  onClick={() => {
                                    this.props.router.push(`/my/campaigns/${c.id}/edit#stage_one`)
                                  }}
                                >
                                  <td>{c.startup.name}</td>
                                  <td colSpan="5" className="text-center">{submitted.splitCap("_")}</td>
                                </tr>
                              )
                            }
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
              <Tab eventKey={2} title="Some Analysis">
                In Development
              </Tab>
            </Tabs>
          )
        }
      </div>
    )
  }
}
