import React, { Component } from 'react'
import { reduxForm, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import Select2Field from '../../../shared/form-elements/select2-field'
import FileField from '../../../shared/form-elements/file-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'

import SharedMyCampaignsBackAndSaveBTN from '../../../shared/my/campaigns/back-and-save-btn'

@reduxForm({
  form: "MyStartupQuestionnairesAttachmentsForm",
  validate: (values) => {
    return Validators({
      attachments: [{
        type: "complexArrOfObj",
        opts: {
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

export default class MyStartupQuestionnairesAttachmentsForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes, pristine } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <FieldArray
            name="attachments"
            component={DynamicFieldArray}
            opts={{
              label: "You still have somtehing more you want to share with us ? (optional)",
              hint: "Please upload here any document not related to the previous tabs data rooms",
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
