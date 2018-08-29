import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import Validators from '../../../services/form-validators'

import RadioField from '../../shared/form-elements/radio-field'
import StaticField from '../../shared/form-elements/static-field'
import TextField from '../../shared/form-elements/text-field'
import MultiselectField from '../../shared/form-elements/multiselect-field'

const mapStateToProps = (state) => {
  return {
    formData: _.get(state.form, 'InvestorValidationsSuitabilityFinanceForm')
  }
}

@connect(mapStateToProps, null)
@reduxForm({
  form: "InvestorValidationsSuitabilityFinanceForm",
  validate: (values) => {
    return Validators({
      investor_source_of_funds: [{ type: "amount", opts: { min: 1 } }],
      income_covers_expense: ["presences"],
      years_until_retirement: ["presences"]
    }, values)
  },
  enableReinitialize: true
})
export default class InvestorValidationsSuitabilityFinanceForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, investorQOptions, investorFOptions, dAttribute, pristine, formData } = this.props

    const cannotCoverExpenses = _.get(formData, "values.income_covers_expense", null) === "can_not_cover_expense"

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <StaticField
            headerNoMargin
            noMargin
            label="1. Please identify the Source of Funds which you will be investing"
            fields={[
              {
                name: "investor_source_of_funds",
                component: MultiselectField,
                opts: {
                  options: investorFOptions.map((p) => {
                    return { detail: p.name }
                  }),
                  valueField: "detail",
                  textField: "detail",
                  placeholder: "Select or type create your own",
                  onDeleteField: dAttribute
                }
              }
            ]}
          />

          <StaticField
            noMargin
            label="2. Current Action Net Income"
            fields={[
              {
                name: "income_covers_expense",
                component: RadioField,
                opts: {
                  optClass: cannotCoverExpenses && "margin-0",
                  label: "Does your current liquid portfolio plus regular income generally cover all your current and future existing liabilities?",
                  options: _.get(investorQOptions, 'income_covers_expenses', []),
                  valueKey: "id",
                  nameKey: "name"
                },
              },
              {
                name: "income_covers_expense_reason",
                component: TextField,
                opts: {
                  optClass: !cannotCoverExpenses && "hide",
                  placeholder: "If not, you should consider further advice on the suitability to this investment"
                }
              },
              {
                name: "years_until_retirement",
                component: TextField,
                opts: {
                  type: "number",
                  label: "How many years do you expect until retirement age is reached of ultimate beneficiary?"
                }
              }
            ]}
          />

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
