import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'
import SelectField from '../../../shared/form-elements/select-field'
import TextArea from '../../../shared/form-elements/text-area'

@reduxForm({
  form: "MyStartupQuestionnairesInvestmentForm",
  validate: (values) => {
    return Validators({
      fund_type: ["presences"],
      fund_amount: ["presences"],
      exit_strategy: ["presences"]
    }, values)
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnairesInvestmentForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="fund_type"
            component={SelectField}
            opts={{
              options: [
                { key: "equity", name: "Equity" },
                { key: "convertible", name: "Convertible" }
              ],
              placeholder: "Fund Type",
              valueKey: "key",
              nameKey: "name",
            }}
          />

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
