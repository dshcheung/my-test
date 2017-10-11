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
      description: [],
      overview: [],
      tagline: [],
      yearFounded: []
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
            name="description"
            component={TextArea}
            opts={{
              label: "Description"
            }}
          />

          <Field
            name="overview"
            component={TextArea}
            opts={{
              label: "Overview"
            }}
          />

          <Field
            name="tagline"
            component={TextArea}
            opts={{
              label: "Tagline"
            }}
          />

          <Field
            name="yearFounded"
            component={TextField}
            opts={{
              type: "number",
              label: "Year Founded"
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
