import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'

@reduxForm({
  form: "VerifyEmailForm",
  validate: (values) => {
    return Validators({
      email: ["presences", "email"]
    }, values)
  }
})
export default class VerifyEmailForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-verify-email" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            component={TextField}
            opts={{
              type: "text",
              label: "Email"
            }}
          />

          <div className="clearfix">
            <button
              className={`btn btn-primary pull-right ${submitInProcess && "m-progress"}`}
              type="submit"
              disabled={submitInProcess}
            >
              Resend
            </button>
          </div>
        </form>
      </div>
    )
  }
}
