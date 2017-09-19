import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'

@reduxForm({
  form: "ResetPasswordForm",
  validate: (values) => {
    return Validators({
      reset_token: ["presences"],
      password: ["presences", { type: "length", opts: { min: 6 } }]
    }, values)
  }
})
export default class ResetPasswordForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-auth-reset-password" className={optClass}>
        <h1 className="form-title margin-bottom-20 margin-top-0">RESET PASSWORD</h1>

        <form onSubmit={handleSubmit}>
          <Field
            name="resetToken"
            component={TextField}
            opts={{
              type: "text",
              label: "Reset Token *"
            }}
          />

          <Field
            name="password"
            component={TextField}
            opts={{
              type: "password",
              label: "Password *"
            }}
          />

          <button
            className={`btn btn-info btn-lg btn-block ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >
            Reset Password
          </button>
        </form>
      </div>
    )
  }
}
