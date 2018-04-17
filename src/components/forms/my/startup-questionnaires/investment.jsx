import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'
import TextArea from '../../../shared/form-elements/text-area'

@reduxForm({
  form: "MyStartupQuestionnaireInvestmentForm",
  validate: (values) => {
    return Validators({
      fund_amount: ["presences"],
      exit_strategy: ["presences"]
    }, values)
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnaireInvestmentForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="fund_amount"
            component={TextField}
            opts={{
              type: "number",
              label: "Fund Round Amount *",
            }}
          />

          <Field
            name="exit_strategy"
            component={TextArea}
            opts={{
              label: "What is your exit strategy ? *",
              hint: "Your plan as founders : Stay or Sell ? When and How ? including intermediate funding rounds plans."
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
