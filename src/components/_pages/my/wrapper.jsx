import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import { GET_MY_PROFILE } from '../../../actions/my/profile'

import LoadingSpinner from '../../shared/loading-spinner'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session'),
    getMyProfileInProcess: _.get(state.requestStatus, GET_MY_PROFILE, null)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    push: bindActionCreators(push, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Auth extends Component {
  componentWillMount() {
    if (!this.props.getMyProfileInProcess && !this.props.currentUser) this.props.push("/")
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.getMyProfileInProcess && !nextProps.currentUser) this.props.push("/")
  }

  render() {
    if (this.props.getMyProfileInProcess) {
      return (
        <div className="container padding-top-20">
          <LoadingSpinner />
        </div>
      )
    }

    return this.props.children
  }
}
