import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'
import TextArea from '../../../shared/form-elements/text-area'
import DatetimePicker from '../../../shared/form-elements/datetime-picker'

@reduxForm({
  form: "MyProfileExperienceForm",
  validate: (values) => {
    return Validators({
      company: ["presences"],
      year: ["presences"],
      position: ["presences"],
      description: []
    }, values)
  },
  initialValues: {
    year: moment().startOf('day').toDate()
  }
})
export default class MyProfileExperienceForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-my-profile-experience" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="company"
            component={TextField}
            opts={{
              type: "text",
              label: "Company Name *"
            }}
          />

          <Field
            name="year"
            component={DatetimePicker}
            opts={{
              label: "Year *",
              views: ["decade"],
              time: false,
              format: "YYYY"
            }}
          />

          <Field
            name="position"
            component={TextField}
            opts={{
              type: "text",
              label: "Position *"
            }}
          />

          <Field
            name="description"
            component={TextArea}
            opts={{
              label: "Description"
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
