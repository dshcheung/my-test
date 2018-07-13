import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  markMyCampaignForReview, MARK_MY_CAMPAIGN_FOR_REVIEW
} from '../../../../actions/my/campaigns'

const mapStateToProps = (state) => {
  return {
    myCampaign: _.get(state, 'myCampaign'),
    markMyCampaignForReviewInProcess: _.get(state.requestStatus, MARK_MY_CAMPAIGN_FOR_REVIEW),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    markMyCampaignForReview: bindActionCreators(markMyCampaignForReview, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SharedMyCampaignsSubmission extends Component {
  render() {
    const { myCampaign, markMyCampaignForReviewInProcess, routeParams } = this.props
    const submittedStatus = _.get(myCampaign, 'status.submitted')

    return (
      <div className="stage-five row text-center">
        {
          (() => {
            let component = null

            if (submittedStatus === "not_submitted") {
              component = (
                <div>
                  <div className="margin-bottom-15">When You Are Ready To Submit Your Campaign For Us To Review, Click The Button Below</div>
                  <button
                    className={`btn btn-danger btn-lg ${markMyCampaignForReviewInProcess && "m-progress"}`}
                    type="submit"
                    disabled={markMyCampaignForReviewInProcess}
                    onClick={() => { this.props.markMyCampaignForReview(routeParams) }}
                  >
                    Request Admin Approval
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
                <div className="margin-bottom-15"><strong>Review Status -</strong> <span>{submittedStatus.splitCap("_")}</span></div>

                {component}
              </div>
            )
          })()
        }
      </div>
    )
  }
}
