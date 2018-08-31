import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'

@reduxForm({
  form: "AuthSignupStartup",
  validate: (values) => {
    return Validators({
      email: ["presences", "email"],
      password: ["presences", { type: "length", opts: { min: 6 } }],
      firstName: ["presences"],
      lastName: ["presences"]
    }, values)
  }
})
export default class AuthSignupStartup extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-auth-signup-startup" className={optClass}>
        <h1 className="form-title">Join us as a startup</h1>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <Field
                name="firstName"
                component={TextField}
                opts={{
                  type: "text",
                  label: "First Name"
                }}
              />
            </div>
            <div className="col-xs-12 col-sm-6">
              <Field
                name="lastName"
                component={TextField}
                opts={{
                  type: "text",
                  label: "Last Name"
                }}
              />
            </div>
          </div>

          <Field
            name="email"
            component={TextField}
            opts={{
              type: "email",
              label: "Username / Email"
            }}
          />

          <Field
            name="password"
            component={TextField}
            opts={{
              type: "password",
              label: "Password"
            }}
          />

          <button
            className={`btn btn-primary pull-right ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >
            SIGN UP
          </button>
        </form>
      </div>
    )
  }
}
