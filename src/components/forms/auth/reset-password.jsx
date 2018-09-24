import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'

@reduxForm({
  form: "AuthResetPasswordForm",
  validate: (values) => {
    return Validators({
      reset_token: ["presences"],
      password: ["presences", {
        type: "length", opts: { min: 6 }
      }, {
        type: "confirmPassword", opts: { password: _.get(values, "password", null) }
      }]
    }, values)
  }
})
export default class AuthResetPasswordForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-auth-reset-password" className={optClass}>
        <h1 className="form-title">RESET PASSWORD</h1>

        <form onSubmit={handleSubmit}>
          <Field
            name="reset_token"
            component={TextField}
            opts={{
              type: "text",
              label: "Reset Token"
            }}
          />

          <Field
            name="password"
            component={TextField}
            opts={{
              type: "password",
              label: "Password",
              newPassword: true
            }}
          />

          <button
            className={`btn btn-primary btn-lg btn-block ${submitInProcess && "m-progress"}`}
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
