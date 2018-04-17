import React, { Component } from 'react'
import { connect } from 'react-redux'

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
          params.stage === "stage_one" && <SharedMyCampaignsStageOne
            routeParams={routeParams}
          />
        }

        {
          params.stage === "stage_two" && <SharedMyCampaignsStageTwo
            routeParams={routeParams}
          />
        }

        {
          params.stage === "stage_three" && <SharedMyCampaignsStageThree
            editMode
            router={this.props.router}
            routeParams={routeParams}
          />
        }

        {
          params.stage === "stage_four" && <SharedMyCampaignsStageFour
            routeParams={routeParams}
          />
        }

        {
          params.stage === "stage_five" && <SharedMyCampaignsStageFive
            routeParams={routeParams}
          />
        }
      </div>
    )
  }
}
