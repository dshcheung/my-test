import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getCampaign, GET_CAMPAIGN,
  resetCampaign
} from '../../../actions/campaigns'

import LoadingSpinner from '../../shared/loading-spinner'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session', null),
    campaign: _.get(state, 'campaign', null),
    getCampaignInProcess: _.get(state.requestStatus, GET_CAMPAIGN),
    requestStatus: _.get(state, 'requestStatus')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCampaign: bindActionCreators(getCampaign, dispatch),
    resetCampaign: bindActionCreators(resetCampaign, dispatch),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class CampaignsShow extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillMount() {
    this.props.getCampaign({ params: this.props.routeParams })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ editable: _.get(nextProps, 'campaign.is_editable', false) })

    if (this.state.editName) {
      this.setState({ editInfo: _.get(nextProps, this.state.editName) })
    }
  }

  componentWillUnmount() {
    this.props.resetCampaign()
  }

  render() {
    const { campaign, getCampaignInProcess } = this.props

    if (getCampaignInProcess) return <LoadingSpinner />

    if (!campaign) {
      return (
        <div className="text-center">
          <h3>No Such Campaign</h3>
        </div>
      )
    }

    return (
      <div id="pages-campaigns-show" className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-10 col-lg-offset-1">
            test
          </div>
        </div>
      </div>
    )
  }
}
