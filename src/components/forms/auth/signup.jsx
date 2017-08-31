import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router'

import TextField from '../../shared/form-elements/text-field'
import RadioField from '../../shared/form-elements/radio-field'
import LoadingSpinner from '../../shared/loading-spinner'
import Validators from '../../../services/form-validators'

@reduxForm({
  form: "SignupForm",
  validate: (values) => {
    return Validators({
      email: ["presences", "email"],
      password: ["presences", { type: "length", opts: { min: 6 } }],
      firstName: ["presences"],
      lastName: ["presences"],
      role: ["presences"]
    }, values)
  }
})

export default class SignupForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    const shouldDisable = submitInProcess

    return (
      <div id="forms-auth-signup" className={optClass}>
        <h1 className="form-title margin-bottom-20 margin-top-0 text-uppercase">Join AngelHub</h1>
        <p>You need to sign up to get full access. Free to join</p>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <Field
              name="role"
              component={RadioField}
              optItemClass="col-xs-12 col-sm-6"
              opts={[
                { value: "investor", label: "I am an investor" },
                { value: "founder", label: "I am an founder" }
              ]}
            />
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <Field
                name="firstName"
                component={TextField}
                opts={{
                  type: "text",
                  label: "First Name *"
                }}
              />
            </div>
            <div className="col-xs-12 col-sm-6">
              <Field
                name="lastName"
                component={TextField}
                opts={{
                  type: "text",
                  label: "Last Name *"
                }}
              />
            </div>
          </div>

          <Field
            name="email"
            component={TextField}
            opts={{
              type: "email",
              label: "Email *"
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

          <button className="btn btn-linked-in btn-lg btn-block" type="button" disabled={shouldDisable}>
            <i className="fa fa-linkedin fa-lg" /> Sign in with LinkedIn
          </button>
          <button className="btn btn-info btn-lg btn-block" type="submit" disabled={shouldDisable}>
            {submitInProcess ? <LoadingSpinner small white /> : "Continue"}
          </button>

          <hr />

          <div className="have-account">
            <span>Already have an account? </span><Link to="/auth/login">Log in here</Link>
          </div>
        </form>
      </div>
    )
  }
}
