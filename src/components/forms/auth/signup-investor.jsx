import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'
import TextArea from '../../shared/form-elements/text-area'
import MobileTextField from '../../shared/form-elements/mobile-text-field'
import DateTimePicker from '../../shared/form-elements/datetime-picker'

@reduxForm({
  form: "AuthSignupInvestor",
  validate: (values) => {
    return Validators({
      email: ["presences", "email"],
      password: ["presences", { type: "length", opts: { min: 6 } }],
      firstName: ["presences"],
      lastName: ["presences"],
      nationalID: ["presences"],
      dob: ["presences"],
      address: ["presences"],
      mobile: ["mobile"]
    }, values)
  },
  initialValues: {
    dob: moment().toDate(),
    mobile: ''
  }
})
export default class AuthSignupInvestor extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-auth-signup-investor" className={optClass}>
        <form onSubmit={handleSubmit}>
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
              label: "Username / Email *"
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

          <Field
            name="nationalID"
            component={TextField}
            opts={{
              type: "text",
              label: "National ID *"
            }}
          />

          <Field
            name="dob"
            component={DateTimePicker}
            opts={{
              label: "Date of Birth *",
              time: false,
              format: "MMM D, YYYY"
            }}
          />

          <Field
            name="address"
            component={TextArea}
            opts={{
              label: "Address *"
            }}
          />

          <Field
            name="mobile"
            component={MobileTextField}
            opts={{
              label: "Mobile Number *"
            }}
          />

          <button
            className={`btn btn-info btn-lg btn-block ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >
            Signup
          </button>
        </form>
      </div>
    )
  }
}
