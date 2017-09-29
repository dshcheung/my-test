import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'
import TextArea from '../../../shared/form-elements/text-area'
import ImageField from '../../../shared/form-elements/image-field'

@reduxForm({
  form: "MyProfileBasicForm",
  validate: (values) => {
    return Validators({
      firstName: ["presences"],
      lastName: [],
      bio: []
    }, values)
  }
})
export default class MyProfileBasicForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, avatarUrl, bannerUrl } = this.props

    return (
      <div id="forms-my-profile-basic" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="firstName"
            component={TextField}
            opts={{
              type: "text",
              label: "First Name *"
            }}
          />

          <Field
            name="lastName"
            component={TextField}
            opts={{
              type: "text",
              label: "Last Name"
            }}
          />

          <Field
            name="bio"
            component={TextArea}
            opts={{
              label: "Bio"
            }}
          />

          <Field
            name="avatar"
            component={ImageField}
            imgUrl={avatarUrl}
            opts={{
              label: "Avatar",
            }}
            optClass="image-field-avatar"
          />

          <Field
            name="banner"
            component={ImageField}
            imgUrl={bannerUrl}
            opts={{
              label: "Banner",
            }}
            optClass="image-field-banner"
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