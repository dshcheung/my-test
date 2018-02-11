import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import Validators from '../../../services/form-validators'

import DynamicQuestionnaires from '../../shared/dynamic-questionnaires'

@reduxForm({
  form: "QuestionnaireForm",
  validate: (values) => {
    return Validators({
    }, values)
  },
  enableReinitialize: true
})
export default class QuestionnaireForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      enableHint: false
    }

    this.toggleHint = this.toggleHint.bind(this)
  }

  toggleHint() {
    this.setState({ enableHint: !this.state.enableHint })
  }

  render() {
    const { handleSubmit, submitInProcess, optClass, title, questionnaires, fileUrls } = this.props
    const { enableHint } = this.state

    return (
      <div id="forms-my-questionnaire" className={optClass}>
        <h1 className="form-title margin-bottom-20 margin-top-0">
          {title}
          <button
            onClick={this.toggleHint}
            className="btn btn-info pull-right"
          >{enableHint ? "Hide" : "Show"} Hints</button>
        </h1>

        <form onSubmit={handleSubmit}>
          <DynamicQuestionnaires
            questions={questionnaires}
            fileUrls={fileUrls}
            getName={(i) => {
              return `answers.[${i}].answer`
            }}
            enableHint={enableHint}
          />

          <button
            className={`btn btn-info btn-lg btn-block ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}
