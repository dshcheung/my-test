import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  createMyStartupMilestone, CREATE_MY_STARTUP_MILESTONE
} from '../../../../actions/my/startups/milestones'

import MyStartupMilestoneForm from '../../../forms/my/startups/milestone'

const mapStateToProps = (state) => {
  return {
    createMyStartupMilestoneInProcess: _.get(state.requestStatus, CREATE_MY_STARTUP_MILESTONE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMyStartupMilestone: bindActionCreators(createMyStartupMilestone, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsAddMilestoneModal extends Component {
  constructor(props) {
    super(props)

    this.createMyStartupMilestone = this.createMyStartupMilestone.bind(this)
  }

  createMyStartupMilestone(values) {
    this.props.createMyStartupMilestone(values, this.props.params, () => {
      this.props.close()
    })
  }

  render() {
    const { close, createMyStartupMilestoneInProcess } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Milestone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupMilestoneForm
            onSubmit={this.createMyStartupMilestone}
            submitInProcess={createMyStartupMilestoneInProcess}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
