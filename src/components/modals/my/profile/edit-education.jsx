import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  updateMyEducation, UPDATE_MY_EDUCATION
} from '../../../../actions/my/educations'

import MyProfileEducationForm from '../../../forms/my/profile/education'

const mapStateToProps = (state) => {
  return {
    updateMyEducationInProcess: _.get(state.requestStatus, UPDATE_MY_EDUCATION)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMyEducation: bindActionCreators(updateMyEducation, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyProfileEditEducationModal extends Component {
  constructor(props) {
    super(props)

    this.updateMyEducation = this.updateMyEducation.bind(this)
  }

  updateMyEducation(values) {
    this.props.updateMyEducation(values, {
      myEducationID: _.get(this.props.education, 'id')
    }, () => {
      this.props.close()
    })
  }

  render() {
    const { close, updateMyEducationInProcess, education } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Education</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyProfileEducationForm
            onSubmit={this.updateMyEducation}
            submitInProcess={updateMyEducationInProcess}
            initialValues={{
              school: _.get(education, "school", ""),
              year: moment(_.get(education, "year", moment())).toDate(),
              educationLevel: _.get(education, 'education_level.id', "")
            }}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
