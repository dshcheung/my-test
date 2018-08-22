import React, { Component } from 'react'
import { reduxForm, FieldArray } from 'redux-form'
import { connect } from 'react-redux'

import { scrollTop } from '../../../services/utils'
import Validators from '../../../services/form-validators'

import RadioField from '../../shared/form-elements/radio-field'
import StaticField from '../../shared/form-elements/static-field'
import SelectField from '../../shared/form-elements/select-field'
import MultiselectField from '../../shared/form-elements/multiselect-field'
import TextField from '../../shared/form-elements/text-field'
import FileDropField from '../../shared/form-elements/file-drop-field'

const mapStateToProps = (state) => {
  return {
    formData: _.get(state.form, 'InvestorValidationsSuitabilityTestForm')
  }
}

@connect(mapStateToProps, null)
@reduxForm({
  form: "InvestorValidationsSuitabilityTestForm",
  validate: (values) => {
    return Validators({
    }, values)
  },
  enableReinitialize: true
})
export default class InvestorValidationsSuitabilityTestForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      order: [
        "finance",
        "experience",
        "documents",
        "suitability assessment"
      ],
      currentSectionIndex: 0,
      maxSectionIndex: 2
    }

    this.onContinueClick = this.onContinueClick.bind(this)
  }

  onContinueClick() {
    scrollTop()
    this.setState({ currentSectionIndex: this.state.currentSectionIndex + 1 })
  }

  render() {
    const { handleSubmit, submitInProcess, optClass, pristine, investorQOptions } = this.props

    const { currentSectionIndex, order } = this.state

    const currentTitle = order[currentSectionIndex]
    const hideable = "hide"

    // todo change to currentForm
    // const currentFormSectionHasValue = _.get(formData, `values[q${currentSectionIndex}]`)
    // const currentFormSectionHasError = _.get(formData, `syncErrors[q${currentSectionIndex}]`)
    const currentFormSectionHasValue = true
    const currentFormSectionHasError = false

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <h1 className="form-title fw-500">{currentTitle}</h1>

          <div className={currentSectionIndex !== 0 && hideable}>
            <StaticField
              label="1. Current Action Net Income"
              fields={[
                {
                  name: "income_covers_expense",
                  component: RadioField,
                  opts: {
                    optClass: "margin-0",
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
          </div>

          <div className={currentSectionIndex !== 1 && hideable}>
            <StaticField
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
                    label: "What is the industry?",
                    placeholder: "Select the industry"
                  }
                }
              ]}
            />

            <StaticField
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
                  name: "type_of_product",
                  component: MultiselectField,
                  opts: {
                    optClass: "margin-0",
                    options: _.get(investorQOptions, 'type_of_products', []),
                    valueField: "id",
                    textField: "name",
                    label: "Types of product(s) previously invested in",
                    placeholder: "Select products"
                  }
                },
                {
                  name: "type_of_product_detail",
                  component: TextField,
                  opts: {
                    placeholder: "If others, please provide details"
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
                    placeholder: "Average size of trade"
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
          </div>

          <div className={currentSectionIndex !== 2 && hideable}>
            <FieldArray
              name="attachments"
              component={FileDropField}
              opts={{
                onDeleteField: (value, objKey, cb) => {
                  if (cb) cb()
                },
                maxFields: 2,
                selectOpts: {
                  options: [
                    { name: "Financial Statement" },
                    { name: "cLp Bill" }
                  ],
                  valueField: 'name',
                  textField: 'name',
                  placeholder: 'Select a Title',
                  filter: true,
                  uniq: true
                }
              }}
            />
          </div>

          <button
            className={`btn btn-danger pull-right ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess || pristine || !currentFormSectionHasValue || currentFormSectionHasError}
          >Continue</button>
        </form>
      </div>
    )
  }
}
