import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'
import MobileField from '../../shared/form-elements/mobile-field'

@reduxForm({
  form: "AuthSigupInvestorCreateForm",
  validate: (values) => {
    return Validators({
      email: ["presences", "email"],
      password: ["presences", { type: "length", opts: { min: 6 } }],
      mobile: ["mobile"],
      firstName: ["presences"],
      lastName: ["presences"]
    }, values)
  }
})
export default class AuthSigupInvestorCreateForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-auth-signup-investor-create" className={optClass}>
        <h1 className="form-title fw-500">Join us as an investor</h1>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <Field
                name="firstName"
                component={TextField}
                opts={{
                  type: "text",
                  label: "First Name",
                  placeholder: "Adam"
                }}
              />
            </div>
            <div className="col-xs-12 col-sm-6">
              <Field
                name="lastName"
                component={TextField}
                opts={{
                  type: "text",
                  label: "Last Name",
                  placeholder: "Chan"
                }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <Field
                name="mobile"
                component={MobileField}
                opts={{
                  label: "Mobile",
                  placeholder: "96669666"
                }}
              />
            </div>

            <div className="col-xs-12 col-sm-6">
              <Field
                name="email"
                component={TextField}
                opts={{
                  type: "email",
                  label: "Username / Email",
                  placeholder: "example@mail.com"
                }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <Field
                name="password"
                component={TextField}
                opts={{
                  type: "password",
                  label: "Password",
                  placeholder: "********"
                }}
              />
            </div>
          </div>

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
