import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'
import DatetimePicker from '../../../shared/form-elements/datetime-picker'

@reduxForm({
  form: "MyStartupMilestoneForm",
  validate: (values) => {
    return Validators({
      completedOn: ["presences"],
      detail: ["presences"]
    }, values)
  },
  initialValues: {
    completedOn: moment().startOf('day').toDate()
  }
})
export default class MyStartupMilestoneForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-my-startup-milestone" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="completedOn"
            component={DatetimePicker}
            opts={{
              label: "Completed On *",
              time: false,
              format: "YYYY MMM DD"
            }}
          />

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
