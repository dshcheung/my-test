import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'
import ImageField from '../../../shared/form-elements/image-field'

@reduxForm({
  form: "MyStartupsMediaForm",
  validate: (values) => {
    return Validators({
      title: ["presences"],
      link: ["presences", "httpLink"],
    }, values)
  }
})
export default class MyStartupsMediaForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

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
            name="banner"
            component={ImageField}
            opts={{
              label: "Banner",
              optClass: "image-field-banner",
              urlKey: "original"
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
