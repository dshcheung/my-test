import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Cookies from 'js-cookie'

import { AUTH_TOKEN } from '../../services/constants'

import { getMyProfile } from '../../actions/my/profile'

import Navbar from './navbar'
import Footer from './footer'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyProfile: bindActionCreators(getMyProfile, dispatch),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  componentWillMount() {
    if (Cookies.get(AUTH_TOKEN)) {
      this.props.getMyProfile()
    }
  }

  render() {
    const { routes } = this.props
    const currentRoute = routes[routes.length - 1]
    const { barebone } = currentRoute
    const childrenID = barebone ? "layouts-barebone" : "layouts-body"

    return (
      <div id="layouts-app">
        { !barebone && <Navbar /> }

        <div id={childrenID} className="clearfix container-fluid">{this.props.children}</div>

        { !barebone && <Footer /> }
      </div>
    )
  }
}
