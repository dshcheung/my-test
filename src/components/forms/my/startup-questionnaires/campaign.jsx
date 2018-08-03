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
  validate: (values) => {
    return Validators({
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
  },
  enableReinitialize: true
})
@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupQuestionnairesCampaignForm extends Component {
  componentWillMount() {
    this.props.gImmovable({ immovableID: "campaign_type_options" })
  }

  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes, campaignTypes, gImmovableInProcess, pristine } = this.props

    const campaignType = _.get(this.props.values, 'campaign_type', '')

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="raised"
            component={CurrencyField}
            opts={{
              label: "1. Amount looking to raise",
              placeholder: "5,000,000"
            }}
          />

          <Field
            name="campaign_type"
            component={SelectField}
            opts={{
              requestInProcess: gImmovableInProcess,
              label: "2. Type of Deal",
              placeholder: "Select Valuation Type",
              options: campaignTypes,
              valueField: "id",
              textField: "name",
              allowEmptyValue: true
            }}
          />

          {
            campaignType === "equity" && (
              <div>
                <Field
                  name="equity_percentage"
                  component={TextField}
                  opts={{
                    type: "number",
                    label: "3. Equity Percentage",
                    backInputGroup: "%"
                  }}
                />

                <Field
                  name="pre_money_valuation"
                  component={CurrencyField}
                  opts={{
                    label: "4. Pre money valuation"
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
                    type: "number",
                    label: "3. Discount rate",
                    backInputGroup: "%"
                  }}
                />

                <Field
                  name="interest_rate"
                  component={TextField}
                  opts={{
                    type: "number",
                    label: "4. Interest rate",
                    backInputGroup: "%"
                  }}
                />

                <Field
                  name="maturity_date"
                  component={DateTimePicker}
                  opts={{
                    label: "5. Maturity Date",
                    time: false,
                    format: "YYYY/MM/DD"
                  }}
                />

                <Field
                  name="valuation_cap"
                  component={CurrencyField}
                  opts={{
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
