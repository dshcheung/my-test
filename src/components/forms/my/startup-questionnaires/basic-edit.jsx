import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, FieldArray } from 'redux-form'

import {
  uMyStartupQuestionnaire
} from '../../../../actions/my/startup-questionnaires'

import Validators from '../../../../services/form-validators'
import { COUNTRIES } from '../../../../services/constants'

import TextField from '../../../shared/form-elements/text-field'
import SelectField from '../../../shared/form-elements/select-field'
import MultiselectField from '../../../shared/form-elements/multiselect-field'
import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'
import FileField from '../../../shared/form-elements/file-field'

const mapDispatchToProps = (dispatch) => {
  return {
    uMyStartupQuestionnaire: bindActionCreators(uMyStartupQuestionnaire, dispatch),
  }
}

@connect(null, mapDispatchToProps)
@reduxForm({
  form: "MyStartupQuestionnairesBasicEditForm",
  validate: (values, props) => {
    if (props.highlightErrors) {
      return Validators({
        company_name: ["presences"],
        founded_year: ["presences"],
        country_of_incorporation: ["presences"],
        tagline: ["presences", { type: "length", opts: { max: 140 } }],
        startup_questionnaire_hashtags: [{ type: "amount", opts: { min: 1, max: 5 } }],
        attachments: [{
          type: "complexArrOfObj",
          opts: {
            selfPresences: true,
            selfMin: 2,
            selfMax: 2,
            uniqFields: ["title"],
            childFields: {
              title: ["presences"],
              file: ["filePresences"]
            }
          }
        }]
      }, values, ["attachments"])
    } else {
      return Validators({
        company_name: ["presences"],
        tagline: [{ type: "length", opts: { max: 140 } }],
        startup_questionnaire_hashtags: [{ type: "amount", opts: { max: 5 } }],
        attachments: [{
          type: "complexArrOfObj",
          opts: {
            selfPresences: false,
            selfMax: 2,
            uniqFields: ["title"],
            childFields: {
              title: ["presences"],
              file: ["filePresences"]
            }
          }
        }]
      }, values, ["attachments"])
    }
  },
  enableReinitialize: true
})
export default class MyStartupQuestionnairesBasicEditForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes, pristine } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="company_name"
            component={TextField}
            opts={{
              showErrors: true,
              placeholder: "Name",
              label: "1. Company Name"
            }}
          />

          <Field
            name="founded_year"
            component={DateTimePicker}
            opts={{
              showErrors: true,
              placeholder: "Select the year",
              label: "2. Founded Year",
              time: false,
              format: "YYYY",
              views: ["decade"],
              max: moment().toDate()
            }}
          />

          <Field
            name="country_of_incorporation"
            component={SelectField}
            opts={{
              showErrors: true,
              options: COUNTRIES,
              valueField: "name",
              textField: "name",
              label: "3. Country of Incorporation",
              placeholder: "Select a country"
            }}
          />

          <Field
            name="tagline"
            component={TextField}
            opts={{
              showErrors: true,
              label: "4. Tagline",
              placeholder: "Tagline",
              validationHint: "Max 140 Characters"
            }}
          />

          <Field
            name="startup_questionnaire_hashtags"
            component={MultiselectField}
            opts={{
              showErrors: true,
              label: "5. Verticals & Technologies",
              placeholder: "Type to filter or create your own",
              validationHint: "Max 5 Tags",
              options: this.props.hashtagOptions.map((h) => {
                return { tag: h.name }
              }),
              valueField: 'tag',
              textField: 'tag',
              onDeleteField: dMSQAttributes,
              TagItem: ({ item }) => {
                return <span>#{item.tag}</span>
              },
              max: 5
            }}
          />

          <FieldArray
            name="attachments"
            component={DynamicFieldArray}
            opts={{
              showErrors: true,
              label: "6. Visual Identity",
              groupName: "File",
              newFieldInit: {
                title: '',
                file: ''
              },
              maxFields: 2,
              hint: "Company Logo and Banner",
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "title",
                  component: SelectField,
                  opts: {
                    showErrors: true,
                    label: "Title",
                    options: [
                      { name: "Company Logo" },
                      { name: "Visual Identity (Banner)" }
                    ],
                    valueField: "name",
                    textField: "name",
                    filter: true,
                    uniq: true
                  }
                },
                {
                  key: "file",
                  component: FileField,
                  opts: {
                    showErrors: true,
                    label: "File",
                    urlKey: "original"
                  }
                }
              ]
            }}
          />

          <button
            className={`btn btn-primary pull-right ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess || pristine}
          >CONTINUE</button>
        </form>
      </div>
    )
  }
}
