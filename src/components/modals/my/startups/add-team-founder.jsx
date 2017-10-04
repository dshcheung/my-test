import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  createOrUpdateMyStartupTeam, CREATE_OR_UPDATE_MY_STARTUP_TEAM
} from '../../../../actions/my/startups/teams'

import MyStartupTeamFounderForm from '../../../forms/my/startups/team-founder'

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
export default class MyStartupsAddTeamFounderModal extends Component {
  constructor(props) {
    super(props)

    this.createOrUpdateMyStartupTeam = this.createOrUpdateMyStartupTeam.bind(this)
  }

  createOrUpdateMyStartupTeam(values) {
    this.props.createOrUpdateMyStartupTeam({
      founders: [
        {
          name: _.get(values, 'name', null),
          title: _.get(values, 'title', null),
          description: _.get(values, 'description', null),
          avatar: _.get(values, 'avatar[0]', null)
        }
      ]
    }, {
      ...this.props.params,
      teamID: _.get(this.props.team, 'id')
    }, () => {
      this.props.close()
    })
  }

  render() {
    const { close, createOrUpdateMyStartupTeamInProcess } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Team Founder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupTeamFounderForm
            onSubmit={this.createOrUpdateMyStartupTeam}
            submitInProcess={createOrUpdateMyStartupTeamInProcess}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
