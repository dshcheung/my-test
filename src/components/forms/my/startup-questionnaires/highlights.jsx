import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'
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
              label: "Your main achievements and current stage of development *",
              hint: "Be concise and selective : product lifecycle stage, team size, revenue level, funds gathered/used since inception, time spent . Imagine you want to strike your reader with 5 figures/ bullet points... Our advice : use nominal sentences"
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
