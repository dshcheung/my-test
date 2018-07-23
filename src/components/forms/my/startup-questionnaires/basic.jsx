import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../../services/form-validators'
import { COUNTRIES } from '../../../../constants'

import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import TextField from '../../../shared/form-elements/text-field'
import SelectField from '../../../shared/form-elements/select-field'
import ImageField from '../../../shared/form-elements/image-field'
import MultiselectField from '../../../shared/form-elements/multiselect-field'

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
        "company_name",
        "founded_year",
        "country_of_incorporation",
        "tagline",
        "hashtags",
        "logo",
        "banner",
      ],
      currentQuestionIndex: 0,
      maxIndex: 6,
      animateClass: "fadeInRight"
    }
  }

  changeQuestion(index) {
    const animateClass = this.state.currentQuestionIndex < index ? "fadeInRight" : "fadeInLeft"
    this.setState({ currentQuestionIndex: index, animateClass })
  }

  render() {
    const { handleSubmit, submitInProcess, optClass, pristine, newMode } = this.props
    const { currentQuestionIndex, maxIndex, animateClass } = this.state

    const isFirst = currentQuestionIndex === 0
    const isLast = currentQuestionIndex === maxIndex
    const hideable = newMode && "hide"
    const animateable = newMode && `${animateClass} animated`

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="company_name"
            component={TextField}
            opts={{
              optClass: currentQuestionIndex !== 0 && `${hideable} ${animateable}`,
              label: "Company name",
              type: "text"
            }}
          />

          <Field
            name="founded_year"
            component={DateTimePicker}
            opts={{
              optClass: currentQuestionIndex !== 1 && `${hideable} ${animateable}`,
              label: "Founded year",
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
              valueKey: "name",
              nameKey: "name",
              label: "Country of incorporation",
              placeholder: "Select a country"
            }}
          />

          <Field
            name="vertical"
            component={SelectField}
            opts={{
              options: [
                { id: 0, name: "Need" },
                { id: 1, name: "Input" },
              ],
              valueKey: "id",
              nameKey: "name",
              label: "Vertical",
            }}
          />

          <Field
            name="tagline"
            component={TextField}
            opts={{
              optClass: currentQuestionIndex !== 3 && `${hideable} ${animateable}`,
              type: "text",
              label: "Tagline",
              hint: "A crisp definition of your Company"
            }}
          />

          <Field
            name="hashtags"
            component={MultiselectField}
            opts={{
              optClass: currentQuestionIndex !== 4 && `${hideable} ${animateable}`,
              label: "Hashtags",
              hint: "Give us up to 5 hashtags that best describe your solution, technology or add to the buzz",
              options: [
                { tag: "Need" },
                { tag: "Input" }
              ],
              valueField: 'tag',
              textField: 'tag'
            }}
          />

          <Field
            name="logo"
            component={ImageField}
            opts={{
              title: "Logo",
              urlKey: "original",
              optClass: `image-field-avatar ${currentQuestionIndex !== 5 && `${hideable} ${animateable}`}`
            }}
          />

          <Field
            name="banner"
            component={ImageField}
            opts={{
              title: "Visual Identity (optional)",
              urlKey: "original",
              optClass: `image-field-banner ${currentQuestionIndex !== 6 && `${hideable} ${animateable}`}`,
              hint: "Banner"
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
