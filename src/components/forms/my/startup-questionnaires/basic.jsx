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
            name="company_name"
            component={TextField}
            opts={{
              label: "Company name",
              type: "text"
            }}
          />

          <Field
            name="founded_year"
            component={DateTimePicker}
            opts={{
              label: "Founded year",
              time: false,
              format: "YYYY",
              views: ["decade"]
            }}
          />

          <Field
            name="country_of_incorporation"
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
            name="vertical"
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
            name="logo"
            component={ImageField}
            opts={{
              title: "Logo",
              urlKey: "original",
              optClass: "image-field-avatar"
            }}
          />

          <Field
            name="banner"
            component={ImageField}
            opts={{
              title: "Visual Identity (optional)",
              urlKey: "original",
              optClass: "image-field-banner",
              hint: "Banner"
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
