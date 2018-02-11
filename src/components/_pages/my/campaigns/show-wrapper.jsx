import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  gMyCampaign, G_MY_CAMPAIGN
} from '../../../../actions/my/campaigns'

import {
  gImmovable, G_IMMOVABLE_STARTUP_USER_QUESTIONNAIRE, resetImmovable
} from '../../../../actions/immovables'

import {
  G_MY_QUESTIONNAIRES, gMyQuestionnaires, resetMyQuestionnaires
} from '../../../../actions/my/questionnaires'

import LoadingSpinner from '../../../shared/loading-spinner'

const mapStateToProps = (state) => {
  return {
    myCampaign: _.get(state, 'myCampaign'),
    gMyCampaignInProcess: _.get(state.requestStatus, G_MY_CAMPAIGN),
    gImmovableInProcess: _.get(state.requestStatus, G_IMMOVABLE_STARTUP_USER_QUESTIONNAIRE),
    gMyQuestionnairesInProcess: _.get(state.requestStatus, G_MY_QUESTIONNAIRES)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gMyCampaign: bindActionCreators(gMyCampaign, dispatch),
    gImmovable: bindActionCreators(gImmovable, dispatch),
    resetImmovable: bindActionCreators(resetImmovable, dispatch),
    gMyQuestionnaires: bindActionCreators(gMyQuestionnaires, dispatch),
    resetMyQuestionnaires: bindActionCreators(resetMyQuestionnaires, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyCampaigns extends Component {
  componentWillMount() {
    if (!this.props.myCampaign) {
      this.props.gMyCampaign({ params: this.props.router.params })
    }

    this.props.gImmovable({ immovableID: "startup_user_questionnaire" })
    this.props.gMyQuestionnaires()
  }

  componentWillUnmount() {
    this.props.resetMyCampaign()
    this.props.resetMyQuestionnaires()
  }

  render() {
    const { myCampaign, gMyCampaignInProcess, gImmovableInProcess } = this.props

    if (gMyCampaignInProcess || gImmovableInProcess) return <LoadingSpinner />

    if (myCampaign) {
      return this.props.children
    }

    return (
      <div className="text-center">
        <h3>No Such Campaign</h3>
      </div>
    )
  }
}
