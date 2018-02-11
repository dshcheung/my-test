import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'
import ImageField from '../../../shared/form-elements/image-field'

@reduxForm({
  form: "MyStartupsTeamMemberForm",
  validate: (values) => {
    return Validators({
      name: ["presences"]
    }, values)
  }
})
export default class MyStartupsTeamMemberForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, avatarUrl } = this.props

    return (
      <div id="forms-my-startup-team-member" className={optClass}>
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
