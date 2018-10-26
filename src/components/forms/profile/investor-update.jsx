import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, getFormValues } from 'redux-form'

import Validators from '../../../services/form-validators'
import { COUNTRIES } from '../../../services/constants'

import TextField from '../../shared/form-elements/text-field'
import SelectField from '../../shared/form-elements/select-field'
import DateTimePickerField from '../../shared/form-elements/datetime-picker'

const mapStateToProps = (state) => {
  return {
    values: getFormValues('ProfileInvestorUpdateForm')(state)
  }
}

@reduxForm({
  form: "ProfileInvestorUpdateForm",
  validate: (values) => {
    return Validators({
      national_id: ["presences"],
      nationality: ["presences"],
      country_of_residence: ['presences'],
      dob: ["presences"]
    }, values)
  }
})
@connect(mapStateToProps, null)
export default class ProfileInvestorUpdateForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, values } = this.props

    const residency = _.get(values, 'country_of_residence')
    const nationality = _.get(values, 'nationality')

    const isHKResidency = residency === "Hong Kong" || residency === null
    const isHKNationality = nationality === "Hong Kong" || nationality === null

    const showSFCMsg = !isHKResidency || !isHKNationality

    return (
      <div id="forms-auth-signup-investor-create" className={optClass}>
        <h1 className="form-title fw-500">Join us as an investor</h1>

        <form onSubmit={handleSubmit} className="clearfix">
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
            </div>
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

        {
          showSFCMsg && (
            <div className="margin-top-20 clearfix">
              <p>Please note that AngelHub is a Hong Kong Securities and Futures Commission (SFC) Licensed (Application in Principal) entity that provides services to Professional Investors (PIs), as defined by the SFC.  If you are not a Hong Kong resident and/or hold a non-Hong Kong passport, we will still require that you qualify under the SFC PI guidelines, which we will assess through our onboarding process.</p>

              <p>Please further note that, as a non-Hong Kong resident, you must also ensure that you meet the equivalent PI qualification specific to the jurisdiction in which your are a resident, and, where applicable and required, the jurisdiction of your citizenship.  This is fully your responsibility and AngelHub accepts no liability should you fail to do so.  In addition, should AngelHub for any reason believe that you have not met the above qualifications, we will immediately disqualify you from the platform and divest you of any investments made through the platform.</p>

              <p>Should you have any questions regarding this matter, please contact us at info@angelhub.io.</p>
            </div>
          )
        }

      </div>
    )
  }
}
