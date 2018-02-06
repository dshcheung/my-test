import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cuMyStartupTeam, CU_MY_STARTUP_TEAM
} from '../../../../actions/my/startups/team'

import MyStartupsTeamFounderForm from '../../../forms/my/startups/team-founder'

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
export default class MyStartupsNEFounderModal extends Component {
  constructor(props) {
    super(props)

    this.cuMyStartupTeam = this.cuMyStartupTeam.bind(this)
  }

  cuMyStartupTeam(values) {
    this.props.cuMyStartupTeam({
      founders: [
        {
          id: _.get(this.props.founder, 'id', null),
          name: _.get(values, 'name', null),
          title: _.get(values, 'title', null),
          description: _.get(values, 'description', null),
          avatar: _.get(values, 'avatar[0]', null)
        }
      ]
    }, this.props.params, () => {
      this.props.close()
    }, this.props.editMode, "Founder")
  }

  render() {
    const { close, cuMyStartupTeamInProcess, editMode, founder } = this.props

    const keyword = editMode ? "Edit" : "Add"
    const initialValues = editMode ? {
      name: _.get(founder, 'name', ''),
      title: _.get(founder, 'title', ''),
      description: _.get(founder, 'description', '')
    } : undefined

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Team Founder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupsTeamFounderForm
            onSubmit={this.cuMyStartupTeam}
            submitInProcess={cuMyStartupTeamInProcess}
            initialValues={initialValues}
            avatarUrl={_.get(founder, 'avatar.original', '')}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
