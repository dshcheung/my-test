import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'
import TextRTE from '../../../shared/form-elements/text-rte'
import SelectField from '../../../shared/form-elements/select-field'
import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import FileField from '../../../shared/form-elements/file-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'

@reduxForm({
  form: "MyStartupQuestionnairesMarketForm",
  validate: (values, props) => {
    if (props.highlightErrors) {
      return Validators({
        global_market: ["presences"],
        target_market: ["presences"],
        barriers_to_entry: ["presences", { type: "lengthWord", opts: { max: 200 } }],
        traction: ["presences", { type: "lengthWord", opts: { max: 200 } }],
        competition_landscape: ["presences", { type: "lengthWord", opts: { max: 200 } }],
        startup_questionnaire_competitors: [{
          type: "complexArrOfObj",
          opts: {
            selfPresences: true,
            childFields: {
              name: ["presences"],
              website: ["presences", "httpLink"],
              solution_benchmark: ["presences", { type: "lengthWord", opts: { max: 200 } }]
            }
          }
        }],
        startup_questionnaire_go_to_market_strategies: [{
          type: "complexArrOfObj",
          opts: {
            selfPresences: true,
            childFields: {
              occurs_on: ["presences"],
              action: ["presences", { type: "lengthWord", opts: { max: 40 } }]
            }
          }
        }],
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
      }, values, [
        "startup_questionnaire_competitors",
        "startup_questionnaire_go_to_market_strategies",
        "attachments"
      ])
    } else {
      return Validators({
        barriers_to_entry: [{ type: "lengthWord", opts: { max: 200 } }],
        traction: [{ type: "lengthWord", opts: { max: 200 } }],
        competition_landscape: [{ type: "lengthWord", opts: { max: 200 } }],
        startup_questionnaire_competitors: [{
          type: "complexArrOfObj",
          opts: {
            selfPresences: false,
            childFields: {
              name: ["presences"],
              website: ["presences", "httpLink"],
              solution_benchmark: ["presences", { type: "lengthWord", opts: { max: 200 } }]
            }
          }
        }],
        startup_questionnaire_go_to_market_strategies: [{
          type: "complexArrOfObj",
          opts: {
            selfPresences: false,
            childFields: {
              occurs_on: ["presences"],
              action: ["presences", { type: "lengthWord", opts: { max: 40 } }]
            }
          }
        }],
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
      }, values, [
        "startup_questionnaire_competitors",
        "startup_questionnaire_go_to_market_strategies",
        "attachments"
      ])
    }
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnairesMarketForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes, pristine } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="global_market"
            component={TextRTE}
            opts={{
              showErrors: true,
              label: "1. Global market",
              hint: "Worldwide, or any global reference point that is the market you could address eventually, after scaling up. Please provide basic metrics for this market; size and growth rate."
            }}
          />

          <Field
            name="target_market"
            component={TextRTE}
            opts={{
              showErrors: true,
              label: "2. Targeted market (your customers)",
              hint: "Your entry market that you are targeting in the coming months. Remember that its definition should give us a precise description of your targeted customer. Please provide basic metrics for this market; size and growth rate"
            }}
          />

          <Field
            name="traction"
            component={TextRTE}
            opts={{
              showErrors: true,
              label: "3. Traction",
              validationHint: "Max 200 Words",
              hint: "Users and/or validated feedback"
            }}
          />

          <Field
            name="barriers_to_entry"
            component={TextRTE}
            opts={{
              showErrors: true,
              label: "4. Barriers to entry",
              validationHint: "Max 200 Words",
              hint: "Main reasons why a company will find it difficult to conquer your customers when entering your market"
            }}
          />

          <Field
            name="competition_landscape"
            component={TextRTE}
            opts={{
              showErrors: true,
              label: "5. Describe your competition landscape",
              validationHint: "Max 200 Words"
            }}
          />

          <FieldArray
            name="startup_questionnaire_competitors"
            component={DynamicFieldArray}
            opts={{
              showErrors: true,
              label: "6. Competitors",
              groupName: "Competitor",
              newFieldInit: {
                name: '',
                website: '',
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "name",
                  component: TextField,
                  opts: {
                    showErrors: true,
                    label: "Name"
                  }
                },
                {
                  key: "website",
                  component: TextField,
                  opts: {
                    showErrors: true,
                    label: "Link",
                    placeholder: "https://competitor.com"
                  }
                },
                {
                  key: "solution_benchmark",
                  component: TextRTE,
                  opts: {
                    showErrors: true,
                    label: "Solution Benchmark",
                    validationHint: "Max 200 Words",
                    hint: "Features that differentiate your solution from this competitor’s solution"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="startup_questionnaire_go_to_market_strategies"
            component={DynamicFieldArray}
            opts={{
              showErrors: true,
              label: "7. Go-To-Market Strategies",
              groupName: "Strategy",
              newFieldInit: {
                occurs_on: '',
                action: '',
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "occurs_on",
                  component: DateTimePicker,
                  opts: {
                    showErrors: true,
                    label: "Date",
                    time: false,
                    format: "YYYY/MM",
                    views: ["year", "decade"]
                  }
                },
                {
                  key: "action",
                  component: TextRTE,
                  opts: {
                    showErrors: true,
                    label: "Action",
                    validationHint: "Max 40 Words"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="attachments"
            component={DynamicFieldArray}
            opts={{
              showErrors: true,
              label: "8. You want to show us more ? (optional)",
              hint: "Upload Slides, Graphs, research summary, link to sources",
              groupName: "File",
              newFieldInit: {
                title: '',
                file: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "title",
                  component: SelectField,
                  opts: {
                    showErrors: true,
                    label: "Title",
                    options: this.props.attachmentOptions,
                    valueField: "name",
                    textField: "name",
                    filter: true,
                    allowCreate: true
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
            className={`btn btn-primary text-uppercase pull-right ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess || pristine}
          >CONTINUE</button>
        </form>
      </div>
    )
  }
}
