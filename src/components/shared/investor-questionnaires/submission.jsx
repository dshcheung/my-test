import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  uMyInvestorQuestionnaireMarkForReview, U_MY_INVESTOR_QUESTIONNAIRE_MARK_FOR_REVIEW
} from '../../../actions/my/investor-questionnaires'

const mapStateToProps = (state) => {
  return {
    myInvestorQuestionnaire: _.get(state, 'myInvestorQuestionnaire'),
    uMyInvestorQuestionnaireMarkForReivewInProcess: _.get(state.requestStatus, U_MY_INVESTOR_QUESTIONNAIRE_MARK_FOR_REVIEW),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uMyInvestorQuestionnaireMarkForReview: bindActionCreators(uMyInvestorQuestionnaireMarkForReview, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SharedInvestorQuestionnairesSubmission extends Component {
  render() {
    const { myInvestorQuestionnaire, uMyInvestorQuestionnaireMarkForReivewInProcess, routeParams, optClass } = this.props
    const submittedStatus = _.get(myInvestorQuestionnaire, 'status')

    return (
      <div className={`col-sm-6 col-md-6 text-center ${optClass}`}>
        {
          (() => {
            let component = null

            if (submittedStatus === "not_submitted") {
              component = (
                <div>
                  <div className="text-gray margin-bottom-40">Once you submit, you will not be able to modify. You can go back to any section and resave now!</div>
                  <div className="text-gray margin-bottom-40">When You Are Ready To Submit Your Questionnaire For Us To Review, Click The Button Below</div>
                  <button
                    className={`btn btn-danger ${uMyInvestorQuestionnaireMarkForReivewInProcess && "m-progress"} margin-top-20`}
                    type="submit"
                    disabled={uMyInvestorQuestionnaireMarkForReivewInProcess}
                    onClick={() => { this.props.uMyInvestorQuestionnaireMarkForReview(routeParams) }}
                  >
                    Submit
                  </button>
                </div>
              )
            } else if (submittedStatus === "rejected" || submittedStatus === "waiting_for_update") {
              component = (
                <div>
                  { submittedStatus === "rejected" && <div>Unfortunately We Have Rejected Your Questionnaire</div> }
                  { submittedStatus === "waiting_for_update" && <div>Unfortunately We Are Waiting For More Information On Your Questionnaire</div> }
                </div>
              )
            } else if (submittedStatus === "accepted") {
              component = (
                <div>
                  <div>Your Questionnaire Is Now Accpeted</div>
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
