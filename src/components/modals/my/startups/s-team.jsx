import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { DEFAULT_USER_AVATAR } from '../../../../constants'

import {
  dMyStartupTeamMember, D_MY_STARTUP_TEAM_MEMBER
} from '../../../../actions/my/startups/team'

import MyStartupsNETeamStoryModal from './ne-team-story'
import MyStartupsNETeamFounderModal from './ne-team-founder'
import MyStartupsNETeamMemberModal from './ne-team-member'

const mapStateToProps = (state) => {
  return {
    requestStatus: _.get(state, 'requestStatus')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dMyStartupTeamMember: bindActionCreators(dMyStartupTeamMember, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsSTeamModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sTeam: true
    }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open(modalName, stateEditMode, editInfo, editIndex) {
    this.setState({ sTeam: false, [modalName]: true, stateEditMode, editInfo, editIndex })
  }

  close(modalName) {
    this.setState({ sTeam: true, [modalName]: false, stateEditMode: false, editInfo: null, editIndex: null })
  }

  dMyStartupTeamMember(id, keyword) {
    this.props.dMyStartupTeamMember({
      [keyword]: [
        {
          id,
          _destroy: true
        }
      ]
    }, this.props.params, keyword)
  }

  render() {
    const { close, editMode, team, params, requestStatus } = this.props
    const { stateEditMode, editInfo } = this.state

    const story = _.get(team, 'story', '')
    const founders = _.get(team, 'founders', [])
    const members = _.get(team, 'members', [])

    const hasStory = !!story
    const hasFounders = founders.length > 0
    const hasMembers = members.length > 0

    const storyIconClass = hasStory ? "fa-pencil" : "fa-plus"
    const keyword = editMode ? "Edit" : "Add"

    return (
      <Modal show onHide={close} className={`form-modal ${!this.state.sTeam && 'hide'}`} id="modals-my-startups-s-team">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className="story">
            <div className="h3 margin-top-0">
              Story
              <button
                className="btn btn-info pull-right"
                onClick={() => { this.open('neTeamStory', hasStory, story) }}
              ><i className={`fa ${storyIconClass}`} /></button>
            </div>
            {
              hasStory ? (
                <div>{story}</div>
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
                onClick={() => { this.open('neFounder', false) }}
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
                        <div key={i} className="team-member">
                          <img src={avatar} alt="Founder Avatar" />
                          {title && <div>{title}</div>}
                          {name && <div>{name}</div>}
                          <button
                            className="btn btn-info edit pull-right"
                            disabled={_.get(requestStatus, `${D_MY_STARTUP_TEAM_MEMBER}_${founder.id}`)}
                            onClick={() => { this.open('neFounder', true, founder, i) }}
                          >
                            <i className="fa fa-pencil" />
                          </button>
                          <button
                            className="btn btn-danger btn-outline delete pull-right"
                            disabled={_.get(requestStatus, `${D_MY_STARTUP_TEAM_MEMBER}_${founder.id}`)}
                            onClick={() => { this.dMyStartupTeamMember(founder.id, 'founders') }}
                          >
                            <i className="fa fa-trash" />
                          </button>
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
                onClick={() => { this.open('neMember', false) }}
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
                        <div key={i} className="team-member">
                          <img src={avatar} alt="Member Avatar" />
                          {title && <div>{title}</div>}
                          {name && <div>{name}</div>}
                          <button
                            className="btn btn-info edit pull-right"
                            disabled={_.get(requestStatus, `${D_MY_STARTUP_TEAM_MEMBER}_${member.id}`)}
                            onClick={() => { this.open('neMember', true, member, i) }}
                          >
                            <i className="fa fa-pencil" />
                          </button>
                          <button
                            className="btn btn-danger btn-outline delete pull-right"
                            disabled={_.get(requestStatus, `${D_MY_STARTUP_TEAM_MEMBER}_${member.id}`)}
                            onClick={() => { this.dMyStartupTeamMember(member.id, 'members') }}
                          >
                            <i className="fa fa-trash" />
                          </button>
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

        {this.state.neTeamStory && <MyStartupsNETeamStoryModal close={() => { this.close("neTeamStory") }} params={params} editMode={stateEditMode} story={editInfo} /> }
        {this.state.neFounder && <MyStartupsNETeamFounderModal close={() => { this.close("neFounder") }} params={params} editMode={stateEditMode} founder={editInfo} />}
        {this.state.neMember && <MyStartupsNETeamMemberModal close={() => { this.close("neMember") }} params={params} editMode={stateEditMode} member={editInfo} />}
      </Modal>
    )
  }
}
