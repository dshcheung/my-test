import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import Validators from '../../../services/form-validators'

import DynamicQuestionnaire from '../../shared/dynamic-questionnaires'

@reduxForm({
  form: "QuestionnaireForm",
  validate: (values) => {
    return Validators({
    }, values)
  },
  enableReinitialize: true
})
export default class QuestionnaireForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, title, questionnaires, fileUrls } = this.props

    return (
      <div id="forms-my-questionnaire" className={optClass}>
        <h1 className="form-title margin-bottom-20 margin-top-0">{title}</h1>

        <form onSubmit={handleSubmit}>
          <DynamicQuestionnaire
            questions={questionnaires}
            fileUrls={fileUrls}
            getName={(i) => {
              return `answers.[${i}].answer`
            }}
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
