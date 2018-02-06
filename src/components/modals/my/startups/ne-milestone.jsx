import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cMyStartupMilestone, C_MY_STARTUP_MILESTONE,
  uMyStartupMilestone, U_MY_STARTUP_MILESTONE
} from '../../../../actions/my/startups/milestones'

import MyStartupsMilestoneForm from '../../../forms/my/startups/milestone'

const mapStateToProps = (state) => {
  return {
    cMyStartupMilestoneInProcess: _.get(state.requestStatus, C_MY_STARTUP_MILESTONE),
    uMyStartupMilestoneInProcess: _.get(state.requestStatus, U_MY_STARTUP_MILESTONE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cMyStartupMilestone: bindActionCreators(cMyStartupMilestone, dispatch),
    uMyStartupMilestone: bindActionCreators(uMyStartupMilestone, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsNEMilestoneModal extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    if (this.props.editMode) {
      this.props.uMyStartupMilestone(values, {
        ...this.props.params,
        milestoneID: this.props.milestone.id
      }, () => {
        this.props.close()
      })
    } else {
      this.props.cMyStartupMilestone(values, this.props.params, () => {
        this.props.close()
      })
    }
  }

  render() {
    const { close, cMyStartupMilestoneInProcess, uMyStartupMilestoneInProcess, editMode, milestone } = this.props

    const keyword = editMode ? "Edit" : "Add"
    const initialValues = editMode ? {
      detail: _.get(milestone, 'detail', ''),
      completedOn: moment(_.get(milestone, 'completed_on', moment().startOf('day'))).toDate()
    } : undefined

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Milestone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupsMilestoneForm
            onSubmit={this.onSubmit}
            submitInProcess={cMyStartupMilestoneInProcess || uMyStartupMilestoneInProcess}
            initialValues={initialValues}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
