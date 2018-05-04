import React, { Component } from 'react'
import { reduxForm, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import Select2Field from '../../../shared/form-elements/select2-field'
import FileField from '../../../shared/form-elements/file-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'

@reduxForm({
  form: "MyStartupQuestionnaireAttachmentsForm",
  validate: (values) => {
    return Validators({
      attachments: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: true,
          childFields: {
            title: ["presences"],
            // file: []
          }
        }
      }]

    }, values, ["attachments"])
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnaireAttachmentsForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, initialValues, dMSQAttributes } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <FieldArray
            name="attachments"
            component={DynamicFieldArray}
            opts={{
              label: "Extra Files",
              groupName: "File",
              newFieldInit: {
                title: '',
                file: '',
                file_url: ''
              },
              onDeleteField: dMSQAttributes,
              initialValues,
              dynamicFields: [
                {
                  key: "title",
                  component: Select2Field,
                  opts: {
                    options: [
                      { name: "test1" },
                      { name: "test2" }
                    ],
                    valueKey: "name",
                    nameKey: "name",
                    placeholder: "Title"
                  }
                },
                {
                  preRenderFormat: (values, fieldOptions) => {
                    const newFieldOptions = { ...fieldOptions, opts: { ...fieldOptions.opts } }
                    const fileUrl = _.get(values, 'file_url', null)
                    _.set(newFieldOptions, 'opts.fileUrl', fileUrl)

                    return newFieldOptions
                  },
                  key: "file",
                  component: FileField,
                  opts: {
                    placeholder: "File"
                  }
                }
              ]
            }}
          />

          <button
            className={`btn btn-info btn-lg btn-block ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}
