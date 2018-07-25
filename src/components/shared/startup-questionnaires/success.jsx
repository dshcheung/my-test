import React, { Component } from 'react'

export default class SharedMyStartupQuestionnairesSuccess extends Component {
  render() {
    return (
      <div
        id="shared-my-startup-questionnaire-success"
        className="col-sm-6 col-md-4 text-center"
      >
        <div className="check margin-bottom-30">
          <i className="fa fas fa-4x fa-check" />
        </div>

        <h1 className="page-title-c capitalize">
          You have submitted your startup for review
        </h1>
      </div>
    )
  }
}
