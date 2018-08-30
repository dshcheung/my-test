import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import Validators from '../../../services/form-validators'

import RadioField from '../../shared/form-elements/radio-field'
import SharedOthersStepProgress from '../../shared/others/step-progress'

const mapStateToProps = (state) => {
  return {
    formData: _.get(state.form, 'InvestorValidationsDummyTestForm')
  }
}

@connect(mapStateToProps, null)
@reduxForm({
  form: "InvestorValidationsDummyTestForm",
  validate: (values, props) => {
    const toValidate = {}
    props.dummyTest.forEach((d, i) => {
      toValidate[`q${i}`] = ["presences"]
    })
    return Validators(toValidate, values)
  },
  enableReinitialize: true
})
export default class InvestorValidationsDummyTestForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentQuestionIndex: 0,
      maxIndex: props.dummyTest.length - 1,
      animateClass: "fadeInRight",
    }
  }

  changeQuestion(index) {
    const animateClass = this.state.currentQuestionIndex < index ? "fadeInRight" : "fadeInLeft"
    this.setState({ currentQuestionIndex: index, animateClass })
  }

  render() {
    const { handleSubmit, submitInProcess, optClass, pristine, formData, dummyTest } = this.props
    const { currentQuestionIndex, maxIndex, animateClass } = this.state

    const isFirst = currentQuestionIndex === 0
    const isLast = currentQuestionIndex === maxIndex
    const hideable = "hide"
    const animateable = `${animateClass} animated`

    const currentQuestionHasValue = _.get(formData, `values[q${currentQuestionIndex}]`)
    const currentQuestionHasError = _.get(formData, `syncErrors[q${currentQuestionIndex}]`)

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <h1 className="form-title fw-500 margin-bottom-20">risk assessment</h1>
          <div className="help-text margin-bottom-50">
            As an SFC licensed firm, we are required to assess the risk appetite of all of our potential members, so please take the time to complete the following questionnaire. Thank you.
          </div>

          <div className="row margin-bottom-40">
            <div className="col-sm-12 col-md-8 col-md-offset-2 px-0">
              <SharedOthersStepProgress
                maxIndex={maxIndex}
                currentIndex={currentQuestionIndex}
              />
            </div>
          </div>

          {
            dummyTest.map((d, i) => {
              return (
                <Field
                  key={i}
                  name={`q${i}`}
                  component={RadioField}
                  opts={{
                    optClass: currentQuestionIndex !== i && `${hideable} ${animateable}`,
                    optionNameIsDangerous: true,
                    options: d.options,
                    valueKey: (x) => {
                      return Object.keys(x)[0]
                    },
                    nameKey: (x) => {
                      return x[Object.keys(x)[0]]
                    },
                    label: d.title,
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
                className={`btn btn-primary btn-outline text-uppercase pull-right ${submitInProcess && "m-progress"}`}
                type="submit"
                disabled={submitInProcess || pristine || !currentQuestionHasValue || currentQuestionHasError}
              >Continue</button>
            )
          }
        </form>
      </div>
    )
  }
}
