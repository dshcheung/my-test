import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'
import { COUNTRIES } from '../../../services/constants'

import TextField from '../../shared/form-elements/text-field'
import SelectField from '../../shared/form-elements/select-field'
import DateTimePickerField from '../../shared/form-elements/datetime-picker'

@reduxForm({
  form: "ProfileInvestorUpdateForm",
  validate: (values) => {
    return Validators({
      national_id: ["presences"],
      nationality: ["presences"],
      address: ["presences"],
      dob: ["presences"]
    }, values)
  }
})
export default class ProfileInvestorUpdateForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-auth-signup-investor-create" className={optClass}>
        <h1 className="form-title fw-500">Join us as an investor</h1>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <Field
                name="chinese_name"
                component={TextField}
                opts={{
                  type: "text",
                  label: "Chinese Name (optional)",
                  placeholder: "陳亞當"
                }}
              />
            </div>
            <div className="col-xs-12 col-sm-6">
              <Field
                name="national_id"
                component={TextField}
                opts={{
                  type: "text",
                  label: "HKID / Passport",
                  placeholder: "A123456(7)"
                }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <Field
                name="nationality"
                component={SelectField}
                opts={{
                  label: "Nationality",
                  placeholder: "Hong Kong",
                  options: COUNTRIES,
                  valueField: "name",
                  textField: "name",
                }}
              />
            </div>

            <div className="col-xs-12 col-sm-6">
              <Field
                name="address"
                component={SelectField}
                opts={{
                  label: "Residence Country",
                  placeholder: "Hong Kong",
                  options: COUNTRIES,
                  valueField: "name",
                  textField: "name",
                }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <Field
                name="dob"
                component={DateTimePickerField}
                opts={{
                  label: "Date of Birth",
                  placeholder: "12/07/1988",
                  format: "DD/MM/YYYY",
                  time: false
                }}
              />
            </div>
          </div>

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
