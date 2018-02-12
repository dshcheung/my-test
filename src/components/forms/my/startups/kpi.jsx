import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import RichTextEditorField from '../../../shared/form-elements/rich-text-editor-field'

@reduxForm({
  form: "MyStartupsKPIForm",
  validate: (values) => {
    return Validators({
      detail: ["presences"]
    }, values)
  }
})
export default class MyStartupsKPIForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-my-startup-kpi" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="detail"
            component={RichTextEditorField}
            opts={{
              placeholder: "Add KPI Here"
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
