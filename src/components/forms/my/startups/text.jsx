import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import RichTextEditorField from '../../../shared/form-elements/rich-text-editor-field'

@reduxForm({
  form: "MyStartupsTextForm",
  validate: (values) => {
    return Validators({
      text: ["presences"]
    }, values)
  }
})
export default class MyStartupsTextForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-my-startups-text" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="text"
            component={RichTextEditorField}
            opts={{
              placeholder: "Edit Here"
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