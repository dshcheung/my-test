import React, { Component } from 'react'
import { reduxForm, FieldArray } from 'redux-form'
import { connect } from 'react-redux'

import Validators from '../../../services/form-validators'

import FileDropField from '../../shared/form-elements/file-drop-field'

const mapStateToProps = (state) => {
  return {
    formData: _.get(state.form, 'InvestorValidationsSuitabilityDocumentsForm')
  }
}

@connect(mapStateToProps, null)
@reduxForm({
  form: "InvestorValidationsSuitabilityDocumentsForm",
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
export default class InvestorValidationsSuitabilityDocumentsForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dAttribute, pristine } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <FieldArray
            name="attachments"
            component={FileDropField}
            opts={{
              onDeleteField: dAttribute,
              maxFields: 2,
              selectOpts: {
                options: [
                  { name: "Financial Statement" },
                  { name: "CLP Bill" }
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
            className={`btn btn-primary btn-outline pull-right ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >{pristine ? "Continue" : "Save & Continue"}</button>
        </form>
      </div>
    )
  }
}
