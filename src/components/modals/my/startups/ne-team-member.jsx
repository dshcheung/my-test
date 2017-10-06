import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cuMyStartupTeam, CU_MY_STARTUP_TEAM
} from '../../../../actions/my/startups/team'

import MyStartupTeamMemberForm from '../../../forms/my/startups/team-member'

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
export default class MyStartupsNEMemberModal extends Component {
  constructor(props) {
    super(props)

    this.cuMyStartupTeam = this.cuMyStartupTeam.bind(this)
  }

  cuMyStartupTeam(values) {
    this.props.cuMyStartupTeam({
      members: [
        {
          id: _.get(this.props.member, 'id', null),
          name: _.get(values, 'name', null),
          title: _.get(values, 'title', null),
          avatar: _.get(values, 'avatar[0]', null)
        }
      ]
    }, this.props.params, () => {
      this.props.close()
    }, this.props.editMode, "Member")
  }

  render() {
    const { close, cuMyStartupTeamInProcess, editMode, member } = this.props

    const keyword = editMode ? "Edit" : "Add"
    const initialValues = editMode ? {
      name: _.get(member, 'name', ''),
      title: _.get(member, 'title', '')
    } : undefined

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Team Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupTeamMemberForm
            onSubmit={this.cuMyStartupTeam}
            submitInProcess={cuMyStartupTeamInProcess}
            initialValues={initialValues}
            avatarUrl={_.get(member, 'avatar.original', '')}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
