import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => {
  return {
    myNotifications: _.get(state, 'myNotifications', [])
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyNotificationsIndex extends Component {
  render() {
    return (
      <div id="page-my-notifications-index" className="container padding-top-20">
        <div className="row">
          <h1 className="page-title margin-bottom-20 margin-top-0">My Notifications</h1>
        </div>
      </div>
    )
  }
}
