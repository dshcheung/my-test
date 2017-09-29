import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'

@reduxForm({
  form: "MyStartupsNameForm",
  validate: (values) => {
    return Validators({
      name: ["presences"]
    }, values)
  }
})
export default class MyStartupsNameForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-my-startups-basic" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="name"
            component={TextField}
            opts={{
              type: "text",
              label: "Startup Name *"
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
