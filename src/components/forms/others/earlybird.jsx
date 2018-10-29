import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'
import MobileField from '../../shared/form-elements/mobile-field'

@reduxForm({
  form: "EarlybirdForm",
  validate: (values) => {
    return Validators({
      email: ["presences", "email"],
      mobile: ["mobile"],
      first_name: ["presences"],
      last_name: ["presences"]
    }, values)
  }
})
export default class EarlybirdForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-auth-signup-investor-create" className={optClass}>
        <h1 className="form-title h3">Be the first to join our exclusive club of professional investors</h1>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <Field
                name="first_name"
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
                name="last_name"
                component={TextField}
                opts={{
                  type: "text",
                  label: "Last Name",
                  placeholder: "Chan"
                }}
              />
            </div>
          </div>

          <div className="row margin-top-0">
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
                  label: "Email",
                  placeholder: "example@mail.com"
                }}
              />
            </div>
          </div>

          <div className="row margin-top-0">
            <div className="col-xs-12">
              <Field
                name="code"
                component={TextField}
                opts={{
                  type: "text",
                  label: "Exclusive Code"
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
