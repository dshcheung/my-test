import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'
import TextArea from '../../../shared/form-elements/text-area'
import ImageField from '../../../shared/form-elements/image-field'

@reduxForm({
  form: "MyStartupMediaForm",
  validate: (values) => {
    return Validators({
      title: ["presences"],
      link: ["presences"],
      description: ["presences"],
    }, values)
  }
})
export default class MyStartupMediaForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, bannerUrl } = this.props

    return (
      <div id="forms-my-startup-media" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="title"
            component={TextField}
            opts={{
              type: "text",
              label: "Title *"
            }}
          />

          <Field
            name="link"
            component={TextField}
            opts={{
              type: "text",
              label: "Link *"
            }}
          />

          <Field
            name="description"
            component={TextArea}
            opts={{
              label: "Description *"
            }}
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
