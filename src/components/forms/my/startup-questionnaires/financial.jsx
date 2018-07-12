import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'
import TextField from '../../../shared/form-elements/text-field'
import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import SelectField from '../../../shared/form-elements/select-field'
import Select2Field from '../../../shared/form-elements/select2-field'
import FileField from '../../../shared/form-elements/file-field'
import CurrencyField from '../../../shared/form-elements/currency-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'

@reduxForm({
  form: "MyStartupQuestionnairesFinancialForm",
  validate: (values) => {
    return Validators({
      startup_questionnaire_cash_burns: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: true,
          childFields: {
            money_attributes: ["presences"], // TODO: currency_presenses
          }
        }
      }],
      startup_questionnaire_break_even: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: true,
          childFields: {
            quarter: ["presences"],
            year: ["presences"],
          }
        }
      }],
      startup_questionnaire_use_of_funds: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: true,
          childFields: {
            percentage: ["presences", "noDecimal"],
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
            money_attributes: ["presences"],
            contract_type: ["presences"],
            date_of_investment: ["presences"],
            class_of_shares: ["presences"],
            comment: ["presences"]
          }
        }
      }],
      startup_questionnaire_cap_tables_attributes: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: true,
          childFields: {
            first_name: ["presences"],
            last_name: ["presences"],
            percentage_of_shares: ["presences", "noDecimal"]
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
      // "startup_questionnaire_cash_burns",
      // "startup_questionnaire_break_even",
      // "startup_questionnaire_use_of_funds",
      // "startup_questionnaire_previous_funds",
      // "startup_questionnaire_cap_tables_attributes",
      // "attachments"
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
            name="income_statements"
            component={FileField}
            opts={{
              label: "Income Statement Projection",
              urlKey: "original",
              templateUrl: "https://s3-ap-northeast-1.amazonaws.com/angel-hub-dev/static/templates/income+statement+template.xlsx",
              hint: "See Template"
            }}
          />

          <Field
            name="cash_flow_statements"
            component={FileField}
            opts={{
              label: "Cash-Flow Statement Projection",
              urlKey: "original",
              templateUrl: "https://s3-ap-northeast-1.amazonaws.com/angel-hub-dev/static/templates/cash-flow+statement+template.xlsx",
              hint: "See Template"
            }}
          />

          <FieldArray
            name="startup_questionnaire_cash_burns"
            component={DynamicFieldArray}
            opts={{
              label: "Average monthly cash burn-rate",
              staticGroup: true,
              newFieldInit: {
                money_attributes: {
                  amount: '',
                  currency: "HKD"
                }
              },
              dynamicFields: [
                {
                  key: "money_attributes",
                  component: CurrencyField,
                  opts: {
                    label: "Amount"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="startup_questionnaire_break_even"
            component={DynamicFieldArray}
            opts={{
              label: "Break-even point",
              hint: "State a Quarter and a year",
              staticGroup: true,
              newFieldInit: {
                quarter: '',
                year: moment().toDate()
              },
              dynamicFields: [
                {
                  key: "quarter",
                  component: SelectField,
                  opts: {
                    options: [
                      { name: "Q1" },
                      { name: "Q2" },
                      { name: "Q3" },
                      { name: "Q4" }
                    ],
                    valueKey: "name",
                    nameKey: "name",
                    label: "Quarter",
                    placeholder: "Select a Quarter"
                  }
                },
                {
                  key: "year",
                  component: DateTimePicker,
                  opts: {
                    label: "Year",
                    time: false,
                    format: "YYYY",
                    views: ["decade"]
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="startup_questionnaire_use_of_funds"
            component={DynamicFieldArray}
            opts={{
              label: "Use of fund",
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
                  component: TextArea,
                  opts: {
                    label: "Description"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="startup_questionnaire_previous_funds"
            component={DynamicFieldArray}
            opts={{
              label: "Previous funding round(s) (optional)",
              hint: "Date and Amount and type (Equity / Convertible)",
              groupName: "Round",
              newFieldInit: {
                occurred_on: moment().toDate(),
                money_attributes: {
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
                    Label: "Occurred On",
                    time: false,
                    format: "YYYY/MM",
                    views: ["year", "decade"]
                  }
                },
                {
                  key: "money_attributes",
                  component: CurrencyField,
                  opts: {
                    type: "number",
                    Label: "Amount"
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
                    valueKey: "key",
                    nameKey: "name",
                    Label: "Contract Type",
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
              label: "Cap Table",
              hint: "In addition to your current investors, please state if you have created an ESOP and teh equity share it represents",
              groupName: "Investor",
              newFieldInit: {
                first_name: '',
                last_name: '',
                percentage_of_shares: '',
                date_of_investment: moment().toDate(),
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
                  key: "percentage_of_shares",
                  component: TextField,
                  opts: {
                    type: "number",
                    inputGroup: true,
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
                    format: "YYYY/MM/DD",
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
                      { name: "Redeemable" }
                    ],
                    valueKey: "name",
                    nameKey: "name",
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
              label: "You have been doing your homework on financials and want to share an instrumental document(s) with us ? (Optional)",
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
            disabled={submitInProcess}
          >
            Save
          </button>
        </form>
      </div>
    )
  }
}
