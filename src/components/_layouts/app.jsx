import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Cookies from 'js-cookie'
import { scrollTop } from '../../services/utils'

import { AUTH_TOKEN } from '../../services/constants'

import { getMyProfile, GET_MY_PROFILE } from '../../actions/my/profile'

import LoadingSpinner from '../shared/others/loading-spinner'

import Navbar from './navbar'
import Footer from './footer'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session'),
    getMyProfileInProcess: _.get(state.requestStatus, GET_MY_PROFILE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyProfile: bindActionCreators(getMyProfile, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      secret: "angelhub",
      hasSecret: localStorage.getItem("hasSecret") === "true"
    }

    this.handleSecretOnChange = this.handleSecretOnChange.bind(this)
  }

  componentWillMount() {
    if (Cookies.get(AUTH_TOKEN)) {
      this.props.getMyProfile()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.hasSecret && !prevState.hasSecret) {
      window.setTimeout(() => {
        scrollTop()
      }, 0)
    }
  }

  handleSecretOnChange(e) {
    const { secret } = this.state

    if (e.target.value === secret) {
      this.setState({ hasSecret: true })
      localStorage.setItem("hasSecret", "true")
    }
  }

  render() {
    const { routes, currentUser, getMyProfileInProcess } = this.props
    const currentRoute = routes[routes.length - 1]
    const { barebone, optClass } = currentRoute
    const childrenID = barebone ? "layouts-barebone" : "layouts-body"
    const { hasSecret } = this.state

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

    if (!hasSecret && !currentUser) {
      return (
        <div id="page-home-secret">
          <div className="secret-input">
            <label htmlFor="secret">Please input password to access the website</label>
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
