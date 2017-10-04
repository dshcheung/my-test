import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

import { DEFAULT_USER_AVATAR } from '../../../../constants'

// import {
//   createOrUpdateMyStartupTeam, CREATE_OR_UPDATE_MY_STARTUP_TEAM
// } from '../../../../actions/my/startups/teams'

import MyStartupsAddEditTeamStoryModal from './add-edit-team-story'

import MyStartupsEditTeamFounderModal from './edit-team-founder'
import MyStartupsEditTeamMemberModal from './edit-team-member'

import MyStartupsAddTeamFounderModal from './add-team-founder'
import MyStartupsAddTeamMemberModal from './add-team-member'

const mapStateToProps = () => {
  return {
    // createOrUpdateMyStartupTeamInProcess: _.get(state.requestStatus, CREATE_OR_UPDATE_MY_STARTUP_TEAM)
  }
}

const mapDispatchToProps = () => {
  return {
    // createOrUpdateMyStartupTeam: bindActionCreators(createOrUpdateMyStartupTeam, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsAddEditTeamModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addEditTeam: true
    }

    this.createOrUpdateMyStartupTeam = this.createOrUpdateMyStartupTeam.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  createOrUpdateMyStartupTeam(values) {
    this.props.createOrUpdateMyStartupTeam(values, this.props.params, () => {
      this.props.close()
    })
  }

  open(modalName, editInfo, editIndex) {
    this.setState({ addEditTeam: false, [modalName]: true, editInfo, editIndex })
  }

  close(modalName) {
    this.setState({ addEditTeam: true, [modalName]: false, editInfo: null, editIndex: null })
  }

  render() {
    const { close, team, params } = this.props

    const story = _.get(team, 'story', '')
    const founders = _.get(team, 'founders', [])
    const members = _.get(team, 'members', [])

    const hasStory = !!story
    const hasFounders = founders.length > 0
    const hasMembers = members.length > 0

    const storyIconClass = hasStory ? "fa-pencil" : "fa-plus"

    return (
      <Modal show onHide={close} className={`form-modal ${!this.state.addEditTeam && 'hide'}`} id="modals-my-startups-add-edit-team">
        <Modal.Header closeButton>
          <Modal.Title>Edit Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className="story">
            <div className="h3 margin-top-0">
              Story
              <button
                className="btn btn-info pull-right"
                onClick={() => { this.open('addEditTeamStory') }}
              ><i className={`fa ${storyIconClass}`} /></button>
            </div>
            {
              hasStory ? (
                <div>{_.get(team, 'story', '')}</div>
              ) : (
                <div>Click Add Icon To Add Story</div>
              )
            }
          </section>
          <hr />
          <section className="founders">
            <div className="h3 margin-top-0">
              Founders
              <button
                className="btn btn-info pull-right"
                onClick={() => { this.open('addTeamFounder') }}
              ><i className="fa fa-plus" /></button>
            </div>
            {
              hasFounders ? (
                <div className="team-list">
                  {
                    founders.map((founder, i) => {
                      const avatar = _.get(founder, 'avatar.original') || DEFAULT_USER_AVATAR
                      const title = _.get(founder, 'title')
                      const name = _.get(founder, 'name')
                      return (
                        <div key={i} className="team-member" onClick={() => { this.open('editTeamFounder', founder, i) }}>
                          <img src={avatar} alt="Founder Avatar" />
                          {title && <div>{title}</div>}
                          {name && <div>{name}</div>}
                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <div>Click Add Icon To Add Founder</div>
              )
            }
          </section>
          <hr />
          <section className="members">
            <div className="h3 margin-top-0">
              Members
              <button
                className="btn btn-info pull-right"
                onClick={() => { this.open('addTeamMember') }}
              ><i className="fa fa-plus" /></button>
            </div>
            {
              hasMembers ? (
                <div className="team-list">
                  {
                    members.map((member, i) => {
                      const avatar = _.get(member, 'avatar.original') || DEFAULT_USER_AVATAR
                      const title = _.get(member, 'title')
                      const name = _.get(member, 'name')
                      return (
                        <div key={i} className="team-member" onClick={() => { this.open('editTeamMember', member, i) }}>
                          <img src={avatar} alt="Member Avatar" />
                          {title && <div>{title}</div>}
                          {name && <div>{name}</div>}
                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <div>Click Add Icon To Add Member</div>
              )
            }
          </section>
        </Modal.Body>

        {this.state.addEditTeamStory && <MyStartupsAddEditTeamStoryModal close={() => { this.close("addEditTeamStory") }} params={params} team={team} /> }

        {this.state.editTeamFounder && <MyStartupsEditTeamFounderModal close={() => { this.close("editTeamFounder") }} params={params} team={team} founder={this.state.editInfo} />}
        {this.state.editTeamMember && <MyStartupsEditTeamMemberModal close={() => { this.close("editTeamMember") }} params={params} team={team} member={this.state.editInfo} />}

        {this.state.addTeamFounder && <MyStartupsAddTeamFounderModal close={() => { this.close("addTeamFounder") }} params={params} team={team} />}
        {this.state.addTeamMember && <MyStartupsAddTeamMemberModal close={() => { this.close("addTeamMember") }} params={params} team={team} />}
      </Modal>
    )
  }
}
