import React, { Component } from 'react'
import { connect } from 'react-redux'

import { notyWarning } from '../../../services/noty'
import { extractAttrFromRoutes } from '../../../services/utils'

import { GET_MY_PROFILE } from '../../../actions/my/profile'

import LoadingSpinner from '../../shared/loading-spinner'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session'),
    redirectionInProcess: _.get(state, 'redirectionInProcess'),
    getMyProfileInProcess: _.get(state.requestStatus, GET_MY_PROFILE)
  }
}

@connect(mapStateToProps, null)
export default class My extends Component {
  constructor(props) {
    super(props)

    this.state = { redirecting: false }
  }

  componentWillMount() {
    if (!this.props.currentUser && !this.props.getMyProfileInProcess) {
      this.notLoggedInRedirect()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.currentUser && !nextProps.redirectionInProcess && !nextProps.getMyProfileInProcess) {
      this.notLoggedInRedirect()
    }

    const roleAccess = extractAttrFromRoutes(nextProps.routes, "roleAccess")
    if (!this.state.redirecting && roleAccess === "StartupUser" && nextProps.currentUser && nextProps.currentUser.role !== "StartupUser") {
      this.notStartupUserRedirect()
    } else if (!this.state.redirecting && roleAccess === "Investor" && nextProps.currentUser && nextProps.currentUser.role !== "Investor") {
      this.notInvestorRedirect()
    }
  }

  notLoggedInRedirect() {
    this.props.router.push("/")
    notyWarning("Please Login First")
  }

  notStartupUserRedirect() {
    this.setState({ redirecting: true })
    this.props.router.push("/")
    notyWarning("You Are Not A Startup user")
  }

  notInvestorRedirect() {
    this.setState({ redirecting: true })
    this.props.router.push("/")
    notyWarning("You Are Not An Investor")
  }

  render() {
    if (!this.props.currentUser || this.state.redirecting) {
      return (
        <div className="container padding-top-20">
          <LoadingSpinner />
        </div>
      )
    }

    // TODO: new user modal introduction
    // console.log(this.props.currentUser.new_user)

    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}
