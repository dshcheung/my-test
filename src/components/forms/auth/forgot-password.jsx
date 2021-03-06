import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'

@reduxForm({
  form: "AuthForgotPasswordForm",
  validate: (values) => {
    return Validators({
      email: ["presences", "email"],
    }, values)
  }
})
export default class AuthForgotPasswordForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-auth-forgot-password" className={optClass}>
        <h1 className="form-title">FORGOT PASSWORD</h1>

        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            component={TextField}
            opts={{
              type: "email",
              label: "Email"
            }}
          />

          <button
            className={`btn btn-primary btn-lg btn-block ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >
            Request Reset Password Code
          </button>
        </form>
      </div>
    )
  }
}
