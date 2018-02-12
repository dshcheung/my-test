import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

// import TextArea from '../../../shared/form-elements/text-area'
import RichTextEditorField from '../../../shared/form-elements/rich-text-editor-field'

@reduxForm({
  form: "MyStartupsOverviewForm",
  validate: (values) => {
    return Validators({
      overview: ["presences"]
    }, values)
  }
})
export default class MyStartupsOverviewForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-my-startups-overview" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="overview"
            component={RichTextEditorField}
            opts={{
              placeholder: "Add Overview Here"
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
