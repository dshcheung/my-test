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
export default class SharedMyCampaignsStageFive extends Component {
  render() {
    const { myCampaign, markMyCampaignForReviewInProcess } = this.props
    const submittedStatus = _.get(myCampaign, 'status.submitted')

    return (
      <div className="stage-five row text-center">
        {
          submittedStatus === "not_submitted" && (
            <div className="not-submitted">
              <div>When You Are Ready To Submit Your Campaign For Us To Review, Click The Button Below</div>
              <button
                className={`btn btn-info btn-lg ${markMyCampaignForReviewInProcess && "m-progress"}`}
                type="submit"
                disabled={markMyCampaignForReviewInProcess}
                onClick={() => { this.props.markMyCampaignForReview(this.props.routeParams) }}
              >
                Request Admin Approval
              </button>
            </div>
          )
        }

        {
          submittedStatus === "pending" && (
            <div className="pending">Please Wait Patiently For Our Approval. We Will Get Back To You Soon</div>
          )
        }

        {
          submittedStatus === "rejected" && (
            <div className="rejected">
              <div>Unfortunately We Have Rejected Your Campaign Due To The Following Reason</div>
              <div dangerouslySetInnerHTML={{ __html: _.get(myCampaign, 'status.remakrs', '').decode() }} />
            </div>
          )
        }

        {
          submittedStatus === "accepted" && (
            <div className="accepted">
              We Are Pleased To Inform You That Your Campaign Has Been Approved And Is Now Active For Investors To Pledge
            </div>
          )
        }
      </div>
    )
  }
}
