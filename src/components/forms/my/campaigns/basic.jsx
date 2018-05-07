import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  gImmovable, G_IMMOVABLE_CAMPAIGN_TYPE_OPTIONS
} from '../../../../actions/immovables'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'
import SelectField from '../../../shared/form-elements/select-field'
import DatetimePicker from '../../../shared/form-elements/datetime-picker'

const mapStateToProps = (state) => {
  return {
    campaignTypes: _.get(state.immovables, 'campaign_type_options', []),
    gImmovableInProcess: _.get(state.requestStatus, G_IMMOVABLE_CAMPAIGN_TYPE_OPTIONS),
    values: _.get(state.form, 'MyCampaignsBasicForm.values', {})
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gImmovable: bindActionCreators(gImmovable, dispatch)
  }
}

@reduxForm({
  form: "MyCampaignsBasicForm",
  validate: (values) => {
    let toValidate = {
      name: ["presences"],
      startDate: ["presences"],
      endDate: ["presences"],
      goal: ["presences", { type: "numericality", opts: { min: 100000 } }],
      amountType: ["presences"],
      amount: ["presences", "noDecimal"]
    }

    if (values.amountType === "equity") {
      toValidate = {
        ...toValidate,
        equityType: ["presences"],
        valuation: ["presences"]
      }
    }

    if (values.amountType === "convertible") {
      toValidate = {
        ...toValidate,
        maturityDate: ["presences"],
        interestRate: ["presences", "noDecimal"],
        discountRate: ["presences", "noDecimal"],
        valuationCap: ["presences"]
      }
    }

    return Validators(toValidate, values)
  },
  initialValues: {
    startDate: moment().startOf('day').toDate(),
    endDate: moment().startOf('day').toDate(),
    maturityDate: moment().startOf('day').toDate()
  }
})
@connect(mapStateToProps, mapDispatchToProps)
export default class MyCampaignsBasicForm extends Component {
  componentWillMount() {
    this.props.gImmovable({ immovableID: "campaign_type_options" })
  }

  render() {
    const { handleSubmit, submitInProcess, optClass, title, campaignTypes, gImmovableInProcess } = this.props

    const amountType = _.get(this.props.values, 'amountType', '')

    return (
      <div id="forms-campaigns-basic" className={optClass}>
        <div className="text-center"><h3>Under Development</h3></div>

        { title && <h1 className="form-title margin-bottom-20 margin-top-0">{title}</h1>}

        <form onSubmit={handleSubmit}>
          <Field
            name="name"
            component={TextField}
            opts={{
              type: "text",
              label: "Campaign Name *"
            }}
          />

          <Field
            name="startDate"
            component={DatetimePicker}
            opts={{
              label: "Start Date *",
              time: false,
              format: "YYYY/MM/DD"
            }}
          />

          <Field
            name="endDate"
            component={DatetimePicker}
            opts={{
              label: "End Date *",
              time: false,
              format: "YYYY/MM/DD"
            }}
          />

          <Field
            name="goal"
            component={TextField}
            opts={{
              type: "number",
              label: "Goal Amount *"
            }}
          />

          <Field
            name="amountType"
            component={SelectField}
            opts={{
              requestInProcess: gImmovableInProcess,
              label: "Valuation Type *",
              placeholder: "Select Valuation Type",
              options: campaignTypes,
              valueKey: "id",
              nameKey: "name"
            }}
          />

          <Field
            name="amount"
            component={TextField}
            opts={{
              type: "number",
              label: "Equity Amount (in %) *"
            }}
          />

          {
            amountType === "equity" && (
              <div>
                <Field
                  name="equityType"
                  component={SelectField}
                  opts={{
                    label: "Equity Type *",
                    placeholder: "Select Equity Type",
                    options: [
                      { id: "ordinary", name: "Ordinary" },
                      { id: "preferred", name: "Preferred" }
                    ],
                    valueKey: "id",
                    nameKey: "name"
                  }}
                />

                <Field
                  name="valuation"
                  component={TextField}
                  opts={{
                    type: "number",
                    label: "Valuation *"
                  }}
                />
              </div>
            )
          }

          {
            amountType === "convertible" && (
              <div>
                <Field
                  name="maturityDate"
                  component={DatetimePicker}
                  opts={{
                    label: "Maturity Date *",
                    time: false,
                    format: "YYYY/MM/DD"
                  }}
                />

                <Field
                  name="interestRate"
                  component={TextField}
                  opts={{
                    type: "number",
                    label: "Interest Rate (in %) *"
                  }}
                />

                <Field
                  name="discountRate"
                  component={TextField}
                  opts={{
                    type: "number",
                    label: "Discount Rate (in %) *"
                  }}
                />

                <Field
                  name="valuationCap"
                  component={TextField}
                  opts={{
                    type: "number",
                    label: "Valuation Cap *"
                  }}
                />
              </div>
            )
          }

          <button
            className={`btn btn-info btn-lg btn-block ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}
