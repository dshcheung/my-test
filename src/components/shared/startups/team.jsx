import React, { Component } from 'react'
import Element from 'react-scroll/modules/components/Element'

import { DEFAULT_USER_AVATAR } from '../../../constants'

import SharedStartupsTitle from './title'
import SharedStartupsEmpty from './empty'
import MyStartupsSTeamModal from '../../modals/my/startups/s-team'

export default class SharedStartupsTeam extends Component {
  constructor(props) {
    super(props)

    this.state = { sTeam: false }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open() {
    this.setState({ sTeam: true })
  }

  close() {
    this.setState({ sTeam: false })
  }

  render() {
    const { data, editable, routeParams } = this.props
    const { sTeam } = this.state
    const story = _.get(data, 'data.story', null)
    const storyExists = !!story

    const founders = _.get(data, 'data.founders', [])
    const emptyFounders = founders.length === 0

    const members = _.get(data, 'data.members', [])
    const emptyMembers = members.length === 0

    const isEmpty = !storyExists && emptyFounders && emptyMembers

    return (
      <Element name={data.title} className="section team clearfix">
        <SharedStartupsTitle
          title={data.title}
          editable={editable}
          open={() => { this.open() }}
        />

        <SharedStartupsEmpty
          title={data.title}
          condition={isEmpty}
          editable={editable}
        />

        {
          storyExists && (
            <div className="team-story" dangerouslySetInnerHTML={{ __html: story.decode() }} />
          )
        }

        {
          !emptyFounders && (
            <div className="team-founder margin-bottom-20">
              <div className="h3">Founders</div>
              {
                founders.map((member, i) => {
                  return (
                    <div key={i} className="row margin-bottom-10">
                      <div className="col-xs-12">
                        <div className="col-xs-6 col-sm-4 col-md-4">
                          <img className="full-width" src={member.avatar.original || DEFAULT_USER_AVATAR} alt={member.name} />
                        </div>
                        <div className="col-xs-6 col-sm-8 col-md-8">
                          <p>
                            <span className="text-bold header">{member.name}</span>
                            <span className="title">{member.title}</span>
                            <span className="description" dangerouslySetInnerHTML={{ __html: member.description.decode() }} />
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          )
        }

        {
          !emptyMembers && (
            <div className="team-member margin-bottom-20">
              <div className="h3">Important Members</div>
              {
                members.map((member, i) => {
                  return (
                    <div key={i} className="col-xs-6 col-sm-4 col-md-2">
                      <img className="full-width" src={member.avatar.original} alt={member.name} />
                      <p>
                        <span className="text-bold header">{member.name}</span>
                        <span className="title">{member.title}</span>
                      </p>
                    </div>
                  )
                })
              }
            </div>
          )
        }

        {
          sTeam && (
            <MyStartupsSTeamModal
              close={this.close}
              params={routeParams}
              team={data.data}
            />
          )
        }
      </Element>
    )
  }
}
