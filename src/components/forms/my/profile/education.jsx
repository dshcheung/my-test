import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'

import {
  gImmovable, G_IMMOVABLE_EDUCATION_LEVEL,
  resetImmovable
} from '../../../../actions/immovables'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'
import SelectField from '../../../shared/form-elements/select-field'
import DatetimePicker from '../../../shared/form-elements/datetime-picker'

const mapStateToProps = (state) => {
  return {
    getEducationLevelInProcess: _.get(state.requestStatus, G_IMMOVABLE_EDUCATION_LEVEL),
    educationLevel: _.get(state.immovables, 'education_level.education_levels', []),
    currentUser: _.get(state, 'session'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gImmovable: bindActionCreators(gImmovable, dispatch),
    resetImmovable: bindActionCreators(resetImmovable, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({
  form: "MyProfileEducationForm",
  validate: (values) => {
    return Validators({
      school: ["presences"],
      year: ["presences"],
      educationLevel: ["presences"]
    }, values)
  },
  initialValues: {
    year: moment().startOf('day').toDate()
  }
})
export default class MyProfileEducationForm extends Component {
  componentWillMount() {
    this.props.gImmovable({ immovableID: "education_level" })
  }

  componentWillUnmount() {
    this.props.resetImmovable()
  }

  render() {
    const { handleSubmit, submitInProcess, optClass, getEducationLevelInProcess, educationLevel } = this.props

    console.log(educationLevel)

    return (
      <div id="forms-my-profile-education" className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="school"
            component={TextField}
            opts={{
              type: "text",
              label: "School Name *"
            }}
          />

          <Field
            name="educationLevel"
            component={SelectField}
            opts={{
              label: "Education Level *",
              placeholder: "Select Educuation Level",
              options: educationLevel,
              requestInProcess: getEducationLevelInProcess,
              valueKey: "id",
              nameKey: "name"
            }}
          />

          <Field
            name="year"
            component={DatetimePicker}
            opts={{
              label: "Year *",
              views: ["decade"],
              time: false,
              format: "YYYY"
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
