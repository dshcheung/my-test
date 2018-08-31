import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import Validators from '../../../services/form-validators'

import RadioField from '../../shared/form-elements/radio-field'
import SharedOthersStepProgress from '../../shared/others/step-progress'

const mapStateToProps = (state) => {
  return {
    formData: _.get(state.form, 'InvestorValidationsSuitabilityAssessmentForm')
  }
}

@connect(mapStateToProps, null)
@reduxForm({
  form: "InvestorValidationsSuitabilityAssessmentForm",
  validate: (values) => {
    return Validators({
      portfolio_value: ["presences"],
      education_level: ["presences"],
      employment_status: ["presences"],
      monthly_income: ["presences"],
      dependents: ["presences"],
      private_equity_experience: ["presences"],
      previous_investments: ["presences"],
      previous_investment_amount: ["presences"]
    }, values)
  },
  enableReinitialize: true
})
export default class InvestorValidationsSuitabilityAssessmentForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      questionOrder: [
        {
          key: "portfolio_value",
          options: [
            { name: "At least HKD 8 Million but not more than HKD 12 Million" },
            { name: "At least HKD 12 Million but not more than HKD 20 Million" },
            { name: "At least HKD 20 Million but not more than HKD 50 Million" },
            { name: "At least HKD 50 Million or more" }
          ],
          label: "What is your the value in Hong Kong Dollars of your investment portfolio consisting of securities, certificates of deposit or money held by a custodian but excluding any real property?"
        },
        {
          key: "education_level",
          options: [
            { name: "Primary" },
            { name: "Secondary" },
            { name: "Post Secondary" },
            { name: "University or above" }
          ],
          label: "What is your education level?"
        },
        {
          key: "employment_status",
          options: [
            { name: "Unemployed or Retired with no income" },
            { name: "Unemployed or Retired with income" },
            { name: "Employed Part Time" },
            { name: "Employed Full Time" }
          ],
          label: "What is your employment status?"
        },
        {
          key: "monthly_income",
          options: [
            { name: "HKD 0 - 50,000" },
            { name: "HKD 50,001 - 100,000" },
            { name: "HKD 100,001 - 200,00" },
            { name: "HKD 200,001+" }
          ],
          label: "What is your current monthly income?"
        },
        {
          key: "dependents",
          options: [
            { name: "6+" },
            { name: "4-6" },
            { name: "1-3" },
            { name: "0" }
          ],
          label: "Apart from yourself, how many dependents (children, parents, siblings, or otherwise) do you support?"
        },
        {
          key: "private_equity_experience",
          options: [
            { name: "None" },
            { name: "Less than 1 Year" },
            { name: "1 - 3 Years" },
            { name: "3+ Years" }
          ],
          label: "What is your experience with investing in Private Equity Investments?"
        },
        {
          key: "previous_investments",
          options: [
            { name: "Not sure" },
            { name: "Fund that included some private equity investments" },
            { name: "Private equity fund" },
            { name: "Private company directly" }
          ],
          label: "What have you invested in previously?"
        },
        {
          key: "previous_investment_amount",
          options: [
            { name: "< HK $1,000,000" },
            { name: "HK $1,000,001 - HK $5,000,000" },
            { name: "HK $5,000,000 - HK $10,000,000" },
            { name: "> HK $10,000,001" }
          ],
          label: "How much have you previously invested?"
        }
      ],
      currentQuestionIndex: 0,
      maxIndex: 7,
      animateClass: "fadeInRight"
    }
  }

  changeQuestion(index) {
    const animateClass = this.state.currentQuestionIndex < index ? "fadeInRight" : "fadeInLeft"
    this.setState({ currentQuestionIndex: index, animateClass })
  }

  render() {
    const { handleSubmit, submitInProcess, optClass, pristine, formData } = this.props
    const { currentQuestionIndex, maxIndex, animateClass, questionOrder } = this.state

    const isFirst = currentQuestionIndex === 0
    const isLast = currentQuestionIndex === maxIndex
    const hideable = "hide"
    const animateable = `${animateClass} animated`

    const { key } = questionOrder[currentQuestionIndex]

    const currentQuestionHasValue = _.get(formData, `values.${key}`)
    const currentQuestionHasError = _.get(formData, `syncErrors.${key}`)

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-12 col-md-8 col-md-offset-2 px-0">
              <SharedOthersStepProgress
                maxIndex={maxIndex}
                currentIndex={currentQuestionIndex}
              />
            </div>
          </div>

          {
            questionOrder.map((q, i) => {
              return (
                <Field
                  key={i}
                  name={q.key}
                  component={RadioField}
                  opts={{
                    optClass: currentQuestionIndex !== i && `${hideable} ${animateable}`,
                    options: q.options,
                    valueKey: "name",
                    nameKey: "name",
                    label: q.label,
                    boldLabel: true
                  }}
                />
              )
            })
          }

          {
            !isFirst && (
              <button
                className="btn btn-default pull-left border-none"
                type="button"
                disabled={submitInProcess || isFirst}
                onClick={() => { this.changeQuestion(currentQuestionIndex - 1) }}
              ><i className="ahub-arrow flip-horizontal text-gold" /></button>
            )
          }

          {
            !isLast && (
              <button
                className="btn btn-default pull-right border-none"
                type="button"
                disabled={submitInProcess || !currentQuestionHasValue || currentQuestionHasError}
                onClick={() => { this.changeQuestion(currentQuestionIndex + 1) }}
              ><i className="ahub-arrow text-gold" /></button>
            )
          }

          {
            isLast && (
              <button
                className={`btn btn-primary pull-right ${submitInProcess && "m-progress"}`}
                type="submit"
                disabled={submitInProcess || pristine || !currentQuestionHasValue || currentQuestionHasError}
              >SAVE</button>
            )
          }
        </form>
      </div>
    )
  }
}
