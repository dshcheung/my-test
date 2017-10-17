import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'

@reduxForm({
  form: "MyStartupOverviewForm",
  validate: (values) => {
    return Validators({
      name: ["presences"]
    }, values)
  }
})
export default class MyStartupOverviewForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-my-startups-overview" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="overview"
            component={TextArea}
            opts={{
              label: "Overview"
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