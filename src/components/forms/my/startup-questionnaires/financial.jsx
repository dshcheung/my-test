import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'
import TextField from '../../../shared/form-elements/text-field'

@reduxForm({
  form: "MyStartupQuestionnaireFinancialForm",
  validate: (values) => {
    return Validators({
      three_kpis: ["presences"],
      current_fund: ["presences"]
    }, values)
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnaireFinancialForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="three_kpis"
            component={TextArea}
            opts={{
              label: "What are your three most critical KPIs for you and your business model ? *",
              hint: "variables that you will monitor and will use to gauge your progression vs your objectives"
            }}
          />

          <Field
            name="current_fund"
            component={TextField}
            opts={{
              type: "number",
              label: "Present fund round amount *"
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
