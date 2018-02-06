import React, { Component } from 'react'
import { connect } from 'react-redux'

import { notyWarning } from '../../../../services/noty'

import SharedMyCampaignsStageOne from './stage-one'
import SharedMyCampaignsStageTwo from './stage-two'
import SharedMyCampaignsStageThree from './stage-three'

const mapStateToProps = (state) => {
  return {
    myCampaign: _.get(state, 'myCampaign')
  }
}

@connect(mapStateToProps, null)
export default class SharedMyCampaignsStages extends Component {
  constructor(props) {
    super(props)

    this.state = {
      order: ["stage_one", "stage_two", "stage_three", "stage_four"],
      currentStage: "stage_one"
    }

    this.changeStage = this.changeStage.bind(this)
  }

  componentWillMount() {
    this.setStage(this.props)
    if (this.props.editMode) {
      notyWarning("You can now skip ahead or go back to change information by clicking on stages")
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.hash !== nextProps.location.hash) {
      this.setStage(nextProps)
    }
  }

  setStage(props) {
    const hash = props.location.hash && props.location.hash.split("#")[1]
    const exists = _.indexOf(this.state.order, hash) >= 0
    if (exists) {
      this.setState({ currentStage: hash })
    }
  }

  changeStage(stage) {
    this.props.router.push(`${this.props.location.pathname}#${stage}`)
    this.setState({ currentStage: stage })
  }

  render() {
    const { editMode, disabled, routeParams } = this.props
    const { currentStage } = this.state

    return (
      <div id="shared-my-campaigns-stages">
        <div className="stage-nav container">
          {
            this.state.order.map((s, i) => {
              // TODO: hover cursor
              const bgColor = currentStage === s ? "bg-info" : ""
              const disabledThis = disabled[s] ? "disabled" : ""
              return (
                <div
                  key={i}
                  className={`pointer stage-item ${bgColor} ${disabledThis}`}
                  onClick={() => {
                    if (!disabledThis) {
                      this.changeStage(s)
                    }
                  }}
                >{s.splitCap("_")}</div>
              )
            })
          }
        </div>

        <hr />

        {
          this.state.currentStage === "stage_one" && (
            <div className="container">
              <SharedMyCampaignsStageOne
                editMode={editMode}
                nextStage={() => { this.changeStage("stage_two") }}
                routeParams={routeParams}
              />
            </div>
          )
        }

        {
          this.state.currentStage === "stage_two" && (
            <div className="container-fluid">
              <SharedMyCampaignsStageTwo
                editMode={editMode}
                routeParams={routeParams}
              />
            </div>
          )
        }

        {
          this.state.currentStage === "stage_three" && (
            <div className="container">
              <SharedMyCampaignsStageThree
                editMode={editMode}
                nextStage={() => { this.changeStage("stage_four") }}
                routeParams={routeParams}
              />
            </div>
          )
        }
      </div>
    )
  }
}
