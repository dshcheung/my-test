import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  createOrUpdateMyStartupTeam, CREATE_OR_UPDATE_MY_STARTUP_TEAM
} from '../../../../actions/my/startups/teams'

import MyStartupTeamStoryForm from '../../../forms/my/startups/team-story'

const mapStateToProps = (state) => {
  return {
    createOrUpdateMyStartupTeamInProcess: _.get(state.requestStatus, CREATE_OR_UPDATE_MY_STARTUP_TEAM)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createOrUpdateMyStartupTeam: bindActionCreators(createOrUpdateMyStartupTeam, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsAddEditTeamStoryModal extends Component {
  constructor(props) {
    super(props)

    this.createOrUpdateMyStartupTeam = this.createOrUpdateMyStartupTeam.bind(this)
  }

  createOrUpdateMyStartupTeam(values) {
    this.props.createOrUpdateMyStartupTeam(values, {
      ...this.props.params,
      teamID: _.get(this.props.team, 'id')
    }, () => {
      this.props.close()
    })
  }

  render() {
    const { close, createOrUpdateMyStartupTeamInProcess, team } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Team Story</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupTeamStoryForm
            onSubmit={this.createOrUpdateMyStartupTeam}
            submitInProcess={createOrUpdateMyStartupTeamInProcess}
            initialValues={{
              story: _.get(team, 'story', '')
            }}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
