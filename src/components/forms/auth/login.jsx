import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'

@reduxForm({
  form: "LoginForm",
  validate: (values) => {
    return Validators({
      email: ["presences", "email"],
      password: ["presences", { type: "length", opts: { min: 6 } }]
    }, values)
  },
  initialValues: {
    email: "test@test.com",
    password: "123456"
  }
})
export default class LoginForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-auth-login" className={optClass}>
        <h1 className="form-title margin-bottom-20 margin-top-0">LOG IN</h1>

        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            component={TextField}
            opts={{
              type: "email",
              label: "Username / Email *"
            }}
          />

          <Field
            name="password"
            component={TextField}
            customLabel={(label, name) => {
              return (
                <div>
                  <label htmlFor={name}>{label}</label>
                  <Link to="/auth/forgot_password" className="pull-right forgot-password">Forgot?</Link>
                </div>
              )
            }}
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
            Sign into your account
          </button>
          <button
            className={`btn btn-linked-in btn-lg btn-block ${submitInProcess && "m-progress"}`}
            type="button"
            disabled={submitInProcess}
          >
            <i className="fa fa-linkedin fa-lg" /> Sign in with LinkedIn
          </button>
        </form>
      </div>
    )
  }
}
