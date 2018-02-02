import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'

@reduxForm({
  form: "MyProfileNameForm",
  validate: (values) => {
    return Validators({
      firstName: ["presences"],
      lastName: ["presences"]
    }, values)
  }
})
export default class MyProfileNameForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-my-profile-name" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="firstName"
            component={TextField}
            opts={{
              type: "text",
              label: "First Name *"
            }}
          />

          <Field
            name="lastName"
            component={TextField}
            opts={{
              type: "text",
              label: "Last Name *"
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
