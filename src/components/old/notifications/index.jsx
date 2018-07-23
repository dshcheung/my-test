import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import {
  gMyNotifications, G_MY_NOTIFICATIONS,
  resetMyNotifications
} from '../../../../actions/my/notifications'

import LoadingSpinner from '../../../shared/loading-spinner'

const mapStateToProps = (state) => {
  return {
    myNotifications: _.get(state, 'myNotifications', []),
    gMyNotificationsInProcess: _.get(state.requestStatus, G_MY_NOTIFICATIONS),
    nextNotification: _.get(state.pagination, G_MY_NOTIFICATIONS, null)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gMyNotifications: bindActionCreators(gMyNotifications, dispatch),
    resetMyNotifications: bindActionCreators(resetMyNotifications, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyNotificationsIndex extends Component {
  componentWillMount() {
    this.props.gMyNotifications()
  }

  componentWillUnmount() {
    this.props.resetMyNotifications()
  }

  render() {
    const { myNotifications, gMyNotificationsInProcess, nextNotification } = this.props

    return (
      <div id="page-my-notifications-index" className="container padding-top-20">
        <div className="row">
          <h1 className="page-title margin-bottom-20 margin-top-0">My Notifications</h1>
        </div>
        <div className="row">
          <div className="list-group notifications">
            {
              (() => {
                let component = null
                if (gMyNotificationsInProcess) {
                  component = <LoadingSpinner />
                } else {
                  const noNotifications = myNotifications.length === 0 && (
                    <Link to="#" key="no-notifications" className="list-group-item list-group-item-action flex-column align-items-start">
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">No Notifications Found</h5>
                      </div>
                    </Link>
                  )

                  const notificationList = myNotifications.map((myNotification, i) => {
                    const authorProfile = _.get(myNotification, 'author.profile', null)
                    const userProfile = _.get(myNotification, 'user.profile', null)
                    return (
                      <Link key={i} to={``} className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{`${authorProfile.first_name} ${authorProfile.last_name}`}</h5>
                          <small>{myNotification.created_at}</small>
                        </div>
                        <p className="mb-1">{myNotification.message}</p>
                        <small>{`${userProfile.first_name} ${userProfile.last_name}`}</small>
                      </Link>
                    )
                  })

                  const loadMore = nextNotification && (
                    <button
                      onClick={() => { this.props.gMyNotifications({ nextHref: nextNotification }) }}
                      className="btn btn-default"
                    >Load More</button>
                  )

                  component = [noNotifications, ...notificationList, loadMore]
                }
                return component
              })()
            }
          </div>
        </div>
      </div>
    )
  }
}
