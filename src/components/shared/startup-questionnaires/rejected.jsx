import React, { Component } from 'react'
import { Link } from 'react-router'

export default class SharedStartupQuestionnairesRejected extends Component {
  render() {
    return (
      <div
        id="shared-my-startup-questionnaire-rejected"
        className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-0 text-center"
      >
        <div className="cross margin-bottom-40">
          <i className="fa fas fa-4x fa-times" />
        </div>

        <h1 className="page-title-c fw-500 text-uppercase margin-bottom-40">
          You have submitted your startup for review
        </h1>

        <h2 className="text-uppercase margin-bottom-40">You will hear back from us within 5 business days</h2>

        <Link className="btn btn-primary fw-500 text-uppercase" to="/my/dashboard">Go To Dashboard</Link>
      </div>
    )
  }
}
