import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getStartup,
  resetStartup
} from '../../../actions/startups'


const mapStateToProps = (state) => {
  return {
    startup: _.get(state, 'startups.show', null)
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
    return (
      <div id="page-startups-show" className="container">
        Template
      </div>
    )
  }
}
