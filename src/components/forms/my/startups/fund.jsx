import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'
import DatetimePicker from '../../../shared/form-elements/datetime-picker'

@reduxForm({
  form: "MyStartupFundForm",
  validate: (values) => {
    return Validators({
      receivedAt: ["presences"],
      company: ["presences"],
      amount: ["presences"]
    }, values)
  },
  initialValues: {
    receivedAt: moment().startOf('day').toDate()
  }
})
export default class MyStartupFundForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-my-startup-fund" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="receivedAt"
            component={DatetimePicker}
            opts={{
              label: "Completed On *",
              time: false,
              format: "YYYY MMM DD"
            }}
          />

          <Field
            name="company"
            component={TextField}
            opts={{
              type: "text",
              label: "Company *"
            }}
          />

          <Field
            name="amount"
            component={TextField}
            opts={{
              type: "number",
              label: "Amount *"
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
