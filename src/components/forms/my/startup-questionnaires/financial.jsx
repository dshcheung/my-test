import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextRTE from '../../../shared/form-elements/text-rte'
import TextField from '../../../shared/form-elements/text-field'
import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import SelectField from '../../../shared/form-elements/select-field'
import FileField from '../../../shared/form-elements/file-field'
import CurrencyField from '../../../shared/form-elements/currency-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'
import StaticField from '../../../shared/form-elements/static-field'

@reduxForm({
  form: "MyStartupQuestionnairesFinancialForm",
  validate: (values) => {
    return Validators({
      startup_questionnaire_use_of_funds: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
          childFields: {
            percentage: ["presences"],
            description: ["presences", { type: "lengthWord", opts: { max: 50 } }]
          }
        }
      }],
      startup_questionnaire_previous_funds: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
          childFields: {
            occurred_on: ["presences"],
            money: ["presences"],
            contract_type: ["presences"],
            date_of_investment: ["presences"],
            class_of_shares: ["presences"],
            comment: ["presences"]
          }
        }
      }],
      startup_questionnaire_cap_tables: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
          childFields: {
            first_name: ["presences"],
            last_name: ["presences"],
            percentage_of_shares: ["presences"]
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
      "startup_questionnaire_use_of_funds",
      "startup_questionnaire_previous_funds",
      "startup_questionnaire_cap_tables",
      "attachments"
    ])
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnairesFinancialForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes, pristine } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="income_statement"
            component={FileField}
            opts={{
              label: "1. Income Statement Projection",
              urlKey: "original",
              templateUrl: "https://s3-ap-northeast-1.amazonaws.com/angel-hub-dev/static/templates/income+statement+template.xlsx"
            }}
          />

          <Field
            name="cash_flow_statement"
            component={FileField}
            opts={{
              label: "2. Cash-Flow Statement Projection",
              urlKey: "original",
              templateUrl: "https://s3-ap-northeast-1.amazonaws.com/angel-hub-dev/static/templates/cash-flow+statement+template.xlsx"
            }}
          />

          <Field
            name="cash_burn"
            component={CurrencyField}
            opts={{
              label: "3. Monthly Cash Burn Rate",
              hint: "Amount of HKD/USD burned by month"
            }}
          />

          <StaticField
            name="startup_questionnaire_break_even"
            label="4. Break-even point"
            hint="State a Quarter and a year"
            fields={[
              {
                name: "quarter",
                component: SelectField,
                opts: {
                  options: [
                    { value: 1, name: "Q1" },
                    { value: 2, name: "Q2" },
                    { value: 3, name: "Q3" },
                    { value: 4, name: "Q4" }
                  ],
                  valueField: "value",
                  textField: "name",
                  label: "Quarter",
                  placeholder: "Select a Quarter"
                }
              },
              {
                name: "year",
                component: DateTimePicker,
                opts: {
                  label: "Year",
                  time: false,
                  format: "YYYY",
                  views: ["decade"]
                }
              }
            ]}
          />

          <FieldArray
            name="startup_questionnaire_use_of_funds"
            component={DynamicFieldArray}
            opts={{
              label: "5. Use of fund",
              hint: "How you will use the money you are going to raise",
              groupName: "Use",
              newFieldInit: {
                percentage: "",
                description: ""
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "percentage",
                  component: TextField,
                  opts: {
                    label: "Percentage",
                    type: "number",
                    backInputGroup: "%"
                  }
                },
                {
                  key: "description",
                  component: TextRTE,
                  opts: {
                    label: "Description",
                    hint: "Max 50 Words"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="startup_questionnaire_previous_funds"
            component={DynamicFieldArray}
            opts={{
              label: "6. Previous funding round(s) (optional)",
              hint: "Date and Amount and type (Equity / Convertible)",
              groupName: "Round",
              newFieldInit: {
                occurred_on: '',
                money: {
                  amount: '',
                  currency: "HKD"
                },
                fund_type: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "occurred_on",
                  component: DateTimePicker,
                  opts: {
                    label: "Occurred On",
                    time: false,
                    format: "YYYY/MM",
                    views: ["year", "decade"]
                  }
                },
                {
                  key: "money",
                  component: CurrencyField,
                  opts: {
                    label: "Amount"
                  }
                },
                {
                  key: "fund_type",
                  component: SelectField,
                  opts: {
                    options: [
                      { key: "equity", name: "Equity" },
                      { key: "convertible", name: "Convertible" }
                    ],
                    valueField: "key",
                    textField: "name",
                    label: "Contract Type",
                    placeholder: "Select a type"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="startup_questionnaire_cap_tables"
            component={DynamicFieldArray}
            opts={{
              label: "7. Cap Table",
              hint: "In addition to your current investors, please state if you have created an ESOP and the equity share it represents",
              groupName: "Investor",
              newFieldInit: {
                first_name: '',
                last_name: '',
                percentage_of_shares: '',
                date_of_investment: '',
                class_of_shares: '',
                comment: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "first_name",
                  component: TextField,
                  opts: {
                    label: "First Name"
                  }
                },
                {
                  key: "last_name",
                  component: TextField,
                  opts: {
                    label: "Last Name"
                  }
                },
                {
                  key: "cap_table_type",
                  component: SelectField,
                  opts: {
                    options: this.props.capTableOptions,
                    valueField: 'id',
                    textField: 'name',
                    label: "Investor Type",
                    placeholder: "Select a Type"
                  }
                },
                {
                  key: "percentage_of_shares",
                  component: TextField,
                  opts: {
                    type: "number",
                    backInputGroup: "%",
                    label: "Percentage of Shares"
                  }
                },
                {
                  key: "date_of_investment",
                  component: DateTimePicker,
                  opts: {
                    label: "Date of Investment",
                    time: false,
                    format: "YYYY/MM",
                    views: ["year", "decade"]
                  }
                },
                {
                  key: "class_of_shares",
                  component: SelectField,
                  opts: {
                    options: [
                      { name: "Preferred" },
                      { name: "Ordinary" },
                      { name: "Non-voting" },
                      { name: "Redeemable" },
                      { name: "Other" }
                    ],
                    valueField: "name",
                    textField: "name",
                    label: "Class of Shares",
                    placeholder: "Select a class"
                  }
                },
                {
                  key: "comment",
                  component: TextField,
                  opts: {
                    label: "Comment"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="attachments"
            component={DynamicFieldArray}
            opts={{
              label: "8. You have been doing your homework on financials and want to share an instrumental document(s) with us ? (Optional)",
              hint: "Upload your documents",
              groupName: "File",
              newFieldInit: {
                title: '',
                file: '',
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "title",
                  component: SelectField,
                  opts: {
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
                    label: "File",
                    urlKey: "original"
                  }
                }
              ]
            }}
          />

          <button
            className={`btn btn-danger pull-right ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess || pristine}
          >CONTINUE</button>
        </form>
      </div>
    )
  }
}
