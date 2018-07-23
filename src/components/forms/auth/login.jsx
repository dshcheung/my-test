import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'

@reduxForm({
  form: "AuthLoginForm",
  validate: (values) => {
    return Validators({
      email: ["presences", "email"],
      password: ["presences", { type: "length", opts: { min: 6 } }]
    }, values)
  },
  initialValues: {
    email: "",
    password: ""
  }
})
export default class AuthLoginForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-auth-login" className={optClass}>
        <h1 className="form-title">LOG IN</h1>

        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            component={TextField}
            opts={{
              type: "email",
              label: "Username / Email",
              placeholder: "placeholder"
            }}
          />

          <Field
            name="password"
            component={TextField}
            opts={{
              type: "password",
              label: "Password",
              optClass: "margin-bottom-0"
            }}
          />

          <div className="form-group margin-bottom-20">
            <Link to="/auth/forgot-password" className="pull-right forgot-password">Forgot?</Link>
          </div>

          <button
            className={`btn btn-danger btn-lg btn-block ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >
            Sign into your account
          </button>
        </form>
      </div>
    )
  }
}
