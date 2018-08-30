import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'

@reduxForm({
  form: "OthersMailingForm",
  validate: (values) => {
    return Validators({
      first_name: ["presences"],
      last_name: ["presences"],
      email: ["presences", "email"]
    }, values)
  }
})
export default class OthersMailingForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-auth-signup-investor-create" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="first_name"
            component={TextField}
            opts={{
              type: "text",
              label: "First Name",
              placeholder: "Adam"
            }}
          />

          <Field
            name="last_name"
            component={TextField}
            opts={{
              type: "text",
              label: "Last Name",
              placeholder: "Chan"
            }}
          />

          <Field
            name="email"
            component={TextField}
            opts={{
              type: "email",
              label: "Email",
              placeholder: "adam.chan@domain.com"
            }}
          />

          <button
            className={`btn btn-primary btn-outline pull-right ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >
            CONTINUE
          </button>
        </form>
      </div>
    )
  }
}
