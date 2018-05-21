import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'

@reduxForm({
  form: "MyStartupQuestionnairesHighlightForm",
  validate: (values) => {
    return Validators({
      tagline: [{ type: "length", opts: { max: 140 } }],
      mission: [{ type: "length", opts: { max: 600 } }],
      achievements: [{ type: "length", opts: { max: 600 } }],
    }, values)
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnairesHighlightForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, pristine } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="tagline"
            component={TextArea}
            opts={{
              label: "Tag Line *",
              hint: "Describe your startup in 140 characters max."
            }}
          />

          <Field
            name="mission"
            component={TextArea}
            opts={{
              label: "Your Mission/Vision *",
              hint: "The Problem you identified, the market opportunity, your model. 100 words"
            }}
          />

          <Field
            name="achievements"
            component={TextArea}
            opts={{
              label: "Your main achievements and current stage of development *",
              hint: "Be concise and selective : product lifecycle stage, team size, revenue level, funds gathered/used since inception, time spent . Imagine you want to strike your reader with 5 figures/ bullet points... Our advice : use nominal sentences"
            }}
          />

          <button
            className={`btn btn-info btn-lg btn-block ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess || pristine}
          >
            Save
          </button>
        </form>
      </div>
    )
  }
}
