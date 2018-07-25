import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { connect } from 'react-redux'

import Validators from '../../../../services/form-validators'
import { COUNTRIES } from '../../../../services/constants'

import TextField from '../../../shared/form-elements/text-field'
import SelectField from '../../../shared/form-elements/select-field'
import MultiselectField from '../../../shared/form-elements/multiselect-field'
import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import FileDropField from '../../../shared/form-elements/file-drop-field'

const mapStateToProps = (state) => {
  return {
    formData: _.get(state.form, 'MyStartupQuestionnairesBasicNewForm')
  }
}

@connect(mapStateToProps, null)
@reduxForm({
  form: "MyStartupQuestionnairesBasicNewForm",
  validate: (values) => {
    return Validators({
      company_name: ["presences"],
      tagline: [{ type: "length", opts: { max: 140 } }],
      hashtags: [{ type: "amount", opts: { max: 5 } }],
      attachments: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
          childFields: {
            title: ["presences"],
            file: ["filePresences"]
          }
        }
      }]
    }, values, ["attachments"])
  },
  enableReinitialize: true
})
export default class MyStartupQuestionnairesBasicNewForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      questionOrder: [
        {
          title: "company name",
          key: "company_name"
        },
        {
          title: "founded year",
          key: "founded_year"
        },
        {
          title: "country of incorporation",
          key: "country_of_incorporation"
        },
        {
          title: "tagline",
          key: "tagline",
          hint: "A crisp definition of your Company"
        },
        {
          title: "hashtags",
          key: "hashtags",
          hint: "Give us up to 5 hashtags that best describe your solution, technology or add to the buzz"
        },
        {
          title: "visual identity",
          key: "attachments"
        }
      ],
      currentQuestionIndex: 0,
      maxIndex: 5,
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

    const { title, hint, key } = questionOrder[currentQuestionIndex]

    const currentQuestionHasValue = _.get(formData, `values[${key}]`)

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

          <FieldArray
            name="attachments"
            component={FileDropField}
            opts={{
              optClass: currentQuestionIndex !== 5 && `${hideable} ${animateable}`,
              selectOpts: {
                options: [
                  {
                    id: "logo",
                    name: "Company Logo",
                    section: "startup_questionnaire_basic"
                  },
                  {
                    id: "banner",
                    name: "Banner",
                    section: "startup_questionnaire_basic"
                  },
                ],
                valueField: 'id',
                textField: 'name',
                placeholder: 'Select a Title'
              }
            }}
          />

          {
            !isFirst && (
              <button
                className="btn btn-default pull-left border-none"
                type="button"
                disabled={submitInProcess || isFirst}
                onClick={() => { this.changeQuestion(currentQuestionIndex - 1) }}
              ><i className="fa fas fa-long-arrow-alt-left fa-2x text-danger" /></button>
            )
          }

          {
            !isLast && (
              <button
                className="btn btn-default pull-right border-none"
                type="button"
                disabled={submitInProcess || !currentQuestionHasValue}
                onClick={() => { this.changeQuestion(currentQuestionIndex + 1) }}
              ><i className="fa fas fa-long-arrow-alt-right fa-2x text-danger" /></button>
            )
          }

          {
            isLast && (
              <button
                className={`btn btn-danger pull-right ${submitInProcess && "m-progress"}`}
                type="submit"
                disabled={submitInProcess || pristine || !currentQuestionHasValue}
              >SAVE</button>
            )
          }
        </form>
      </div>
    )
  }
}
