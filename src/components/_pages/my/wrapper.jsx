import React, { Component } from 'react'
import { connect } from 'react-redux'

import { notyWarning } from '../../../services/noty'
import { extractAttrFromRoutes } from '../../../services/utils'

import { GET_MY_PROFILE } from '../../../actions/my/profile'

import LoadingSpinner from '../../shared/others/loading-spinner'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session'),
    redirectionInProcess: _.get(state, 'redirectionInProcess'),
    getMyProfileInProcess: _.get(state.requestStatus, GET_MY_PROFILE)
  }
}

@connect(mapStateToProps, null)
export default class MyWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = { redirecting: false }
  }

  componentWillMount() {
    this.checkRedirection(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.checkRedirection(nextProps)
  }

  checkRedirection(props) {
    if (!props.redirectionInProcess && !props.getMyProfileInProcess) {
      if (!props.currentUser) {
        this.notLoggedInRedirect()
      } else if (!this.state.redirecting && props.currentUser) {
        const role = props.currentUser.role

        const verifiedEmail = props.currentUser.verified_email
        if (role === "StartupUser" && !verifiedEmail) {
          this.notVerifiedEmailRedirect()
        }

        const roleAccess = extractAttrFromRoutes(props.routes, "roleAccess")
        if (roleAccess === "StartupUser" && role !== "StartupUser") {
          this.notStartupUserRedirect()
        } else if (roleAccess === "Investor" && role !== "Investor") {
          this.notInvestorRedirect()
        }
      }
    }
  }

  notLoggedInRedirect() {
    this.props.router.push("/")
    notyWarning("Please Login First")
  }

  notStartupUserRedirect() {
    this.setState({ redirecting: true })
    this.props.router.push("/my/portfolio")
    notyWarning("You Are Not A Startup user")
  }

  notInvestorRedirect() {
    this.setState({ redirecting: true })
    this.props.router.push("/my/dashboard")
    notyWarning("You Are Not An Investor")
  }

  notVerifiedEmailRedirect() {
    this.setState({ redirecting: true })
    this.props.router.push("/verify")
    notyWarning("Please Verify Your Email First")
  }

  render() {
    if (!this.props.currentUser || this.state.redirecting) {
      return <LoadingSpinner />
    }

    return this.props.children
  }
}
