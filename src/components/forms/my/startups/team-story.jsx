import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'

@reduxForm({
  form: "MyStartupsTeamStoryForm",
  validate: (values) => {
    return Validators({
      story: ["presences"]
    }, values)
  }
})
export default class MyStartupsTeamStoryForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-my-startup-team-story" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="story"
            component={TextArea}
            opts={{
              label: "Story *"
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
