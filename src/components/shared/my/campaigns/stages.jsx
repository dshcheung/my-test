import React, { Component } from 'react'

export default class SharedMyCampaignsStages extends Component {
  constructor(props) {
    super(props)

    this.state = {
      order: ["stage_create", "stage_questionnaire", "stage_profile", "stage_campaign", "stage_submission"]
    }
  }

  render() {
    const { currentStage, disableNav, router } = this.props

    return (
      <div id="shared-my-campaigns-stages">
        <div className="stage-nav">
          <div className="container">
            {
              this.state.order.map((s, i) => {
                const bgColor = currentStage === s ? "bg-info" : ""
                const disabledClass = disableNav ? "disabled" : "pointer"
                return (
                  <div
                    key={i}
                    className={`stage-item ${bgColor} ${disabledClass}`}
                    onClick={() => {
                      if (!disableNav) {
                        router.push(`/my/campaigns/${router.params.myCampaignID}/edit/${s}`)
                      }
                    }}
                  >{s.replace("stage_", "").splitCap("_")}</div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
