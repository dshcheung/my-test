import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SharedStartupsProfile from '../../shared/startups/profile'

import {
  getStartup, GET_STARTUP,
  resetStartup
} from '../../../actions/startups'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session', null),
    startup: _.get(state, 'startup', null),
    getStartupInProcess: _.get(state.requestStatus, GET_STARTUP),
    requestStatus: _.get(state, 'requestStatus')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStartup: bindActionCreators(getStartup, dispatch),
    resetStartup: bindActionCreators(resetStartup, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class StartupsShow extends Component {
  componentWillMount() {
    this.props.getStartup({ params: this.props.routeParams })
  }

  componentWillUnmount() {
    this.props.resetStartup()
  }

  render() {
    const { startup, getStartupInProcess, routeParams } = this.props

    return (
      <SharedStartupsProfile
        startup={startup}
        campaign={null}
        loadingInProcess={getStartupInProcess}
        routeParams={routeParams}
      />
    )
  }
}
