import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import FileField from '../../../shared/form-elements/file-field'

@reduxForm({
  form: "MyStartupsPitchDeckAttachmentForm",
  validate: (values) => {
    return Validators({
      file: []
    }, values)
  }
})
export default class MyStartupsPitchDeckAttachmentForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-my-startup-pitch-deck-attachment" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="file"
            component={FileField}
            opts={{
              label: "File",
              valueIsUrl: true
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
