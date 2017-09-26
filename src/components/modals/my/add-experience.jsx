import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  createMyExperience, CREATE_MY_EXPERIENCE
} from '../../../actions/my/experiences'

import MyExperienceForm from '../../forms/my/experience'

const mapStateToProps = (state) => {
  return {
    createMyExperienceInProcess: _.get(state.requestStatus, CREATE_MY_EXPERIENCE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMyExperience: bindActionCreators(createMyExperience, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AddMyExperienceModal extends Component {
  constructor(props) {
    super(props)

    this.createMyExperience = this.createMyExperience.bind(this)
  }

  createMyExperience(values) {
    this.props.createMyExperience(values, () => {
      this.props.close()
    })
  }

  render() {
    const { close, createMyExperienceInProcess } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyExperienceForm
            onSubmit={this.createMyExperience}
            submitInProcess={createMyExperienceInProcess}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
