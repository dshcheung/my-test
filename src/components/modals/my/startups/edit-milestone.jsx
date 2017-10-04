import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  updateMyStartupMilestone, UPDATE_MY_STARTUP_MILESTONE
} from '../../../../actions/my/startups/milestones'

import MyStartupMilestoneForm from '../../../forms/my/startups/milestone'

const mapStateToProps = (state) => {
  return {
    updateMyStartupMilestoneInProcess: _.get(state.requestStatus, UPDATE_MY_STARTUP_MILESTONE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMyStartupMilestone: bindActionCreators(updateMyStartupMilestone, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsEditMilestoneModal extends Component {
  constructor(props) {
    super(props)

    this.updateMyStartupMilestone = this.updateMyStartupMilestone.bind(this)
  }

  updateMyStartupMilestone(values) {
    this.props.updateMyStartupMilestone(values, {
      ...this.props.params,
      milestoneID: this.props.milestone.id
    }, () => {
      this.props.close()
    })
  }

  render() {
    const { close, updateMyStartupMilestoneInProcess, milestone } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Milestone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupMilestoneForm
            onSubmit={this.updateMyStartupMilestone}
            submitInProcess={updateMyStartupMilestoneInProcess}
            initialValues={{
              detail: _.get(milestone, 'detail', ''),
              completedOn: moment(_.get(milestone, 'completed_on', moment().startOf('day'))).toDate()
            }}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
