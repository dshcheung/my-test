import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'
import FileField from '../../../shared/form-elements/file-field'
import TextField from '../../../shared/form-elements/text-field'

@reduxForm({
  form: "MyStartupQuestionnaireFinancialForm",
  validate: (values) => {
    return Validators({
      three_kpis: ["presences"],
      break_even: [],
      income_statements: [],
      cash_flow_statements: [],
      current_fund: ["presences"]
    }, values)
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnaireFinancialForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, initialValues } = this.props

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
            name="break_even"
            component={FileField}
            opts={{
              label: "When will you reach break-even ? *",
              fileUrl: initialValues.break_even_url
            }}
          />

          <Field
            name="income_statements"
            component={FileField}
            opts={{
              label: "Building a summarized Financial statements projection (Y, Y+1, Y+2) *",
              fileUrl: initialValues.income_statements_url
            }}
          />

          <Field
            name="cash_flow_statements"
            component={FileField}
            opts={{
              label: "Building a summarized Cash-Flow statements projection (Y, Y+1, Y+2) *",
              fileUrl: initialValues.cash_flow_statements_url
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
