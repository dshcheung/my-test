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
      unique_selling_point: [{ type: "lengthWord", opts: { max: 30 } }],
      barriers_to_entry: [{ type: "lengthWord", opts: { max: 200 } }],
      traction: [{ type: "lengthWord", opts: { max: 200 } }],
      competition_landscape: [{ type: "lengthWord", opts: { max: 200 } }],
      startup_questionnaire_competitors: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: true,
          childFields: {
            title: ["presences"],
            link: ["presences", "httpLink"]
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
    }, values, ["startup_questionnaire_competitors", "attachments"])
  },
  enableReinitialize: true
})

// TODO: need to take description out of competitors

// startup_questionnaire_market_attributes: [
//   :id,
//   :global_market,
//   :global_market_metrics,
//   :target_market,
//   :target_market_metrics,
//   :unique_selling_point,
//   :barriers_to_entry,
//   :traction,
//   competitors_attributes: [ :id, :description, :name, :website, :_destroy ],
//   go_to_market_strategies_attributes: [ :id, :occurs_on, :action, :_destroy ],
//   attachments_attributes: [ :id, :title, :file, :remove_file, :_destroy ]
// ],

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
            name="unique_selling_point"
            component={TextArea}
            opts={{
              label: "Unique selling point",
              hint: "Strategy is about difference : give one, and only one"
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
              label: "Describe your competition landcape",
            }}
          />

          <FieldArray
            name="startup_questionnaire_competitors"
            component={DynamicFieldArray}
            opts={{
              label: "Competitors",
              groupName: "Competitor",
              newFieldInit: {
                name: '',
                link: '',
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
                  key: "link",
                  component: TextField,
                  opts: {
                    label: "Link"
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
                date: moment().toDate(),
                action: '',
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "date",
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
              label: "Extra Files (Optional)",
              groupName: "File",
              newFieldInit: {
                title: '',
                file: '',
                file_url: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "title",
                  component: Select2Field,
                  opts: {
                    options: this.props.attachmentOptions,
                    valueKey: "name",
                    nameKey: "name",
                    placeholder: "Title"
                  }
                },
                {
                  key: "file",
                  component: FileField,
                  opts: {
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
