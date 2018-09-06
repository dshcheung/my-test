import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  markMyCampaignForReview, MARK_MY_CAMPAIGN_FOR_REVIEW
} from '../../../actions/my/campaigns'

const mapStateToProps = (state) => {
  return {
    myCampaign: _.get(state, 'myCampaign'),
    myStartupQuestionnaire: _.get(state, 'myStartupQuestionnaire'),
    markMyCampaignForReviewInProcess: _.get(state.requestStatus, MARK_MY_CAMPAIGN_FOR_REVIEW),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    markMyCampaignForReview: bindActionCreators(markMyCampaignForReview, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SharedStartupQuestionnairesSubmission extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errorsToCheck: [
        {
          dataKey: "startup_questionnaire_basic",
          title: "Basic"
        },
        {
          dataKey: "startup_questionnaire_teaser",
          title: "Teaser"
        },
        {
          dataKey: "startup_questionnaire_product",
          title: "Product"
        },
        {
          dataKey: "startup_questionnaire_market",
          title: "Market"
        },
        {
          dataKey: "startup_questionnaire_team",
          title: "Team"
        },
        {
          dataKey: "startup_questionnaire_financial",
          title: "Financial"
        },
        {
          dataKey: "startup_questionnaire_campaign",
          title: "Campaign"
        },
        {
          dataKey: "attachments",
          title: "Due Dilligence"
        },
      ]
    }

    this.handleMarkMyCampaignForReview = this.handleMarkMyCampaignForReview.bind(this)
  }

  handleMarkMyCampaignForReview() {
    const { myStartupQuestionnaire, triggerHighlightErrors, routeParams } = this.props
    const errors = _.get(myStartupQuestionnaire, 'errors')
    const hasErrors = errors && Object.keys(errors).length > 0

    if (hasErrors) {
      triggerHighlightErrors()
    } else {
      this.props.markMyCampaignForReview(routeParams)
    }
  }

  render() {
    const { myCampaign, markMyCampaignForReviewInProcess, myStartupQuestionnaire, highlightErrors } = this.props
    const { errorsToCheck } = this.state
    const errors = _.get(myStartupQuestionnaire, 'errors')
    const submittedStatus = _.get(myCampaign, 'status.submitted')

    return (
      <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-0 text-center">
        {
          (() => {
            let component = null

            if (submittedStatus === "not_submitted") {
              component = (
                <div>
                  <div className="text-gray margin-bottom-40">Once you submit, you will not be able to modify. You can go back to any section and resave now!</div>
                  <div className="text-gray margin-bottom-40">When You Are Ready To Submit Your Campaign For Us To Review, Click The Button Below</div>
                  {
                    highlightErrors && (
                      <div>
                        <div className="text-danger margin-bottom-20">You have unfilled require questions! Check the following tab(s) to see unfilled questions</div>
                        {
                          errorsToCheck.map((e, i) => {
                            const error = _.get(errors, e.dataKey)

                            if (error) {
                              return (
                                <div key={i} className="text-danger">{e.title}</div>
                              )
                            } else {
                              return null
                            }
                          })
                        }
                      </div>
                    )
                  }
                  <button
                    className={`btn btn-primary text-uppercase ${markMyCampaignForReviewInProcess && "m-progress"} margin-top-20`}
                    type="submit"
                    disabled={markMyCampaignForReviewInProcess}
                    onClick={this.handleMarkMyCampaignForReview}
                  >
                    Submit
                  </button>
                </div>
              )
            } else if (submittedStatus === "rejected" || submittedStatus === "waiting_for_update") {
              const remarks = _.get(myCampaign, 'status.remarks', '')
              component = (
                <div>
                  { submittedStatus === "rejected" && <div>Unfortunately We Have Rejected Your Campaign {remarks && "Due To The Following Reason(s)"}</div> }
                  { submittedStatus === "waiting_for_update" && <div>Unfortunately We Are Waiting For More Information On Your Campaign {remarks && "On The Following"}</div> }
                  { remarks && <div className="margin-top-15" dangerouslySetInnerHTML={{ __html: remarks.decode() }} /> }
                </div>
              )
            } else if (submittedStatus === "accepted") {
              component = (
                <div>
                  <div>Your Campaign Is Now Accpeted And Ready For Investors</div>
                </div>
              )
            } else {
              component = (
                <div>
                  <div>Please Wait Patiently For Our Approval. We Will Get Back To You Soon</div>
                </div>
              )
            }

            return (
              <div>
                <div className="h4 margin-top-40 margin-bottom-5"><strong className="fw-500">Review Status - {submittedStatus.splitCap("_")}</strong></div>

                {component}
              </div>
            )
          })()
        }
      </div>
    )
  }
}
