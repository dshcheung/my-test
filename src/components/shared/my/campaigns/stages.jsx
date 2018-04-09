import React, { Component } from 'react'

export default class SharedMyCampaignsStages extends Component {
  constructor(props) {
    super(props)

    this.state = {
      order: ["stage_one", "stage_two", "stage_three", "stage_four", "stage_five"],
      currentStage: "stage_one"
    }
  }

  render() {
    const { currentStage } = this.props

    return (
      <div id="shared-my-campaigns-stages">
        <div className="stage-nav">
          <div className="container">
            {
              this.state.order.map((s, i) => {
                const stageClass = currentStage === s ? "bg-info" : "disabled"
                return (
                  <div
                    key={i}
                    className={`stage-item ${stageClass}`}
                  >{s.splitCap("_")}</div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
