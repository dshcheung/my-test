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
export default class Auth extends Component {
  componentWillMount() {
    if (this.props.currentUser) {
      this.alreadyLoggedInRedirect()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser && !nextProps.redirectionInProcess) {
      this.alreadyLoggedInRedirect()
    }
  }

  alreadyLoggedInRedirect() {
    this.props.router.push("/")
    notyWarning("You Are Already Logged In")
  }

  render() {
    return this.props.children
  }
}
