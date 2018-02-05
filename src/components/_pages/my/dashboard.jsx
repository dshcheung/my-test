import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Tabs from 'react-bootstrap/lib/Tabs'
import Tab from 'react-bootstrap/lib/Tab'
import { Link } from 'react-router'

import { notyWarning } from '../../../services/noty'

import { gMyDashboard, G_MY_DASHBOARD, resetMyDashboard } from '../../../actions/my/dashboard'

import LoadingSpinner from '../../shared/loading-spinner'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session'),
    gMyDashboardInProcess: _.get(state.requestStatus, G_MY_DASHBOARD),
    myDashboard: _.get(state, 'myDashboard')
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
    if (this.props.currentUser.role !== "StartupUser") {
      this.props.router.push("/")
      notyWarning("You Are Not A Startup User")
    }
    this.props.gMyDashboard()
  }

  componentWillUnmount() {
    this.props.resetMyDashboard()
  }

  render() {
    const { myDashboard, gMyDashboardInProcess } = this.props

    if (gMyDashboardInProcess) return <LoadingSpinner />

    const campaigns = _.get(myDashboard, 'campaigns', [])

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
                    <div>Note for internal demo: Only show approved campaigns right now, but later on we will show a special row for incomplete campaigns</div>
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
                            if (!c.approved) return null
                            return (
                              <tr key={i}>
                                <td>{c.startup.name}</td>
                                <td>{moment(c.end_date).diff(moment(), 'days')}</td>
                                <td>${c.goal.currency()}</td>
                                <td>${c.raised.currency()}</td>
                                <td>{c.number_of_investors}</td>
                                <td>{c.has_reached_goal ? "Yes" : "No"}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
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
