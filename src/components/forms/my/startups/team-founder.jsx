import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'
import RichTextEditorField from '../../../shared/form-elements/rich-text-editor-field'
import ImageField from '../../../shared/form-elements/image-field'

@reduxForm({
  form: "MyStartupsTeamFounderForm",
  validate: (values) => {
    return Validators({
      name: ["presences"],
    }, values)
  }
})
export default class MyStartupsTeamFounderForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, avatarUrl } = this.props

    return (
      <div id="forms-my-startup-team-founder" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="name"
            component={TextField}
            opts={{
              type: "text",
              label: "Name *"
            }}
          />

          <Field
            name="title"
            component={TextField}
            opts={{
              type: "text",
              label: "Title"
            }}
          />

          <Field
            name="description"
            component={RichTextEditorField}
            opts={{
              label: "Description",
              placeholder: "Add Description Here"
            }}
          />

          <Field
            name="avatar"
            component={ImageField}
            opts={{
              label: "Avatar",
              imgUrl: avatarUrl,
              optClass: "image-field-avatar"
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
