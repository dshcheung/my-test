import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Cookies from 'js-cookie'

import { AUTH_TOKEN } from '../../constants'

import { getMyProfile } from '../../actions/my/profile'
import { gMyConversations, gMyConversation } from '../../actions/my/conversations'
import { gMyNotifications } from '../../actions/my/notifications'

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
    gMyConversations: bindActionCreators(gMyConversations, dispatch),
    gMyConversation: bindActionCreators(gMyConversation, dispatch),
    gMyNotifications: bindActionCreators(gMyNotifications, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  componentWillMount() {
    if (Cookies.get(AUTH_TOKEN)) {
      this.props.getMyProfile()
      this.props.gMyConversations()
      this.props.gMyNotifications()
    }
  }

  render() {
    return (
      <div id="layouts-app">
        <Navbar />

        <div id="layouts-body" className="clearfix">{this.props.children}</div>

        <Footer />
      </div>
    )
  }
}
