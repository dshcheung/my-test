import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'
import CheckboxField from '../../../shared/form-elements/checkbox-field'
import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import TextField from '../../../shared/form-elements/text-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'
import Select2Field from '../../../shared/form-elements/select2-field'
import FileField from '../../../shared/form-elements/file-field'

import SharedMyCampaignsBackAndSaveBTN from '../../../shared/my/campaigns/back-and-save-btn'

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
              label: "Your product or service",
              hint: "Features, Underlying Technology, UI, UX,.... You can here explain in more details how your product will indeed solve the problem for the customer"
            }}
          />

          <FieldArray
            name="startup_questionnaire_patents"
            component={DynamicFieldArray}
            opts={{
              label: "Patents (optional)",
              groupName: "Patent",
              newFieldInit: {
                registration_date: moment().toDate(),
                title: '',
                registration_in_progess: false
              },
              onDeleteField: dMSQAttributes,
              hint: "5 main achievements. For each, we need a 4 words max title, a date (optional, quarter/year), a nominal sentence of 20 words max. Make them count !",
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
                    format: "DD/MM/YYYY"
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
              label: "You have something to add? (optional)",
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
                  component: Select2Field,
                  opts: {
                    label: "Title",
                    options: this.props.attachmentOptions,
                    valueKey: "name",
                    nameKey: "name",
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

          <SharedMyCampaignsBackAndSaveBTN
            submitInProcess={submitInProcess}
            pristine={pristine}
            toBackTab={this.props.toBackTab}
            hasBack={this.props.hasBack}
          />
        </form>
      </div>
    )
  }
}
