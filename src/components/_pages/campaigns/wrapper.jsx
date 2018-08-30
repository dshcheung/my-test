import React, { Component } from 'react'
import { connect } from 'react-redux'

import { notyWarning } from '../../../services/noty'

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
export default class Campaigns extends Component {
  componentWillMount() {
    if (!this.props.currentUser && !this.props.getMyProfileInProcess) {
      this.notLoggedInRedirect()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.currentUser && !nextProps.redirectionInProcess && !nextProps.getMyProfileInProcess) {
      this.notLoggedInRedirect()
    }
  }

  notLoggedInRedirect() {
    this.props.router.push("/")
    notyWarning("Please Login First")
  }

  render() {
    if (!this.props.currentUser) return <LoadingSpinner />

    return this.props.children
  }
}
