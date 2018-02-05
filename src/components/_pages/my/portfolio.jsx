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
    myDashboard: _.get(state, 'myDashboard', [])
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

  componentWillReceiveProps

  componentWillUnmount() {
    this.props.resetMyDashboard()
  }

  render() {
    const { myDashboard, gMyDashboardInProcess } = this.props

    if (gMyDashboardInProcess) return <LoadingSpinner />

    const campaigns = _.get(myDashboard, 'campaigns', [])

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
                            return (
                              <tr key={i}>
                                <td>{c.startup.name}</td>
                                <td>{moment(c.end_date).diff(moment(), 'days')}</td>
                                <td>${c.goal.currency()}</td>
                                <td>${c.raised.currency()}</td>
                                <td>${c.campaign_pledges[0].amount.currency()}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
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
