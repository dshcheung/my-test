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
  componentWillMount() {
    this.permitRedirection(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.permitRedirection(nextProps)
    this.refreshCampaignOnStageThree(nextProps)
  }

  refreshCampaignOnStageThree(props) {
    if (props.routeParams.stage === "stage_three") {
      this.props.gMyCampaign({ params: props.params, refresh: true })
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
          params.stage === "create" && <SharedMyCampaignsStageOne
            routeParams={routeParams}
          />
        }

        {
          params.stage === "questionnaire" && <SharedMyCampaignsStageTwo
            routeParams={routeParams}
          />
        }

        {
          params.stage === "profile" && <SharedMyCampaignsStageThree
            editMode
            router={this.props.router}
            routeParams={routeParams}
          />
        }

        {
          params.stage === "campaign" && <SharedMyCampaignsStageFour
            routeParams={routeParams}
          />
        }

        {
          params.stage === "submission" && <SharedMyCampaignsStageFive
            routeParams={routeParams}
          />
        }
      </div>
    )
  }
}
