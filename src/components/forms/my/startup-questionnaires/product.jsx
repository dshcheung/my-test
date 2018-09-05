import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextRTE from '../../../shared/form-elements/text-rte'
import CheckboxField from '../../../shared/form-elements/checkbox-field'
import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import TextField from '../../../shared/form-elements/text-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'
import SelectField from '../../../shared/form-elements/select-field'
import FileField from '../../../shared/form-elements/file-field'

@reduxForm({
  form: "MyStartupQuestionnairesProductForm",
  validate: (values) => {
    return Validators({
      startup_questionnaire_patents: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
          childFields: {
            title: ["presences"],
            registration_date: ["presences"]
          }
        }
      }],
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
    }, values, ["startup_questionnaire_patents", "attachments"])
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnairesProductForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes, pristine } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="product"
            component={TextRTE}
            opts={{
              showErrors: true,
              label: "1. Your product or service",
              hint: "Features, Underlying Technology, UI, UX,.... You can here explain in more details how your product will indeed solve the problem for the customer"
            }}
          />

          <FieldArray
            name="startup_questionnaire_patents"
            component={DynamicFieldArray}
            opts={{
              showErrors: true,
              label: "2. Patents (optional)",
              groupName: "Patent",
              newFieldInit: {
                registration_date: '',
                title: '',
                registration_in_progress: false
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "title",
                  component: TextField,
                  opts: {
                    showErrors: true,
                    label: "Title"
                  }
                },
                {
                  key: "registration_date",
                  component: DateTimePicker,
                  opts: {
                    showErrors: true,
                    label: "Registration Date",
                    time: false,
                    format: "YYYY/MM/DD"
                  }
                },
                {
                  key: "registration_in_progress",
                  component: CheckboxField,
                  opts: {
                    showErrors: true,
                    label: "Registration In Progress"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="attachments"
            component={DynamicFieldArray}
            opts={{
              showErrors: true,
              label: "3. You have something to add? (optional)",
              hint: "Upload Pictures or Slides describing your product/service",
              groupName: "File",
              newFieldInit: {
                title: '',
                file: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "title",
                  component: SelectField,
                  opts: {
                    showErrors: true,
                    label: "Title",
                    options: this.props.attachmentOptions,
                    valueField: "name",
                    textField: "name",
                    filter: true,
                    allowCreate: true
                  }
                },
                {
                  key: "file",
                  component: FileField,
                  opts: {
                    showErrors: true,
                    label: "File",
                    urlKey: "original"
                  }
                }
              ]
            }}
          />

          <button
            className={`btn btn-primary text-uppercase pull-right ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess || pristine}
          >CONTINUE</button>
        </form>
      </div>
    )
  }
}
