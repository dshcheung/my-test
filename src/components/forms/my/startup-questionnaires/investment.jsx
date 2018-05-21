import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'
import SelectField from '../../../shared/form-elements/select-field'
import TextArea from '../../../shared/form-elements/text-area'
import Select2Field from '../../../shared/form-elements/select2-field'
import FileField from '../../../shared/form-elements/file-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'


@reduxForm({
  form: "MyStartupQuestionnairesInvestmentForm",
  validate: (values) => {
    return Validators({
      exit_strategy: [{ type: "length", opts: { max: 600 } }],
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

export default class MyStartupQuestionnairesInvestmentForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes, pristine } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="fund_type"
            component={SelectField}
            opts={{
              options: [
                { key: "equity", name: "Equity" },
                { key: "convertible", name: "Convertible" }
              ],
              placeholder: "Fund Type",
              valueKey: "key",
              nameKey: "name",
            }}
          />

          <Field
            name="fund_amount"
            component={TextField}
            opts={{
              type: "number",
              label: "Fund Round Amount *",
            }}
          />

          <Field
            name="exit_strategy"
            component={TextArea}
            opts={{
              label: "What is your exit strategy ? *",
              hint: "Your plan as founders : Stay or Sell ? When and How ? including intermediate funding rounds plans."
            }}
          />

          <FieldArray
            name="attachments"
            component={DynamicFieldArray}
            opts={{
              label: "Extra Files (Optional)",
              groupName: "File",
              newFieldInit: {
                title: '',
                file: '',
                file_url: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "title",
                  component: Select2Field,
                  opts: {
                    options: this.props.attachmentOptions,
                    valueKey: "name",
                    nameKey: "name",
                    placeholder: "Title"
                  }
                },
                {
                  key: "file",
                  component: FileField,
                  opts: {
                    urlKey: "original"
                  }
                }
              ]
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
