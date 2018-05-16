import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import Validators from '../../../services/form-validators'

import DynamicField from '../../shared/form-elements/dynamic-field'

@reduxForm({ // TODO: custom validations for questionnaires, look at complexArrOfObj
  form: "AuthSignupQuestionnaireForm",
  validate: (values) => {
    return Validators({
      questionnaire: [{ type: "questionnaire", opts: { answersKey: "answers", validationsKey: "validations", answerKey: "answer" } }]
    }, values, ["questionnaire"])
  },
  enableReinitialize: true
})
export default class AuthSignupQuestionnaireForm extends Component {
  render() {
    const { optClass, handleSubmit, submitInProcess } = this.props

    return (
      <div id="forms-auth-signup-questionnaire" className={optClass}>
        <form onSubmit={handleSubmit}>

          {
            _.get(this.props.initialValues, 'questionnaire.answers', []).map((q, i) => {
              return (
                <DynamicField
                  key={i}
                  data={q}
                  name={`questionnaire.answers[${i}].answer`}
                  typeKey="answer_type"
                  labelKey="title"
                  hintKey="hint"
                  optionsKey="options"
                />
              )
            })
          }


          <div className="form-actions">
            <button
              className={`btn btn-info btn-lg btn-block ${submitInProcess && "m-progress"}`}
              type="submit"
              disabled={submitInProcess}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    )
  }
}
