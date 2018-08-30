import React, { Component } from 'react'
import { reduxForm, FieldArray } from 'redux-form'
import { connect } from 'react-redux'

import Validators from '../../../services/form-validators'

import FileDropField from '../../shared/form-elements/file-drop-field'

const mapStateToProps = (state) => {
  return {
    formData: _.get(state.form, 'InvestorAMLDocumentsForm')
  }
}

@connect(mapStateToProps, null)
@reduxForm({
  form: "InvestorAMLDocumentsForm",
  validate: (values) => {
    return Validators({
      attachments: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
          selfMax: 2,
          uniqFields: ["title"],
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
export default class InvestorAMLDocumentsForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dAttribute, pristine } = this.props

    const hint = "Note that proof of address is a bank statement, credit card statement, or utility bill not more than three months old. Please include the photo and information page of your identity document, and where applicable, the signature page as well."

    const p1 = "Certified means one of the below named persons (“Certifier”), being a person independent of the individual, trust or legal person for which the certification is being provided, has sighted the original documents and confirms in writing in the following manner that the copy is a true and correct copy of the original."

    const p2 = "Certification should bear the following statement “I hereby certify this to be a true copy of the original [and that the photograph bears a true likeness to the individual**"

    return (
      <div className={optClass}>
        <form className="clearfix" onSubmit={handleSubmit}>
          <div className="margin-bottom-20">
            <span className="help-block hint">{hint}</span>
          </div>

          <FieldArray
            name="attachments"
            component={FileDropField}
            opts={{
              onDeleteField: dAttribute,
              maxFields: 2,
              selectOpts: {
                options: [
                  { name: "Address Proof" },
                  { name: "Identification Document" }
                ],
                valueField: 'name',
                textField: 'name',
                placeholder: 'Select a Title',
                filter: true,
                uniq: true
              }
            }}
          />

          <button
            className={`btn btn-primary text-uppercase pull-right ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >{pristine ? "Continue" : "Save & Continue"}</button>
        </form>

        <div className="margin-top-20 clearfix">
          <p>{p1}</p>

          <ul className="px-left-20">
            <li>Notary Public exercising his or her office</li>
            <li>Certified Public Accountant</li>
            <li>Registrar or Deputy Registrar of a court</li>
            <li>Justice of the Peace</li>
            <li>Legal practitioner</li>
            <li>An officer or employee of a licensed bank, trust company or insurance company</li>
            <li>A member of the Hong Kong Institute of Chartered Secretaries (HKICS)</li>
          </ul>

          <p>{p2}</p>
        </div>
      </div>
    )
  }
}
