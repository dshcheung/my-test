import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'
import Select2Field from '../../../shared/form-elements/select2-field'
import FileField from '../../../shared/form-elements/file-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'

@reduxForm({
  form: "MyStartupQuestionnairesMarketForm",
  validate: (values) => {
    return Validators({
      define_market: [{ type: "length", opts: { max: 600 } }],
      customer_persona: [{ type: "length", opts: { max: 600 } }],
      timing: [{ type: "length", opts: { max: 600 } }],
      risk_factors: [{ type: "length", opts: { max: 600 } }],
      competitors: [{ type: "length", opts: { max: 600 } }],
      barriers: [{ type: "length", opts: { max: 600 } }],
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
    }, values, ["attachments"])
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
            name="define_market"
            component={TextArea}
            opts={{
              label: "Define your market *",
              hint: "Describe your own targeted market : Who is your customer, what particular segment you are addressing, which geography, what will be the next market to ensure your growth (if applicable)"
            }}
          />

          <Field
            name="market_metrics"
            component={FileField}
            opts={{
              label: "Market metrics *",
              hint: "Please upload your market metrics slide/excel. Size & Growth rate of the global market (precise currency), of your targeted segment, your market share (in % of your targeted segment, and in value)",
              urlKey: "original"
            }}
          />

          <Field
            name="timing"
            component={TextArea}
            opts={{
              label: "Why is your timing right in entering this market ? (For assessment purpose only)",
              hint: "because of course it IS right, no ? ;))"
            }}
          />

          <Field
            name="risk_factors"
            component={TextArea}
            opts={{
              label: "What are the risk factors specific to this market ? *",
              hint: "Solvability, security, consumer safety, regulation & liability, political / legal stability...."
            }}
          />

          <Field
            name="competitors"
            component={TextArea}
            opts={{
              label: "Who are your actual and potential competitors ? *",
              hint: "List here your 3 main competitors names and brief description. Please upload in Extra files below any more detailed Competition analysis slide/doc you may have"
            }}
          />

          <Field
            name="barriers"
            component={TextArea}
            opts={{
              label: "What are the barriers to entry in your market for new competitors ? *",
              hint: "Patent, regulation, time to market, execution complexity, resource scarcity... It is important also to explain if YOU are building them and if they will be sustainable in time"
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
