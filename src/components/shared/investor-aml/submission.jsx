import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  uMyInvestorValidationsMarkForReview, U_MY_INVESTOR_VALIDATIONS_MARK_FOR_REVIEW
} from '../../../actions/my/investor-validations'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session'),
    uMyInvestorValidationsMarkForReviewInProcess: _.get(state.requestStatus, U_MY_INVESTOR_VALIDATIONS_MARK_FOR_REVIEW)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uMyInvestorValidationsMarkForReview: bindActionCreators(uMyInvestorValidationsMarkForReview, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SharedInvestorAMLSubmission extends Component {
  render() {
    const { currentUser, uMyInvestorValidationsMarkForReviewInProcess, routeParams, optClass } = this.props
    const submittedStatus = _.get(currentUser, 'investor.aml_approved')

    return (
      <div className={`col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-0 text-center ${optClass}`}>
        {
          (() => {
            let component = null

            if (submittedStatus === "not_submitted") {
              component = (
                <div>
                  <div className="text-gray margin-bottom-40">Once you submit, you will not be able to modify. You can go back to any section and resave now!</div>
                  <div className="text-gray margin-bottom-40">When You Are Ready To Submit Your AML Assessment For Us To Review, Click The Button Below</div>
                  <button
                    className={`btn btn-primary ${uMyInvestorValidationsMarkForReviewInProcess && "m-progress"} margin-top-20`}
                    type="submit"
                    disabled={uMyInvestorValidationsMarkForReviewInProcess}
                    onClick={() => { this.props.uMyInvestorValidationsMarkForReview(routeParams) }}
                  >
                    Submit
                  </button>
                </div>
              )
            } else if (submittedStatus === "rejected" || submittedStatus === "waiting_for_update") {
              component = (
                <div>
                  { submittedStatus === "rejected" && <div>Unfortunately We Have Rejected Your AML Assessment</div> }
                  { submittedStatus === "waiting_for_update" && <div>Unfortunately We Are Waiting For More Information On Your AML Assessment</div> }
                </div>
              )
            } else if (submittedStatus === "accepted") {
              component = (
                <div>
                  <div>Your AML Assessment Is Now Accpeted</div>
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
