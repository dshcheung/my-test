import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import ImageField from '../../../shared/form-elements/image-field'

@reduxForm({
  form: "MyStartupsHeaderForm",
  validate: (values) => {
    return Validators({
    }, values)
  }
})
export default class MyStartupsHeaderForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-my-startups-header" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="avatar"
            component={ImageField}
            opts={{
              label: "Avatar",
              optClass: "image-field-avatar",
              urlKey: "original"
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
