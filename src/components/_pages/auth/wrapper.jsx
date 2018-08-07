import { Component } from 'react'
import { connect } from 'react-redux'

import { notyWarning } from '../../../services/noty'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session'),
    redirectionInProcess: _.get(state, 'redirectionInProcess')
  }
}

@connect(mapStateToProps, null)
export default class AuthWrapper extends Component {
  componentWillMount() {
    if (this.props.currentUser && !this.props.redirectionInProcess) {
      this.alreadyLoggedInRedirect(this.props)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser && !nextProps.redirectionInProcess) {
      this.alreadyLoggedInRedirect(nextProps)
    }
  }

  alreadyLoggedInRedirect(props) {
    const { currentUser } = props
    if (currentUser && currentUser.role === "StartupUser") {
      this.props.router.push("/my/campaigns")
      notyWarning("You Are Already Logged In")
    } else if (currentUser && currentUser.role === "Investor") {
      this.props.router.push("/my/portfolio")
    }
  }

  render() {
    return this.props.children
  }
}
