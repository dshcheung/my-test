import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cuMyStartupTeam, CU_MY_STARTUP_TEAM
} from '../../../../actions/my/startups/teams'

import MyStartupTeamStoryForm from '../../../forms/my/startups/team-story'

const mapStateToProps = (state) => {
  return {
    cuMyStartupTeamInProcess: _.get(state.requestStatus, CU_MY_STARTUP_TEAM)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cuMyStartupTeam: bindActionCreators(cuMyStartupTeam, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsNETeamStoryModal extends Component {
  constructor(props) {
    super(props)

    this.cuMyStartupTeam = this.cuMyStartupTeam.bind(this)
  }

  cuMyStartupTeam(values) {
    this.props.cuMyStartupTeam(values, this.props.params, () => {
      this.props.close()
    }, this.props.editMode, "Story")
  }

  render() {
    const { close, cuMyStartupTeamInProcess, editMode, team } = this.props

    const keyword = editMode ? "Edit" : "Add"
    const initialValues = editMode ? {
      story: _.get(team, 'story', '')
    } : undefined

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Team Story</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupTeamStoryForm
            onSubmit={this.cuMyStartupTeam}
            submitInProcess={cuMyStartupTeamInProcess}
            initialValues={initialValues}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
