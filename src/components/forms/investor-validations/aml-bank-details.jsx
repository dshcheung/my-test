import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import Validators from '../../../services/form-validators'
import { COUNTRIES } from '../../../services/constants'

import TextField from '../../shared/form-elements/text-field'
import SelectField from '../../shared/form-elements/select-field'

const mapStateToProps = (state) => {
  return {
    formData: _.get(state.form, 'InvestorAMLBankDetailsForm')
  }
}

@connect(mapStateToProps, null)
@reduxForm({
  form: "InvestorAMLBankDetailsForm",
  validate: (values) => {
    return Validators({
      name: ["presences"],
      account_number: ["presences"],
      address: ["presences"],
      country: ["presences"]
    }, values)
  },
  enableReinitialize: true
})
export default class InvestorAMLBankDetailsForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, pristine } = this.props

    const hint = "Please provide details for the bank account from which you will make your investments into AngelHub campaigns. Please note that the name on the account much match your identity document and the bank should be an HKMA or equivalent licensed institution."

    return (
      <div className={optClass}>
        <form className="clearfix" onSubmit={handleSubmit}>
          <div className="margin-bottom-20">
            <span className="help-block hint">{hint}</span>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <Field
                name="name"
                component={TextField}
                opts={{
                  type: "text",
                  label: "Name",
                  placeholder: "Adam Chan"
                }}
              />
            </div>
            <div className="col-xs-12 col-sm-6">
              <Field
                name="account_number"
                component={TextField}
                opts={{
                  type: "text",
                  label: "Account Number",
                  placeholder: "123456789"
                }}
              />
            </div>
          </div>

          <Field
            name="address"
            component={TextField}
            opts={{
              label: "Address"
            }}
          />

          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <Field
                name="country"
                component={SelectField}
                opts={{
                  label: "Country",
                  placeholder: "Hong Kong",
                  options: COUNTRIES,
                  valueField: "name",
                  textField: "name",
                }}
              />
            </div>
          </div>

          <button
            className={`btn btn-primary btn-outline pull-right ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >{pristine ? "Continue" : "Save & Continue"}</button>
        </form>
      </div>
    )
  }
}
