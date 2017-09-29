import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  updateMyExperience, UPDATE_MY_EXPERIENCE
} from '../../../../actions/my/profile/experiences'

import MyProfileExperienceForm from '../../../forms/my/profile/experience'

const mapStateToProps = (state) => {
  return {
    updateMyExperienceInProcess: _.get(state.requestStatus, UPDATE_MY_EXPERIENCE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMyExperience: bindActionCreators(updateMyExperience, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyProfileEditExperienceModal extends Component {
  constructor(props) {
    super(props)

    this.updateMyExperience = this.updateMyExperience.bind(this)
  }

  updateMyExperience(values) {
    this.props.updateMyExperience(values, {
      myExperienceID: _.get(this.props.experience, 'id')
    }, () => {
      this.props.close()
    })
  }

  render() {
    const { close, updateMyExperienceInProcess, experience } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyProfileExperienceForm
            onSubmit={this.updateMyExperience}
            submitInProcess={updateMyExperienceInProcess}
            initialValues={{
              company: _.get(experience, "company", ""),
              year: moment(_.get(experience, "year", moment())).toDate(),
              position: _.get(experience, "position", ""),
              description: _.get(experience, "description", "")
            }}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
