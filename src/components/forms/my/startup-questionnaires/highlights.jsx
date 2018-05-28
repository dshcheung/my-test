import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import TextArea from '../../../shared/form-elements/text-area'
import SelectField from '../../../shared/form-elements/select-field'
import Select2Field from '../../../shared/form-elements/select2-field'
import FileField from '../../../shared/form-elements/file-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'

@reduxForm({
  form: "MyStartupQuestionnairesHighlightForm",
  validate: (values) => {
    return Validators({
      tagline: [{ type: "length", opts: { max: 140 } }],
      mission: [{ type: "length", opts: { max: 600 } }],
      achievements: [{ type: "length", opts: { max: 600 } }],
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

export default class MyStartupQuestionnairesHighlightForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes, pristine } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="founded"
            component={DateTimePicker}
            opts={{
              label: "When was your company founded? *",
              hint: "The year your startup was founded",
              time: false,
              format: "MM/YYYY"
            }}
          />

          <Field
            name="current_stage"
            component={SelectField}
            opts={{
              options: [
                { id: 0, name: "Idea" },
                { id: 1, name: "Development" },
                { id: 2, name: "Adoption" },
                { id: 3, name: "Growth" }
              ],
              valueKey: "id",
              nameKey: "name",
              label: "What is the current stage of development? *",
              hint: "The stage of development of your startup"
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
              label: "In which vertical do you place your company? *",
              hint: "The vertical of your startup"
            }}
          />

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
              label: "Your main achievements *",
              hint: "5 bullet points describing the 5 achievements you are most proud of"
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
