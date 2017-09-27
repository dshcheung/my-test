import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'
import TextArea from '../../shared/form-elements/text-area'

@reduxForm({
  form: "MyEndorsementForm",
  validate: (values) => {
    return Validators({
      name: ["presences"],
      description: ["presences"],
    }, values)
  }
})
export default class MyEndorsementForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-my-endorsement" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="name"
            component={TextField}
            opts={{
              type: "text",
              label: "Name *"
            }}
          />

          <Field
            name="description"
            component={TextArea}
            opts={{
              label: "Description *"
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
