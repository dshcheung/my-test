import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session')
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
    if (this.props.currentUser) this.props.push("/")
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) this.props.push("/")
  }

  render() {
    return this.props.children
  }
}
