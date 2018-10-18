import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import Validators from '../../../services/form-validators'

import SignatureField from '../../shared/form-elements/signature-field'

@reduxForm({
  form: "InvestorAMLSignatureForm",
  validate: (values) => {
    return Validators({
      signature: []
    }, values)
  },
  enableReinitialize: true
})
export default class InvestorAMLSignatureForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, investorAgreement, pristine, signedDocument } = this.props

    return (
      <div className={optClass}>
        {
          signedDocument ? (
            <div>signed doc here</div>
          ) : (
            <form className="clearfix" onSubmit={handleSubmit}>
              <p className="margin-bottom-40">To continue, read, and sign to the text below</p>

              <div
                className="agreement-scroll margin-bottom-40"
                dangerouslySetInnerHTML={{ __html: investorAgreement.content || "" }}
              />

              <Field
                name="signature"
                component={SignatureField}
                opts={{
                  urlKey: "agreement.url",
                  fileKey: "signature",
                  eventsKey: "investor_agreement_events",
                  detailsKey: "additional_details"
                }}
              />

              <button
                className={`btn btn-primary text-uppercase pull-right ${submitInProcess && "m-progress"}`}
                type="submit"
                onClick={this.handleSubmit}
                disabled={submitInProcess}
              >{ pristine ? "Continue" : "Save & Continue"}</button>
            </form>
          )
        }
      </div>
    )
  }
}
