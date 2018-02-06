import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  gMyCampaign, G_MY_CAMPAIGN,
  resetMyCampaign
} from '../../../../actions/my/campaigns'

import LoadingSpinner from '../../../shared/loading-spinner'

const mapStateToProps = (state) => {
  return {
    gMyCampaignInProcess: _.get(state.requestStatus, G_MY_CAMPAIGN)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gMyCampaign: bindActionCreators(gMyCampaign, dispatch),
    resetMyCampaign: bindActionCreators(resetMyCampaign, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyCampaignsEdit extends Component {
  constructor(props) {
    super(props)

    this.gMyCampaign = this.gMyCampaign.bind(this)
  }

  componentWillMount() {
    this.props.gMyCampaign({ params: this.props.routeParams })
  }

  componentWillUnmount() {
    this.props.resetMyCampaign()
  }

  gMyCampaign(values) {
    this.props.gMyCampaign(values)
  }

  render() {
    const { gMyCampaignInProcess } = this.props

    if (gMyCampaignInProcess) return <LoadingSpinner />

    return (
      <div id="my-campaigns-edit" className="container">
        <div className="row">
          test
        </div>
      </div>
    )
  }
}
