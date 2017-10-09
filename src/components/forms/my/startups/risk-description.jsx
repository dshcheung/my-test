import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'

@reduxForm({
  form: "MyStartupRiskDescriptionForm",
  validate: (values) => {
    return Validators({
      description: ["presences"]
    }, values)
  }
})
export default class MyStartupRiskDescriptionForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-my-startup-risk-description" className={optClass}>
        <form onSubmit={handleSubmit}>
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
