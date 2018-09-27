import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Cookies from 'js-cookie'
import { scrollTop } from '../../services/utils'

import { AUTH_TOKEN } from '../../services/constants'

import { setSecret } from '../../actions/system/secret'
import { getMyProfile, GET_MY_PROFILE } from '../../actions/my/profile'

import LoadingSpinner from '../shared/others/loading-spinner'

import Navbar from './navbar'
import Footer from './footer'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session'),
    getMyProfileInProcess: _.get(state.requestStatus, GET_MY_PROFILE),
    hasSecret: _.get(state.secret, 'hasSecret'),
    startupOnly: _.get(state.secret, 'startupOnly')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyProfile: bindActionCreators(getMyProfile, dispatch),
    setSecret: bindActionCreators(setSecret, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  constructor(props) {
    super(props)

    const hasSecret = localStorage.getItem("hasSecret") === "true"

    this.state = {
      secret: "angelhub"
    }

    if (hasSecret) {
      props.setSecret({ hasSecret: true })
    }

    this.handleSecretOnChange = this.handleSecretOnChange.bind(this)
    this.isStartupUser = this.isStartupUser.bind(this)
  }

  componentWillMount() {
    if (Cookies.get(AUTH_TOKEN)) {
      this.props.getMyProfile()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.hasSecret && !prevProps.hasSecret) {
      window.setTimeout(() => {
        scrollTop()
      }, 0)
    }
  }

  handleSecretOnChange(e) {
    const { secret } = this.state

    if (e.target.value === secret) {
      this.props.setSecret({ hasSecret: true })
      localStorage.setItem("hasSecret", "true")
    }
  }

  isStartupUser() {
    this.props.router.replace('/auth/login')
    this.props.setSecret({ startupOnly: true })
  }

  render() {
    const { routes, currentUser, getMyProfileInProcess, hasSecret, startupOnly } = this.props
    const currentRoute = routes[routes.length - 1]
    const { barebone, optClass } = currentRoute
    const childrenID = barebone ? "layouts-barebone" : "layouts-body"

    const secretAccess = hasSecret || startupOnly

    if (getMyProfileInProcess) {
      return (
        <div id="layouts-app">
          { !barebone && <Navbar /> }

          <div id={childrenID} className={`clearfix container-fluid ${optClass}`}>
            <LoadingSpinner />
          </div>

          { !barebone && <Footer /> }
        </div>
      )
    }

    if (!secretAccess && !currentUser) {
      return (
        <div id="page-home-secret">
          <div className="secret-input">
            <label htmlFor="secret">Please input password to access the website</label>
            <label htmlFor="secret">If you are a Startup please click <a onClick={this.isStartupUser}>here</a></label>
            <input name="secret" type="text" className="form-control" onChange={this.handleSecretOnChange} />
          </div>
        </div>
      )
    }

    return (
      <div id="layouts-app">
        { !barebone && <Navbar /> }

        <div id={childrenID} className={`clearfix container-fluid ${optClass}`}>
          {this.props.children}
        </div>

        { !barebone && <Footer /> }
      </div>
    )
  }
}
