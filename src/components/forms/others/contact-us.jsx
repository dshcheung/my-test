import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import TextArea from '../../shared/form-elements/text-area'
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
          <div className="row">
            <Field
              name="first_name"
              component={TextField}
              opts={{
                optClass: "col-xs-12 col-md-6",
                type: "text",
                label: "First Name",
                placeholder: "Adam"
              }}
            />

            <Field
              name="last_name"
              component={TextField}
              opts={{
                optClass: "col-xs-12 col-md-6",
                type: "text",
                label: "Last Name",
                placeholder: "Chan"
              }}
            />
          </div>

          <div className="row margin-top-0">
            <Field
              name="company"
              component={TextField}
              opts={{
                optClass: "col-xs-12 col-md-6",
                type: "text",
                label: "Company",
                placeholder: "Angelhub"
              }}
            />

            <Field
              name="email"
              component={TextField}
              opts={{
                optClass: "col-xs-12 col-md-6",
                type: "email",
                label: "Email",
                placeholder: "adam.chan@domain.com"
              }}
            />
          </div>

          <Field
            name="message"
            component={TextArea}
            opts={{
              label: "Message"
            }}
          />

          <button
            className={`btn btn-primary text-uppercase pull-right ${submitInProcess && "m-progress"}`}
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
