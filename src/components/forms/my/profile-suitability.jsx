import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'
import TextArea from '../../shared/form-elements/text-area'
import SelectField from '../../shared/form-elements/select-field'
import FileField from '../../shared/form-elements/file-field'
import DynamicFieldArray from '../../shared/form-elements/dynamic-field-array'

@reduxForm({
  form: "MyProfileSuitabilityForm",
  validate: (values) => {
    return Validators({
      numberOfDependents: ["presences"],
      employmentStatus: ["presences"],
      occupation: ["presences"],
      currentNetIncome: ["presences"],
      bankStatement: ["filePresences"],
      aum: ["filePresences"],
      educationLevel: ["presences"],
      investmentDetails: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: true,
          childFields: {
            years_of_experience: ["presences"],
            scale: ["presences"],
            type_of_product: ["presences"],
            frequency: ["presences"],
          }
        }
      }],
      sourceOfFunds: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: true,
          childFields: {
            fund_type: ["presences"],
            detail: ["presences"],
          }
        }
      }]
    }, values, ["investmentDetails", "sourceOfFunds"])
  },
  enableReinitialize: true
})
export default class MyProfileSuitabilityForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dMPSAttributes } = this.props

    return (
      <div id="forms-my-profile-suitability" className={optClass}>
        <h1 className="form-title margin-bottom-20 margin-top-0">My Profile Suitability</h1>

        <form onSubmit={handleSubmit}>
          <Field
            name="numberOfDependents"
            component={TextField}
            opts={{
              type: "number",
              label: "Number of Dependents *"
            }}
          />

          <Field // TODO2: Add Immovable
            name="employmentStatus"
            component={SelectField}
            opts={{
              label: "Employment Status *",
              placeholder: "Select One",
              options: [
                { id: 1, name: "Employed" },
                { id: 2, name: "Unemployed" },
                { id: 3, name: "Self Employed" }
              ],
              valueKey: "id",
              nameKey: "name"
            }}
          />

          <Field
            name="occupation"
            component={TextField}
            opts={{
              type: "text",
              label: "Occupation *"
            }}
          />

          <Field
            name="currentNetIncome"
            component={TextField}
            opts={{
              type: "number",
              label: "Current Net Income *"
            }}
          />

          <Field
            name="bankStatement"
            component={FileField}
            opts={{
              label: "Bank Statement *",
              urlKey: "original"
            }}
          />

          <Field
            name="aum"
            component={FileField}
            opts={{
              label: "Asset Under Management *",
              urlKey: "original"
            }}
          />

          <Field // TODO2: Add Immovable
            name="educationLevel"
            component={SelectField}
            opts={{
              label: "Education Level *",
              placeholder: "Select One",
              options: [
                { id: 1, name: "A" },
                { id: 2, name: "B" },
                { id: 3, name: "C" }
              ],
              valueKey: "id",
              nameKey: "name"
            }}
          />

          <FieldArray
            name="investmentDetails"
            component={DynamicFieldArray}
            opts={{
              label: "Investment Details *",
              groupName: "Investment",
              newFieldInit: {},
              onDeleteField: dMPSAttributes,
              dynamicFields: [
                {
                  key: "years_of_experience",
                  component: TextField,
                  opts: {
                    type: "number",
                    label: "Years of Experiences *"
                  }
                },
                {
                  key: "scale",
                  component: TextField,
                  opts: {
                    type: "number",
                    label: "Scale *"
                  }
                },
                {
                  key: "type_of_product",
                  component: SelectField,
                  opts: {
                    label: "Type of Product *",
                    placeholder: "Select One",
                    options: [
                      { id: 1, name: "A" },
                      { id: 2, name: "B" },
                      { id: 3, name: "C" }
                    ],
                    valueKey: "id",
                    nameKey: "name"
                  }
                },
                {
                  key: "frequency",
                  component: SelectField,
                  opts: {
                    label: "Frequency *",
                    placeholder: "Select One",
                    options: [
                      { id: 1, name: "A" },
                      { id: 2, name: "B" },
                      { id: 3, name: "C" }
                    ],
                    valueKey: "id",
                    nameKey: "name"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="sourceOfFunds"
            component={DynamicFieldArray}
            opts={{
              label: "Source of Funds *",
              groupName: "Source",
              newFieldInit: {},
              onDeleteField: dMPSAttributes,
              dynamicFields: [
                {
                  key: "fund_type",
                  component: SelectField,
                  opts: {
                    label: "Fund Type *",
                    placeholder: "Select One",
                    options: [
                      { id: 1, name: "A" },
                      { id: 2, name: "B" },
                      { id: 3, name: "C" }
                    ],
                    valueKey: "id",
                    nameKey: "name"
                  }
                },
                {
                  key: "detail",
                  component: TextArea,
                  opts: {
                    label: "Detail *"
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
            Submit
          </button>
        </form>
      </div>
    )
  }
}
