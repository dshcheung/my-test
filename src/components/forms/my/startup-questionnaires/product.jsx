import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'
import CheckboxField from '../../../shared/form-elements/checkbox-field'
import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import TextField from '../../../shared/form-elements/text-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'
import SelectField from '../../../shared/form-elements/select-field'
import FileField from '../../../shared/form-elements/file-field'

@reduxForm({
  form: "MyStartupQuestionnairesTeaserForm",
  validate: (values) => {
    return Validators({
      startup_questionnaire_patents: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
          childFields: {
            logo: ["presences"],
            link: ["presences"]
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

export default class MyStartupQuestionnairesTeaserForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes, pristine } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="product"
            component={TextArea}
            opts={{
              label: "1. Your product or service",
              hint: "Features, Underlying Technology, UI, UX,.... You can here explain in more details how your product will indeed solve the problem for the customer"
            }}
          />

          <FieldArray
            name="startup_questionnaire_patents"
            component={DynamicFieldArray}
            opts={{
              label: "2. Patents (optional)",
              groupName: "Patent",
              newFieldInit: {
                registration_date: '',
                title: '',
                registration_in_progess: false
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "title",
                  component: TextField,
                  opts: {
                    label: "Title"
                  }
                },
                {
                  key: "registration_date",
                  component: DateTimePicker,
                  opts: {
                    label: "Registration Date",
                    time: false,
                    format: "YYYY/MM/DD"
                  }
                },
                {
                  key: "registration_in_progess",
                  component: CheckboxField,
                  opts: {
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
                    label: "File",
                    urlKey: "original"
                  }
                }
              ]
            }}
          />

          <button
            className={`btn btn-danger pull-right ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess || pristine}
          >CONTINUE</button>
        </form>
      </div>
    )
  }
}
