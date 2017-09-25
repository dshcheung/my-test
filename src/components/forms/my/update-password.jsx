import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'

@reduxForm({
  form: "ResetPasswordForm",
  validate: (values) => {
    return Validators({
      password: ["presences", { type: "length", opts: { min: 6 } }],
      passwordConfirmation: ["presences", {
        type: "length", opts: { min: 6 }
      }, {
        type: "confirmPassword", opts: { password: _.get(values, "password", null) }
      }]
    }, values)
  }
})
export default class UpdatePasswordForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-my-update-password" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="password"
            component={TextField}
            opts={{
              type: "password",
              label: "Password *"
            }}
          />

          <Field
            name="passwordConfirmation"
            component={TextField}
            opts={{
              type: "password",
              label: "Password Confirmation*"
            }}
          />

          <button
            className={`btn btn-info btn-lg btn-block ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >
            Update Password
          </button>
        </form>
      </div>
    )
  }
}
