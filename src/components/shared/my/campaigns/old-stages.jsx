import React, { Component } from 'react'
import { connect } from 'react-redux'

import SharedMyCampaignsStageOne from './stage-one'
import SharedMyCampaignsStageTwo from './stage-two'
import SharedMyCampaignsStageThree from './stage-three'
import SharedMyCampaignsStageFour from './stage-four'
import SharedMyCampaignsStageFive from './stage-five'

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
      order: ["stage_one", "stage_two", "stage_three", "stage_four", "stage_five"],
      currentStage: "stage_one"
    }

    this.changeStage = this.changeStage.bind(this)
  }

  componentWillMount() {
    this.setStage(this.props)
  }

  componentWillReceiveProps(nextProps) {
    const thisHash = this.props.location.hash.split("#")[1]
    const nextHash = nextProps.location.hash.split("#")[1]
    if (thisHash !== nextHash) {
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
    this.props.router.replace(`${this.props.location.pathname}#${stage}`)
    this.setState({ currentStage: stage })
  }

  render() {
    const { editMode, disabled, routeParams } = this.props
    const { currentStage } = this.state

    return (
      <div id="shared-my-campaigns-stages">
        <div className="stage-nav">
          <div className="container">
            {
              this.state.order.map((s, i) => {
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
        </div>

        {
          this.state.currentStage === "stage_one" && (
            <div className="container">
              <SharedMyCampaignsStageOne
                editMode={editMode}
                routeParams={routeParams}
              />
            </div>
          )
        }

        {
          this.state.currentStage === "stage_two" && (
            <div className="container">
              <SharedMyCampaignsStageTwo
                editMode={editMode}
                routeParams={routeParams}
                router={this.props.router}
                changeStage={this.changeStage}
              />
            </div>
          )
        }

        {
          this.state.currentStage === "stage_three" && (
            <div className="container-fluid">
              <SharedMyCampaignsStageThree
                editMode={editMode}
                routeParams={routeParams}
              />
            </div>
          )
        }

        {
          this.state.currentStage === "stage_four" && (
            <div className="container">
              <SharedMyCampaignsStageFour
                editMode={editMode}
                routeParams={routeParams}
              />
            </div>
          )
        }

        {
          this.state.currentStage === "stage_five" && (
            <div className="container">
              <SharedMyCampaignsStageFive
                editMode={editMode}
                routeParams={routeParams}
              />
            </div>
          )
        }
      </div>
    )
  }
}
