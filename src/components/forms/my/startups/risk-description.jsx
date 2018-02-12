import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import RichTextEditorField from '../../../shared/form-elements/rich-text-editor-field'

@reduxForm({
  form: "MyStartupsRiskDescriptionForm",
  validate: (values) => {
    return Validators({
    }, values)
  }
})
export default class MyStartupsRiskDescriptionForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-my-startup-risk-description" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="description"
            component={RichTextEditorField}
            opts={{
              placeholder: "Add Description Here"
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
