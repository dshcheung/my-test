import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  updateMyEducation, UPDATE_MY_EDUCATION
} from '../../../actions/my/educations'

import MyEducationForm from '../../forms/my/education'

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
export default class EditMyExperienceModal extends Component {
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

    // TODO: education level
    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Education</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyEducationForm
            onSubmit={this.updateMyEducation}
            submitInProcess={updateMyEducationInProcess}
            initialValues={{
              school: _.get(education, "school", ""),
              year: moment.unix(_.get(education, "year", moment().unix())).toDate()
            }}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
