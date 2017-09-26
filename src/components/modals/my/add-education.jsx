import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  createMyEducation, CREATE_MY_EDUCATION
} from '../../../actions/my/educations'

import MyEducationForm from '../../forms/my/education'

const mapStateToProps = (state) => {
  return {
    createMyEducationInProcess: _.get(state.requestStatus, CREATE_MY_EDUCATION)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMyEducation: bindActionCreators(createMyEducation, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AddMyExperienceModal extends Component {
  constructor(props) {
    super(props)

    this.createMyEducation = this.createMyEducation.bind(this)
  }

  createMyEducation(values) {
    this.props.createMyEducation(values, () => {
      this.props.close()
    })
  }

  render() {
    const { close, createMyEducationInProcess } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Education</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyEducationForm
            onSubmit={this.createMyEducation}
            submitInProcess={createMyEducationInProcess}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
