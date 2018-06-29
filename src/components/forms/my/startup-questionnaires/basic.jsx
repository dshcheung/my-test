import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import TextField from '../../../shared/form-elements/text-field'
import SelectField from '../../../shared/form-elements/select-field'
import ImageField from '../../../shared/form-elements/image-field'

@reduxForm({
  form: "MyStartupQuestionnairesBasicForm",
  validate: (values) => {
    return Validators({
      tagline: [{ type: "length", opts: { max: 140 } }],
    }, values)
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnairesBasicForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, pristine } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="name"
            component={TextField}
            opts={{
              label: "Company name",
              type: "text"
            }}
          />

          <Field
            name="logo"
            component={ImageField}
            opts={{
              title: "Logo",
              urlKey: "original",
              optClass: "image-field-avatar"
            }}
          />

          <Field
            name="founded"
            component={DateTimePicker}
            opts={{
              label: "Founded year",
              time: false,
              format: "YYYY",
              views: ["decade"]
            }}
          />

          <Field
            name="company_hq"
            component={SelectField}
            opts={{
              options: [
                { id: 0, name: "Need" },
                { id: 1, name: "Input" }
              ],
              valueKey: "id",
              nameKey: "name",
              label: "Country of incorporation"
            }}
          />

          <Field
            name="company_vertical"
            component={SelectField}
            opts={{
              options: [
                { id: 0, name: "Need" },
                { id: 1, name: "Input" },
              ],
              valueKey: "id",
              nameKey: "name",
              label: "Vertical",
            }}
          />

          <Field
            name="tagline"
            component={TextField}
            opts={{
              type: "text",
              label: "Tagline",
              hint: "A crisp definition of your Company"
            }}
          />

          <Field
            name="visual_identity"
            component={ImageField}
            opts={{
              title: "Visual Identity",
              urlKey: "original",
              optClass: "image-field-avatar"
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
