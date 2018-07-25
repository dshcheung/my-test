import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'
import { COUNTRIES } from '../../../../services/constants'

import TextField from '../../../shared/form-elements/text-field'
import SelectField from '../../../shared/form-elements/select-field'
import MultiselectField from '../../../shared/form-elements/multiselect-field'
import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import FileDropField from '../../../shared/form-elements/file-drop-field'

@reduxForm({
  form: "MyStartupQuestionnairesBasicEditForm",
  validate: (values) => {
    return Validators({
      company_name: ["presences"],
      tagline: [{ type: "length", opts: { max: 140 } }],
      hashtags: [{ type: "amount", opts: { max: 5 } }],
      attachments: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
          childFields: {
            title: ["presences"],
            file: ["filePresences"]
          }
        }
      }]
    }, values, ["attachments"])
  },
  enableReinitialize: true
})
export default class MyStartupQuestionnairesBasicEditForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, pristine } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="company_name"
            component={TextField}
            opts={{
              placeholder: "Name",
              label: "Company Name"
            }}
          />

          <Field
            name="founded_year"
            component={DateTimePicker}
            opts={{
              placeholder: "Select the year",
              label: "Founded Year",
              time: false,
              format: "YYYY",
              views: ["decade"]
            }}
          />

          <Field
            name="country_of_incorporation"
            component={SelectField}
            opts={{
              options: COUNTRIES,
              valueField: "name",
              textField: "name",
              label: "Country of Incorporation",
              placeholder: "Select a country"
            }}
          />

          <Field
            name="tagline"
            component={TextField}
            opts={{
              label: "Tagline",
              placeholder: "Tagline"
            }}
          />

          <Field
            name="hashtags"
            component={MultiselectField}
            opts={{
              label: "Hashtags",
              placeholder: "Hashtags",
              options: [
                { tag: "Need" },
                { tag: "Input" }
              ],
              valueField: 'tag',
              textField: 'tag'
            }}
          />

          <FieldArray
            name="attachments"
            component={FileDropField}
            opts={{
              selectOpts: {
                options: [
                  {
                    id: "logo",
                    name: "Company Logo",
                    section: "startup_questionnaire_basic"
                  },
                  {
                    id: "banner",
                    name: "Banner",
                    section: "startup_questionnaire_basic"
                  },
                ],
                valueField: 'id',
                textField: 'name',
                placeholder: 'Select a Title'
              }
            }}
          />

          <button
            className={`btn btn-danger pull-right ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess || pristine}
          >SAVE</button>
        </form>
      </div>
    )
  }
}
