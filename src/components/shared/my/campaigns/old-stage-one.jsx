import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cMyStartup, C_MY_STARTUP,
  uMyStartup, U_MY_STARTUP
} from '../../../../actions/my/startups'

import MyStartupsNameForm from '../../../forms/my/startups/name'

const mapStateToProps = (state) => {
  return {
    myCampaign: _.get(state, 'myCampaign'),
    cuMyStartupInProcess: _.get(state.requestStatus, C_MY_STARTUP) || _.get(state.requestStatus, U_MY_STARTUP),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cMyStartup: bindActionCreators(cMyStartup, dispatch),
    uMyStartup: bindActionCreators(uMyStartup, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SharedMyCampaignsStageOne extends Component {
  constructor(props) {
    super(props)

    this.cuMyStartup = this.cuMyStartup.bind(this)
  }

  cuMyStartup(values) {
    if (this.props.editMode) {
      this.props.uMyStartup(values, this.props.routeParams)
    } else {
      this.props.cMyStartup(values)
    }
  }

  render() {
    const { editMode, cuMyStartupInProcess, myCampaign } = this.props

    return (
      <div className="stage-one row">
        <MyStartupsNameForm
          optClass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
          onSubmit={this.cuMyStartup}
          submitInProcess={cuMyStartupInProcess}
          title={editMode ? "Edit Startup Name" : "Create Startup"}
          initialValues={{
            name: _.get(myCampaign, 'startup.name', "")
          }}
        />
      </div>
    )
  }
}
