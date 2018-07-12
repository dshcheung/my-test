import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'
import TextArea from '../../../shared/form-elements/text-area'
import Select2Field from '../../../shared/form-elements/select2-field'
import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import FileField from '../../../shared/form-elements/file-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'

@reduxForm({
  form: "MyStartupQuestionnairesMarketForm",
  validate: (values) => {
    return Validators({
      solution_benchmark: [{ type: "lengthWord", opts: { max: 200 } }],
      barriers_to_entry: [{ type: "lengthWord", opts: { max: 200 } }],
      traction: [{ type: "lengthWord", opts: { max: 200 } }],
      competition_landscape: [{ type: "lengthWord", opts: { max: 200 } }],
      competitors: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: true,
          childFields: {
            name: ["presences"],
            website: ["presences", "httpLink"]
          }
        }
      }],
      go_to_market_strategies: [{
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
    }, values, ["competitors", "go_to_market_strategies", "attachments"])
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
            component={TextArea}
            opts={{
              label: "Global market",
              hint: "Worldwide, or any global reference point : that is the all market you could address eventually, after scaling up "
            }}
          />

          <Field
            name="global_market_metrics"
            component={FileField}
            opts={{
              label: "Global market metrics (optional)",
              hint: "Current Size, projected CAGR",
              urlKey: "original"
            }}
          />

          <Field
            name="target_market"
            component={TextArea}
            opts={{
              label: "Targeted market (your customers)",
              hint: "Your entry market that you are targeting in the coming months. Remember that its definition should give us a precise description of your targeted customer."
            }}
          />

          <Field
            name="target_market_metrics"
            component={FileField}
            opts={{
              label: "Targeted market metrics (optional)",
              hint: "Current Size, projected CAGR",
              urlKey: "original"
            }}
          />

          <Field
            name="solution_benchmark"
            component={TextArea}
            opts={{
              label: "Solution Benchmark",
              hint: "Features that differentiate your solution from this competitor’s solution"
            }}
          />

          <Field
            name="barriers_to_entry"
            component={TextArea}
            opts={{
              label: "Barriers to entry",
              hint: "Main reasons why a company will find it difficult to conquer your customers when entering your market"
            }}
          />

          <Field
            name="traction"
            component={TextArea}
            opts={{
              label: "Traction",
              hint: "Users and/or validated feedback"
            }}
          />

          <Field
            name="competition_landscape"
            component={TextArea}
            opts={{
              label: "Describe your competition landscape",
            }}
          />

          <FieldArray
            name="competitors"
            component={DynamicFieldArray}
            opts={{
              label: "Competitors",
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
                    label: "Name"
                  }
                },
                {
                  key: "website",
                  component: TextField,
                  opts: {
                    label: "Link",
                    placeholder: "https://competitor.com"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="go_to_market_strategies"
            component={DynamicFieldArray}
            opts={{
              label: "Go-To-Market Strategies",
              groupName: "Strategy",
              newFieldInit: {
                occurs_on: moment().toDate(),
                action: '',
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "occurs_on",
                  component: DateTimePicker,
                  opts: {
                    label: "Date",
                    time: false,
                    format: "MM/YYYY",
                    views: ["year", "decade"]
                  }
                },
                {
                  key: "action",
                  component: TextArea,
                  opts: {
                    label: "Action"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="attachments"
            component={DynamicFieldArray}
            opts={{
              label: "You want to show us more ? (optional)",
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
                  component: Select2Field,
                  opts: {
                    label: "Title",
                    options: this.props.attachmentOptions,
                    valueKey: "name",
                    nameKey: "name",
                  }
                },
                {
                  key: "file",
                  component: FileField,
                  opts: {
                    label: "File",
                    urlKey: "original"
                  }
                }
              ]
            }}
          />

          <button
            className={`btn btn-info btn-lg btn-block ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess || pristine}
          >
            Save
          </button>
        </form>
      </div>
    )
  }
}
