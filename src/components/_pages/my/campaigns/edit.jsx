import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  gMyCampaign
} from '../../../../actions/my/campaigns'

import { notyWarning } from '../../../../services/noty'

import SharedMyCampaignsStages from '../../../shared/my/campaigns/stages'
import SharedMyCampaignsStageOne from '../../../shared/my/campaigns/stage-one'
import SharedMyCampaignsStageTwo from '../../../shared/my/campaigns/stage-two'
import SharedMyCampaignsStageThree from '../../../shared/my/campaigns/stage-three'
import SharedMyCampaignsStageFour from '../../../shared/my/campaigns/stage-four'
import SharedMyCampaignsStageFive from '../../../shared/my/campaigns/stage-five'

const mapStateToProps = (state) => {
  return {
    myCampaign: _.get(state, 'myCampaign')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gMyCampaign: bindActionCreators(gMyCampaign, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyCampaigns extends Component {
  constructor(props) {
    super(props)

    this.state = {
      refreshed: false,
      refreshing: false
    }
  }

  componentWillMount() {
    this.permitRedirection(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.permitRedirection(nextProps)
    this.refreshCampaignOnStageThree(nextProps)
  }

  refreshCampaignOnStageThree(nextProps) {
    if (this.props.routeParams.stage === "stage_profile" && this.props.routeParams.stage !== nextProps.routeParams.stage) {
      this.setState({ refreshed: false })
    }

    if (nextProps.routeParams.stage === "stage_profile" && !this.state.refreshed && !this.state.refreshing) {
      this.setState({ refreshing: true })
      this.props.gMyCampaign({
        params: nextProps.params,
        refresh: true,
        cb: () => {
          this.setState({ refreshed: true, refreshing: false })
        }
      })
    }
  }

  permitRedirection(props) {
    if (props.myCampaign && !props.myCampaign.can.edit) {
      this.props.router.push("/my/campaigns")
      notyWarning("You Cannot Edit")
    }
  }

  render() {
    const { myCampaign, router: { params } } = this.props
    const routeParams = { ...params, myStartupID: _.get(myCampaign, 'startup.id') }

    if (myCampaign && !myCampaign.can.edit) {
      return null
    }

    return (
      <div>
        <SharedMyCampaignsStages
          router={this.props.router}
          location={this.props.location}
          currentStage={this.props.router.params.stage}
        />

        {
          params.stage === "stage_create" && <SharedMyCampaignsStageOne
            routeParams={routeParams}
          />
        }

        {
          params.stage === "stage_questionnaire" && <SharedMyCampaignsStageTwo
            routeParams={routeParams}
          />
        }

        {
          params.stage === "stage_profile" && <SharedMyCampaignsStageThree
            editMode
            router={this.props.router}
            routeParams={routeParams}
          />
        }

        {
          params.stage === "stage_campaign" && <SharedMyCampaignsStageFour
            routeParams={routeParams}
          />
        }

        {
          params.stage === "stage_submission" && <SharedMyCampaignsStageFive
            routeParams={routeParams}
          />
        }
      </div>
    )
  }
}
