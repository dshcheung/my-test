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
import Select2Field from '../../../shared/form-elements/select2-field'
import FileField from '../../../shared/form-elements/file-field'
import CurrencyField from '../../../shared/form-elements/currency-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'

import SharedMyCampaignsBackAndSaveBTN from '../../../shared/my/campaigns/back-and-save-btn'

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
              label: "Amount raised"
            }}
          />

          <Field
            name="campaign_type"
            component={SelectField}
            opts={{
              requestInProcess: gImmovableInProcess,
              label: "Type of Deal",
              placeholder: "Select Valuation Type",
              options: campaignTypes,
              valueKey: "id",
              nameKey: "name"
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
                    label: "Equity Percentage",
                    backInputGroup: "%"
                  }}
                />

                <Field
                  name="pre_money_valuation"
                  component={CurrencyField}
                  opts={{
                    label: "Pre money valuation"
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
                    label: "Discount rate",
                    backInputGroup: "%"
                  }}
                />

                <Field
                  name="interest_rate"
                  component={TextField}
                  opts={{
                    type: "number",
                    label: "Interest rate",
                    backInputGroup: "%"
                  }}
                />

                <Field
                  name="maturity_date"
                  component={DateTimePicker}
                  opts={{
                    label: "Maturity Date",
                    time: false,
                    format: "YYYY/MM/DD"
                  }}
                />

                <Field
                  name="valuation_cap"
                  component={CurrencyField}
                  opts={{
                    label: "Valuation Cap"
                  }}
                />
              </div>
            )
          }

          <FieldArray
            name="attachments"
            component={DynamicFieldArray}
            opts={{
              label: "Upload Term sheet / Investor right agreement / Shareholder agreement (Optional)",
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

          <SharedMyCampaignsBackAndSaveBTN
            submitInProcess={submitInProcess}
            pristine={pristine}
            toBackTab={this.props.toBackTab}
            hasBack={this.props.hasBack}
          />
        </form>
      </div>
    )
  }
}
