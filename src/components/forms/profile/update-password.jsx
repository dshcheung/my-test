import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'

@reduxForm({
  form: "MyProfileUpdatePasswordForm",
  validate: (values) => {
    return Validators({
      password: ["presences", { type: "length", opts: { min: 6 } }],
      password_confirmation: ["presences", {
        type: "length", opts: { min: 6 }
      }, {
        type: "confirmPassword", opts: { password: _.get(values, "password", null) }
      }]
    }, values)
  }
})
export default class MyProfileUpdatePasswordForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-my-profile-update-password" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="password"
            component={TextField}
            opts={{
              type: "password",
              label: "Password"
            }}
          />

          <Field
            name="password_confirmation"
            component={TextField}
            opts={{
              type: "password",
              label: "Password Confirmation"
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
