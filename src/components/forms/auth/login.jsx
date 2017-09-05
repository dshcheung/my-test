import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router'

import TextField from '../../shared/form-elements/text-field'
import LoadingSpinner from '../../shared/loading-spinner'
import Validators from '../../../services/form-validators'

@reduxForm({
  form: "LoginForm",
  validate: (values) => {
    return Validators({
      email: ["presences", "email"],
      password: ["presences", { type: "length", opts: { min: 6 } }]
    }, values)
  }
})
export default class LoginForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    const shouldDisable = submitInProcess

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
                  <Link className="pull-right forgot-password">Forgot?</Link>
                </div>
              )
            }}
            opts={{
              type: "password",
              label: "Password *"
            }}
          />

          <button className="btn btn-info btn-lg btn-block" type="submit" disabled={shouldDisable}>
            {submitInProcess ? <LoadingSpinner small white /> : "Sign into your account"}
          </button>
          <button className="btn btn-linked-in btn-lg btn-block" type="button" disabled={shouldDisable}>
            <i className="fa fa-linkedin fa-lg" /> Sign in with LinkedIn
          </button>
        </form>
      </div>
    )
  }
}
