import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import Validators from '../../../services/form-validators'

import StaticField from '../../shared/form-elements/static-field'
import SelectField from '../../shared/form-elements/select-field'
import MultiselectField from '../../shared/form-elements/multiselect-field'
import TextField from '../../shared/form-elements/text-field'

const mapStateToProps = (state) => {
  return {
    formData: _.get(state.form, 'InvestorValidationsSuitabilityExperienceForm')
  }
}

@connect(mapStateToProps, null)
@reduxForm({
  form: "InvestorValidationsSuitabilityExperienceForm",
  validate: (values) => {
    return Validators({
      occupation: ["presences"],
      occupation_industry: ["presences"],
      years_of_experience: ["presences"],
      investor_type_of_products: [{ type: "amount", opts: { min: 1 } }],
      scale: ["presences"],
      frequency: ["presences"]
    }, values)
  },
  enableReinitialize: true
})
export default class InvestorValidationsSuitabilityExperienceForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, investorQOptions, investorPOptions, dAttribute, pristine } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <StaticField
            noMargin
            label="1. Occupation"
            fields={[
              {
                name: "occupation",
                component: TextField,
                opts: {
                  label: "What is your occupation?",
                  placeholder: "Current or Last"
                }
              },
              {
                name: "occupation_industry",
                component: SelectField,
                opts: {
                  options: _.get(investorQOptions, 'occupation_industries', []),
                  valueField: "id",
                  textField: "name",
                  groupBy: (option) => {
                    return option.group.splitCap("_")
                  },
                  label: "What is the industry?",
                  placeholder: "Select the industry",
                }
              }
            ]}
          />

          <StaticField
            noMargin
            label="2. Investment"
            fields={[
              {
                name: "years_of_experience",
                component: SelectField,
                opts: {
                  options: _.get(investorQOptions, 'years_of_experiences', []),
                  valueField: "id",
                  textField: "name",
                  label: "What is your investment years of experience?",
                  placeholder: "Select year range"
                }
              },
              {
                name: "investor_type_of_products",
                component: MultiselectField,
                opts: {
                  options: investorPOptions.map((p) => {
                    return { detail: p.name }
                  }),
                  valueField: "detail",
                  textField: "detail",
                  label: "Types of product(s) previously invested in",
                  placeholder: "Type to filter or create your own",
                  onDeleteField: dAttribute
                }
              },
              {
                injectTitle: "Provide details of frequency and size of trading"
              },
              {
                name: "scale",
                component: TextField,
                opts: {
                  optClass: "col-xs-12 col-sm-6 margin-left-n-15",
                  type: "number",
                  placeholder: "Average size of trade in USD"
                }
              },
              {
                name: "frequency",
                component: SelectField,
                opts: {
                  optClass: "col-xs-12 col-sm-6 margin-right-n-15",
                  options: _.get(investorQOptions, 'frequencies', []),
                  valueField: "id",
                  textField: "name",
                  placeholder: "Select frequency"
                }
              }
            ]}
          />

          <button
            className={`btn btn-primary text-uppercase pull-right ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >{pristine ? "Continue" : "Save & Continue"}</button>
        </form>
      </div>
    )
  }
}
