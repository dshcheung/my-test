import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'
import MobileField from '../../shared/form-elements/mobile-field'

@reduxForm({
  form: "MyProfileContactForm",
  validate: (values) => {
    return Validators({
      email: ["presences"],
      mobile: ["mobile"]
    }, values)
  }
})
export default class MyProfileContactForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-my-profile-contact" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            component={TextField}
            opts={{
              type: "email",
              label: "Email"
            }}
          />

          <Field
            name="mobile"
            component={MobileField}
            opts={{
              label: "Mobile",
              placeholder: "96669666"
            }}
          />

          <button
            className={`btn btn-info btn-lg btn-block ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}
