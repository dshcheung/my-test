import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'
import { COUNTRIES } from '../../../../services/constants'

import TextField from '../../../shared/form-elements/text-field'
import SelectField from '../../../shared/form-elements/select-field'
import MultiselectField from '../../../shared/form-elements/multiselect-field'
import DateTimePicker from '../../../shared/form-elements/datetime-picker'
// import ImageField from '../../../shared/form-elements/image-field'

@reduxForm({
  form: "MyStartupQuestionnairesBasicForm",
  validate: (values) => {
    return Validators({
      company_name: ["presences"],
      tagline: [{ type: "length", opts: { max: 140 } }],
      hashtags: [{ type: "amount", opts: { max: 5 } }]
    }, values)
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnairesBasicForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      questionOrder: [
        {
          title: "company name"
        },
        {
          title: "founded year"
        },
        {
          title: "country of incorporation"
        },
        {
          title: "tagline",
          hint: "A crisp definition of your Company"
        },
        {
          title: "hashtags",
          hint: "Give us up to 5 hashtags that best describe your solution, technology or add to the buzz"
        }
      ],
      currentQuestionIndex: 1,
      maxIndex: 4,
      animateClass: "fadeInRight"
    }
  }

  changeQuestion(index) {
    const animateClass = this.state.currentQuestionIndex < index ? "fadeInRight" : "fadeInLeft"
    this.setState({ currentQuestionIndex: index, animateClass })
  }

  render() {
    const { handleSubmit, submitInProcess, optClass, pristine } = this.props
    const { currentQuestionIndex, maxIndex, animateClass, questionOrder } = this.state

    const isFirst = currentQuestionIndex === 0
    const isLast = currentQuestionIndex === maxIndex
    const hideable = "hide"
    const animateable = `${animateClass} animated`

    const { title, hint } = questionOrder[currentQuestionIndex]

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <h1 className={`form-title ${hint && "margin-0"}`}>{title}</h1>
          <div className="help-text margin-bottom-20">{hint}</div>

          <Field
            name="company_name"
            component={TextField}
            opts={{
              optClass: currentQuestionIndex !== 0 && `${hideable} ${animateable}`,
              placeholder: "Name"
            }}
          />

          <Field
            name="founded_year"
            component={DateTimePicker}
            opts={{
              optClass: currentQuestionIndex !== 1 && `${hideable} ${animateable}`,
              label: "Founded year",
              placeholder: "Select the year",
              time: false,
              format: "YYYY",
              views: ["decade"]
            }}
          />

          <Field
            name="country_of_incorporation"
            component={SelectField}
            opts={{
              optClass: currentQuestionIndex !== 2 && `${hideable} ${animateable}`,
              options: COUNTRIES,
              valueField: "name",
              textField: "name",
              placeholder: "Select a country"
            }}
          />

          <Field
            name="tagline"
            component={TextField}
            opts={{
              optClass: currentQuestionIndex !== 3 && `${hideable} ${animateable}`,
              placeholder: "Tagline"
            }}
          />

          <Field
            name="hashtags"
            component={MultiselectField}
            opts={{
              optClass: currentQuestionIndex !== 4 && `${hideable} ${animateable}`,
              placeholder: "Hashtags",
              options: [
                { tag: "Need" },
                { tag: "Input" }
              ],
              valueField: 'tag',
              textField: 'tag'
            }}
          />

          <div className="btn-group btn-group-justified back-and-save-btn">
            <button
              className="btn btn-default"
              type="button"
              disabled={submitInProcess || isFirst}
              onClick={() => { this.changeQuestion(currentQuestionIndex - 1) }}
            >Back</button>

            {
              !isLast && (
                <button
                  className="btn btn-danger"
                  type="button"
                  disabled={submitInProcess}
                  onClick={() => { this.changeQuestion(currentQuestionIndex + 1) }}
                >next</button>
              )
            }

            {
              isLast && (
                <button
                  className={`btn btn-danger ${submitInProcess && "m-progress"}`}
                  type="submit"
                  disabled={submitInProcess || pristine}
                >Save</button>
              )
            }
          </div>
        </form>
      </div>
    )
  }
}
