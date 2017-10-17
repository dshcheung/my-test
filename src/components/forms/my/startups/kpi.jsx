import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'

@reduxForm({
  form: "MyStartupKPIForm",
  validate: (values) => {
    return Validators({
      detail: ["presences"]
    }, values)
  }
})
export default class MyStartupKPIForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-my-startup-kpi" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="detail"
            component={TextArea}
            opts={{
              label: "Details *"
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