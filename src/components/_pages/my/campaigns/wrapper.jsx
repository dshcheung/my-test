import { Component } from 'react'
import { connect } from 'react-redux'

import { notyWarning } from '../../../../services/noty'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session')
  }
}

@connect(mapStateToProps, null)
export default class Campaigns extends Component {
  componentWillMount() {
    if (this.props.currentUser.role !== "StartupUser") {
      this.notStartupUserRedirect()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser.role !== "StartupUser") {
      this.notStartupUserRedirect()
    }
  }

  notStartupUserRedirect() {
    this.props.router.push("/")
    notyWarning("You Are Not A Startup User")
  }

  render() {
    return this.props.children
  }
}
