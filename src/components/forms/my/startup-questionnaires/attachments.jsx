import React, { Component } from 'react'
import { reduxForm, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import FileDropField from '../../../shared/form-elements/file-drop-field'

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
            component={FileDropField}
            opts={{
              label: "1. You still have somtehing more you want to share with us ? (optional)",
              onDeleteField: dMSQAttributes,
              hint: "Please upload here any document not related to the previous tabs data rooms",
              selectOpts: {
                options: this.props.attachmentOptions,
                valueField: "name",
                textField: "name",
                placeholder: "Select a Title",
                filter: true
              }
            }}
          />

          <button
            className={`btn btn-primary btn-outline pull-right ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess || pristine}
          >CONTINUE</button>
        </form>
      </div>
    )
  }
}
