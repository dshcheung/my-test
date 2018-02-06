import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cMyStartup, C_MY_STARTUP
} from '../../../../actions/my/startups'

import MyStartupNameForm from '../../../forms/my/startups/name'

const mapStateToProps = (state) => {
  return {
    cMyStartupInProcess: _.get(state.requestStatus, C_MY_STARTUP)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cMyStartup: bindActionCreators(cMyStartup, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyCampaignsNew extends Component {
  constructor(props) {
    super(props)

    this.cMyStartup = this.cMyStartup.bind(this)
  }

  cMyStartup(values) {
    this.props.cMyStartup(values)
  }

  render() {
    return (
      <div id="my-campaigns-new" className="container">
        <div className="row">
          <MyStartupNameForm
            optClass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
            onSubmit={this.cMyStartup}
            submitInProcess={this.props.cMyStartupInProcess}
            title="Create a Startup"
          />
        </div>
      </div>
    )
  }
}
