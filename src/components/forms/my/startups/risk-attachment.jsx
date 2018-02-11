import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'
import FileField from '../../../shared/form-elements/file-field'

@reduxForm({
  form: "MyStartupsRiskAttachmentForm",
  validate: (values) => {
    return Validators({
      title: ["presences"]
    }, values)
  }
})
export default class MyStartupsRiskAttachmentForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, fileUrl } = this.props

    return (
      <div id="forms-my-startup-risk-attachment" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="title"
            component={TextField}
            opts={{
              type: "text",
              label: "Title *"
            }}
          />

          <Field
            name="file"
            component={FileField}
            opts={{
              label: "File",
              fileUrl
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
