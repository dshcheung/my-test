import React, { Component } from 'react'
import { connect } from 'react-redux'

import { notyWarning } from '../../../../services/noty'

import SharedMyCampaignsStages from '../../../shared/my/campaigns/stages'
import SharedMyCampaignsStageTwo from '../../../shared/my/campaigns/stage-two'
import SharedMyCampaignsStageThree from '../../../shared/my/campaigns/stage-three'

const mapStateToProps = (state) => {
  return {
    myCampaign: _.get(state, 'myCampaign')
  }
}

@connect(mapStateToProps, null)
export default class MyCampaigns extends Component {
  constructor(props) {
    super(props)

    this.state = {
      permitted: ["stage_two", "stage_three", "stage_four", "stage_five"]
    }
  }

  componentWillMount() {
    this.permitRedirection(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.permitRedirection(nextProps)
  }

  permitRedirection(props) {
    const { router: { params } } = this.props

    // TODO: change stage depending on status
    if (_.indexOf(this.state.permitted, params.stage) < 0) {
      this.props.router.push(`/my/campaigns/${params.myCampaignID}/edit/stage_two`)
    } else {
      if (props.myCampaign && !props.myCampaign.can.edit) {
        this.props.router.push("/my/campaigns")
        notyWarning("You Cannot Edit")
      }
    }
  }

  render() {
    const { myCampaign, router: { params } } = this.props

    if (myCampaign && !myCampaign.can.edit) {
      return null
    }

    return (
      <div>
        <SharedMyCampaignsStages
          currentStage={this.props.router.params.stage}
        />

        {
          params.stage === "stage_two" && <SharedMyCampaignsStageTwo />
        }

        {
          params.stage === "stage_three" && <SharedMyCampaignsStageThree
            editMode
            router={this.props.router}
            routeParams={params}
          />
        }
      </div>
    )
  }
}
