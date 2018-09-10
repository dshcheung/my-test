import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  gImmovable, G_IMMOVABLE_CAMPAIGN_TYPE_OPTIONS
} from '../../../../actions/immovables'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'
import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import SelectField from '../../../shared/form-elements/select-field'
import FileField from '../../../shared/form-elements/file-field'
import CurrencyField from '../../../shared/form-elements/currency-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'

const mapStateToProps = (state) => {
  return {
    campaignTypes: _.get(state.immovables, 'campaign_type_options', []),
    gImmovableInProcess: _.get(state.requestStatus, G_IMMOVABLE_CAMPAIGN_TYPE_OPTIONS),
    values: _.get(state.form, 'MyStartupQuestionnairesCampaignForm.values', {})
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gImmovable: bindActionCreators(gImmovable, dispatch)
  }
}

@reduxForm({
  form: "MyStartupQuestionnairesCampaignForm",
  validate: (values, props) => {
    if (props.highlightErrors) {
      return Validators({
        campaign_type: ["presences"],
        raised: ["currencyPresences"],
        pre_money_valuation: values.campaign_type === "equity" ? ["currencyPresences"] : [],
        maturity_date: values.campaign_type === "convertible" ? ["presences"] : [],
        interest_rate: values.campaign_type === "convertible" ? ["presences", "percentage"] : [],
        discount_rate: values.campaign_type === "convertible" ? ["percentage"] : [],
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
        "attachments"
      ])
    } else {
      return Validators({
        interest_rate: values.campaign_type === "convertible" ? ["percentage"] : [],
        discount_rate: values.campaign_type === "convertible" ? ["percentage"] : [],
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
        "attachments"
      ])
    }
  },
  enableReinitialize: true
})
@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupQuestionnairesCampaignForm extends Component {
  componentWillMount() {
    this.props.gImmovable({ immovableID: "campaign_type_options" })
  }

  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes, campaignTypes, gImmovableInProcess } = this.props

    const campaignType = _.get(this.props.values, 'campaign_type', '')
    const raised = _.get(this.props.values, 'raised.amount', '') || 0
    const preMoney = _.get(this.props.values, 'pre_money_valuation.amount', '') || 0
    const equityPercentage = (preMoney / raised) * 100 || 0

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="campaign_type"
            component={SelectField}
            opts={{
              showErrors: true,
              requestInProcess: gImmovableInProcess,
              label: "1. Type of Deal",
              placeholder: "Select Valuation Type",
              options: campaignTypes,
              valueField: "id",
              textField: "name",
              allowEmptyValue: true
            }}
          />

          <Field
            name="raised"
            component={CurrencyField}
            opts={{
              showErrors: true,
              label: "2. Amount looking to raise",
              placeholder: "5,000,000"
            }}
          />

          {
            campaignType === "equity" && (
              <div>
                <Field
                  name="pre_money_valuation"
                  component={CurrencyField}
                  opts={{
                    showErrors: true,
                    label: "3. Pre money valuation",
                    placeholder: "1,000,000"
                  }}
                />

                <Field
                  name="equity_percentage"
                  component={TextField}
                  opts={{
                    showErrors: true,
                    type: "number",
                    label: "4. Equity Percentage (Calculated Automatically)",
                    backInputGroup: "%",
                    readOnly: true,
                    overrideValue: equityPercentage.toFixed(1)
                  }}
                />
              </div>
            )
          }

          {
            campaignType === "convertible" && (
              <div>
                <Field
                  name="discount_rate"
                  component={TextField}
                  opts={{
                    showErrors: true,
                    type: "number",
                    label: "3. Discount rate",
                    backInputGroup: "%",
                    min: 0,
                    max: 100,
                    step: 1
                  }}
                />

                <Field
                  name="interest_rate"
                  component={TextField}
                  opts={{
                    showErrors: true,
                    type: "number",
                    label: "4. Interest rate",
                    backInputGroup: "%",
                    min: 0,
                    max: 100,
                    step: 1
                  }}
                />

                <Field
                  name="maturity_date"
                  component={DateTimePicker}
                  opts={{
                    showErrors: true,
                    label: "5. Maturity Date",
                    time: false,
                    format: "YYYY/MM/DD"
                  }}
                />

                <Field
                  name="valuation_cap"
                  component={CurrencyField}
                  opts={{
                    showErrors: true,
                    label: "6. Valuation Cap"
                  }}
                />
              </div>
            )
          }

          <FieldArray
            name="attachments"
            component={DynamicFieldArray}
            opts={{
              showErrors: true,
              label: `${campaignType === "equity" ? 5 : 7}. Upload Existing Term Sheets, Investor Right Agreements, Shareholder Agreements, etc. (Optional)`,
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
            disabled={submitInProcess}
          >Continue</button>
        </form>
      </div>
    )
  }
}
