import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'

@reduxForm({
  form: "MyStartupQuestionnaireTeamForm",
  validate: (values) => {
    return Validators({
      story: ["presences"],
      next_hires: ["presences"]
    }, values)
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnaireTeamForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="story"
            component={TextArea}
            opts={{
              label: "Your Team Story *",
              hint: "You and your co-founders / co-leaders. When did you meet ? How long have you been working together on this venture ? on other projects ? What is your passion and your definition of success ?"
            }}
          />

          <Field
            name="next_hires"
            component={TextArea}
            opts={{
              label: "Is your team complete ? What would be your next hires ? *",
              hint: "Imagine you can make 2 wishes for free concerning your dream team,... ok,ok let us stick to the legend : make it 3 ! what / who would you like to add to your team ?"
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
