import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'
import SelectField from '../../../shared/form-elements/select-field'
import DatetimePicker from '../../../shared/form-elements/datetime-picker'

@reduxForm({
  form: "MyCampaignBasicForm",
  validate: (values) => {
    return Validators({
      startup: [{ type: "attrPresences", opts: { key: "id" } }],
      name: ["presences"],
      goal: ["presences"],
      startDate: ["presences"],
      endDate: ["presences"],
      maturityDate: ["presences"]
    }, values)
  },
  initialValues: {
    startDate: moment().startOf('day').toDate(),
    endDate: moment().startOf('day').toDate(),
    maturityDate: moment().startOf('day').toDate()
  }
})
export default class MyCampaignBasicForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, title } = this.props

    return (
      <div id="forms-my-profile-basic" className={optClass}>
        { title && <h1 className="form-title margin-bottom-20 margin-top-0">{title}</h1>}

        <form onSubmit={handleSubmit}>
          <Field
            name="name"
            component={TextField}
            opts={{
              type: "text",
              label: "Campaign Name *"
            }}
          />

          <Field
            name="amountType"
            component={SelectField}
            opts={{
              label: "Valuation Type *",
              placeholder: "Select Valuation Type",
              options: [{ id: "valuation_cap", name: "Valuation Cap" }],
              valueKey: "id",
              nameKey: "name"
            }}
          />

          <Field
            name="goal"
            component={TextField}
            opts={{
              type: "number",
              label: "Goal Amount *"
            }}
          />

          <Field
            name="amount"
            component={TextField}
            opts={{
              type: "number",
              label: "Min Amount *"
            }}
          />

          <Field
            name="startDate"
            component={DatetimePicker}
            opts={{
              label: "Start Date *",
              time: false,
              format: "YYYY/MM/DD"
            }}
          />

          <Field
            name="endDate"
            component={DatetimePicker}
            opts={{
              label: "End Date *",
              time: false,
              format: "YYYY/MM/DD"
            }}
          />

          <Field
            name="interestRate"
            component={TextField}
            opts={{
              type: "number",
              label: "Interest Rate (in %) *"
            }}
          />

          <Field
            name="maturityDate"
            component={DatetimePicker}
            opts={{
              label: "Maturity Date *",
              time: false,
              format: "YYYY/MM/DD"
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
