import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'
import { COUNTRIES } from '../../../services/constants'

import TextField from '../../shared/form-elements/text-field'
import SelectField from '../../shared/form-elements/select-field'
import DateTimePickerField from '../../shared/form-elements/datetime-picker'

@reduxForm({
  form: "AuthSigupInvestorUpdate",
  validate: (values) => {
    return Validators({
      hkid: ["presences"],
      nationality: ["presences"],
      residence: ["presences"],
      password: ["presences", { type: "length", opts: { min: 6 } }]
    }, values)
  }
})
export default class AuthSigupInvestorUpdate extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-auth-signup-investor-create" className={optClass}>
        <h1 className="form-title">Join us as an investor</h1>

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
                name="hkid"
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
                name="residence"
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
                name="password"
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
            className={`btn btn-danger pull-right ${submitInProcess && "m-progress"}`}
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
