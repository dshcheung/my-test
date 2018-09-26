import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'
import { COUNTRIES } from '../../../services/constants'

import TextArea from '../../shared/form-elements/text-area'
import SelectField from '../../shared/form-elements/select-field'

@reduxForm({
  form: "ProfileInvestorUpdateForm",
  validate: (values) => {
    return Validators({
      country_of_residence: ['presences'],
    }, values)
  }
})
export default class ProfileInvestorUpdateForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-auth-signup-investor-create" className={optClass}>
        <form onSubmit={handleSubmit} className="clearfix">
          <Field
            name="country_of_residence"
            component={SelectField}
            opts={{
              label: "Residence Country",
              placeholder: "Hong Kong",
              options: COUNTRIES,
              valueField: "name",
              textField: "name",
            }}
          />

          <Field
            name="address"
            component={TextArea}
            opts={{
              label: "Address"
            }}
          />

          <button
            className={`btn btn-primary text-uppercase pull-right ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >
            CONTINUE
          </button>
        </form>
      </div>
    )
  }
}
