import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  uMyStartup, U_MY_STARTUP
} from '../../../../actions/my/startups'

import MyStartupsNameForm from '../../../forms/my/startups/name'

const mapStateToProps = (state) => {
  return {
    myCampaign: _.get(state, 'myCampaign'),
    uMyStartupInProcess: _.get(state.requestStatus, U_MY_STARTUP),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uMyStartup: bindActionCreators(uMyStartup, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SharedMyCampaignsStageOne extends Component {
  constructor(props) {
    super(props)

    this.uMyStartup = this.uMyStartup.bind(this)
  }

  uMyStartup(values) {
    this.props.uMyStartup(values, this.props.routeParams)
  }

  render() {
    const { uMyStartupInProcess, myCampaign } = this.props

    return (
      <div className="stage-one row">
        <MyStartupsNameForm
          optClass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
          onSubmit={this.uMyStartup}
          submitInProcess={uMyStartupInProcess}
          title={"Edit Startup Name"}
          initialValues={{
            name: _.get(myCampaign, 'startup.name', "")
          }}
        />
      </div>
    )
  }
}
