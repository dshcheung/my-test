import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'

import {
  getImmovable, GET_IMMOVABLE_EDUCATION_LEVEL,
  resetImmovable
} from '../../../actions/immovables'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'
import SelectField from '../../shared/form-elements/select-field'
import DatetimePicker from '../../shared/form-elements/datetime-picker'

const mapStateToProps = (state) => {
  return {
    getEducationLevelInProcess: _.get(state.requestStatus, GET_IMMOVABLE_EDUCATION_LEVEL),
    educationLevel: _.get(state.immovables, 'education_levels', []).map((el) => {
      return { ...el, name: el.name_localized }
    }),
    currentUser: _.get(state, 'session'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getImmovable: bindActionCreators(getImmovable, dispatch),
    resetImmovable: bindActionCreators(resetImmovable, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({
  form: "MyEducationForm",
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
export default class MyEducationForm extends Component {
  componentWillMount() {
    this.props.getImmovable({ immovableID: "education_level" })
  }

  componentWillUnmount() {
    this.props.resetImmovable()
  }

  render() {
    const { handleSubmit, submitInProcess, optClass, getEducationLevelInProcess, educationLevel } = this.props

    return (
      <div id="forms-my-education" className={optClass}>
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
            options={educationLevel}
            requestInProcess={getEducationLevelInProcess}
            opts={{
              label: "Education Level *",
              placeholder: "Select Educuation Level"
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
