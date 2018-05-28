import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'
import TextField from '../../../shared/form-elements/text-field'
import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import SelectField from '../../../shared/form-elements/select-field'
import Select2Field from '../../../shared/form-elements/select2-field'
import FileField from '../../../shared/form-elements/file-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'

@reduxForm({
  form: "MyStartupQuestionnairesFinancialForm",
  validate: (values) => {
    return Validators({
      three_kpis: [{ type: "length", opts: { max: 600 } }],
      break_even: [{ type: "length", opts: { max: 600 } }],
      startup_questionnaire_financial_fund_histories: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
          childFields: {
            occurred_on: ["presences"],
            amount: ["presences"],
            contract_type: ["presences"]
          }
        }
      }],
      startup_questionnaire_financial_use_of_funds: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
          childFields: {
            section: ["presences", { type: "length", opts: { max: 600 } }],
            percentage: ["presences", "noDecimal"]
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
      "startup_questionnaire_financial_fund_histories",
      "startup_questionnaire_financial_use_of_funds",
      "attachments"
    ])
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnairesFinancialForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="three_kpis"
            component={TextArea}
            opts={{
              label: "What are your three most critical KPIs for you and your business model ? *",
              hint: "variables that you will monitor and will use to gauge your progression vs your objectives"
            }}
          />

          <Field
            name="break_even"
            component={TextArea}
            opts={{
              label: "When will you reach break-even ? *"
            }}
          />

          <Field
            name="income_statements"
            component={FileField}
            opts={{
              label: "Building a summarized Financial statements projection (Y, Y+1, Y+2) *",
              urlKey: "original",
              templateUrl: "https://s3-ap-northeast-1.amazonaws.com/angel-hub-dev/static/templates/income+statement+template.xlsx",
              hint: "Please use \"select file\" to upload your own projections statements. Otherwise you can use \"download template\" to fill in our excel model"
            }}
          />

          <Field
            name="cash_flow_statements"
            component={FileField}
            opts={{
              label: "Building a summarized Cash-Flow statements projection (Y, Y+1, Y+2) *",
              urlKey: "original",
              templateUrl: "https://s3-ap-northeast-1.amazonaws.com/angel-hub-dev/static/templates/cash-flow+statement+template.xlsx",
              hint: "Please use \"select file\" to upload your own projections statements. Otherwise you can use \"download template\" to fill in our excel model"
            }}
          />

          <Field
            name="current_fund"
            component={TextField}
            opts={{
              type: "number",
              label: "How much funds are you raising ? *"
            }}
          />

          <Field
            name="monthly_cash_burn"
            component={TextField}
            opts={{
              type: "number",
              label: "What is your average monthly cash burning rate ? *"
            }}
          />

          <FieldArray
            name="startup_questionnaire_financial_fund_histories"
            component={DynamicFieldArray}
            opts={{
              label: "Funding History *",
              hint: "Please use + button to enter dates and amounts of previous funding rounds if applicable",
              groupName: "History",
              newFieldInit: {
                occurred_on: moment().toDate(),
                amount: '',
                contract_type: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "occurred_on",
                  component: DateTimePicker,
                  opts: {
                    placeholder: "Occurred On",
                    time: false,
                    format: "YYYY/MM/DD"
                  }
                },
                {
                  key: "amount",
                  component: TextField,
                  opts: {
                    type: "number",
                    placeholder: "Amount"
                  }
                },
                {
                  key: "contract_type",
                  component: SelectField,
                  opts: {
                    options: [
                      { key: "equity", name: "Equity" },
                      { key: "convertible", name: "Convertible" }
                    ],
                    valueKey: "key",
                    nameKey: "name",
                    placeholder: "Contract Type"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="startup_questionnaire_financial_use_of_funds"
            component={DynamicFieldArray}
            opts={{
              label: "What will be the use of the funds? *",
              hint: "Please use + button to enter % and uses. We’ll do a nice chart for you",
              groupName: "Use of Fund",
              newFieldInit: {
                section: '',
                percentage: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "section",
                  component: TextArea,
                  opts: {
                    placeholder: "Section"
                  }
                },
                {
                  key: "percentage",
                  component: TextField,
                  opts: {
                    type: "number",
                    placeholder: "Percentage"
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
            disabled={submitInProcess}
          >
            Save
          </button>
        </form>
      </div>
    )
  }
}
