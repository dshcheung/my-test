import React, { Component } from 'react'
import { connect } from 'react-redux'

import SharedOthersSideTitle from '../../../shared/others/side-title'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session')
  }
}

@connect(mapStateToProps, null)
export default class MyInvestorValidationsOverview extends Component {
  render() {
    const {
      currentUser: {
        kyc_validation: { world_check, photo },
        investor: { pi_suitability_approved, kyc_aml_approved }
      }
    } = this.props

    const verificationCompleted = photo.original && world_check
    const suitabilityCompleted = pi_suitability_approved
    const amlCompleted = kyc_aml_approved

    return (
      <div id="page-my-investor-validations-overview">
        <SharedOthersSideTitle
          title="investor"
          optClass="hidden-xs col-sm-3 col-md-offset-1 col-md-2"
        />

        <div className="col-xs-12 col-sm-6">
          <h1 className="form-title fw-500">Validation Steps</h1>

          <div className="row validations">
            <div className={`col-xs-4 ${verificationCompleted ? "completed" : "incomplete"}`}>
              <div className="status-icon">
                <i className={`fas fa-2x ${verificationCompleted ? "fa-check" : "fa-times"}`} />
              </div>

              <h1 className="section-title">Verification</h1>

              <ul className="list">
                <li>World Check</li>
                <li>Address</li>
                <li>National ID Copy</li>
                <li>Risk Profile Questionnaire</li>
              </ul>
            </div>

            <div className={`col-xs-4 ${suitabilityCompleted ? "completed" : "incomplete"}`}>
              <div className="status-icon">
                <i className={`fas fa-2x ${suitabilityCompleted ? "fa-check" : "fa-times"}`} />
              </div>

              <h1 className="section-title">Suitability</h1>
              <p className="section-permission">View all Campaigns on AngelHub</p>

              <ul className="list">
                <li>Source of Funds</li>
                <li>Employment Status</li>
                <li>Occupation</li>
                <li>Current Income</li>
                <li>Education</li>
                <li>Investment Experience</li>
                <li>Assets Questionnaire</li>
                <li>Bank Statement</li>
              </ul>
            </div>

            <div className={`col-xs-4 ${amlCompleted ? "completed" : "incomplete"}`}>
              <div className="status-icon">
                <i className={`fas fa-2x ${amlCompleted ? "fa-check" : "fa-times"}`} />
              </div>

              <h1 className="section-title">AML</h1>
              <p className="section-permission">Fund Campaigns</p>

              <ul className="list">
                <li>Certified Document</li>
                <li>Signed Agreement</li>
                <li>Bank Transfer / Cheque</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
