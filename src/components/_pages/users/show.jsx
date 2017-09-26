import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AutoAffix from 'react-overlays/lib/AutoAffix'
import Link from 'react-scroll/modules/components/Link'
import Element from 'react-scroll/modules/components/Element'

import { DEFAULT_PIC } from '../../../constants'

import { getFullName } from '../../../services/utils'

import {
  getUser, GET_USER,
  resetUser
} from '../../../actions/users'

import LoadingSpinner from '../../shared/loading-spinner'
import ImageBanner from '../../shared/image-banner'

import AddMyExperienceModal from '../../modals/my/add-experience'
import AddMyEducationModal from '../../modals/my/add-education'
import AddMyEndorsementModal from '../../modals/my/add-endorsement'
import EditMyExperienceModal from '../../modals/my/edit-experience'
import EditMyEducationModal from '../../modals/my/edit-education'
import EditMyEndorsementModal from '../../modals/my/edit-endorsement'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session'),
    user: _.get(state, 'user', null),
    getUserInProcess: _.get(state.requestStatus, GET_USER)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: bindActionCreators(getUser, dispatch),
    resetUser: bindActionCreators(resetUser, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class UsersShow extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  componentWillMount() {
    this.props.getUser({ params: this.props.routeParams })
  }

  componentWillUnmount() {
    this.props.resetUser()
  }

  open(name, editInfo) {
    this.setState({ [name]: true, editInfo })
  }

  close(name) {
    this.setState({ [name]: false, editInfo: null })
  }

  render() {
    const { currentUser, user, getUserInProcess } = this.props

    if (getUserInProcess) return <LoadingSpinner />

    if (!user) {
      return (
        <div className="text-center">
          <h3>No Such Startup</h3>
        </div>
      )
    }

    const editable = currentUser.id === this.props.routeParams.userID

    return (
      <div id="pages-users-show" className="container-fluid">
        <div className="row">
          <section className="banner">
            <ImageBanner
              src={_.get(user, "profile.banner.original", null)}
            />
            <img
              className="user-avatar"
              src={_.get(user, "profile.avatar.original", null) || DEFAULT_PIC}
              alt="avatar"
            />
            <div className="details">
              <span className="h1">{getFullName(user)}</span>
              <p>{_.get(user, "profile.bio")}</p>
            </div>
          </section>

          <section className="more-info clearfix">
            <div className="col-xs-12 col-sm-3">
              <AutoAffix viewportOffsetTop={100} container={this}>
                <div className="sidebar-wrapper">
                  <ul className="scrollto">
                    {
                      (editable || _.get(user, "experiences[0]")) && (
                        <li><Link to="Experiences" spy smooth duration={500} offset={-100}>Experiences</Link></li>
                      )
                    }
                    {
                      (editable || _.get(user, "educations[0]")) && (
                        <li><Link to="Educations" spy smooth duration={500} offset={-100}>Educations</Link></li>
                      )
                    }
                    {
                      (editable || _.get(user, "endorsements[0]")) && (
                        <li><Link to="Endorsements" spy smooth duration={500} offset={-100}>Endorsements</Link></li>
                      )
                    }
                  </ul>
                </div>
              </AutoAffix>
            </div>
            <div className="col-xs-12 col-sm-9">
              {(editable || _.get(user, "experiences[0]")) && moreInfoContentExperiences(editable, "Experiences", user.experiences, this.open)}
              {(editable || _.get(user, "educations[0]")) && moreInfoContentEducations(editable, "Educations", user.educations, this.open)}
              {(editable || _.get(user, "endorsements[0]")) && moreInfoContentEndorsements(editable, "Endorsements", user.endorsements, this.open)}
            </div>
          </section>
        </div>

        {this.state.addExperience && <AddMyExperienceModal close={() => { this.close("addExperience") }} />}
        {this.state.addEducation && <AddMyEducationModal close={() => { this.close("addEducation") }} />}
        {this.state.addEndorsement && <AddMyEndorsementModal close={() => { this.close("addEndorsement") }} />}
        {this.state.editExperience && <EditMyExperienceModal close={() => { this.close("editExperience") }} experience={this.editInfo} />}
        {this.state.editEducation && <EditMyEducationModal close={() => { this.close("editEducation") }} education={this.editInfo} />}
        {this.state.editEndorsement && <EditMyEndorsementModal close={() => { this.close("editEndorsement") }} endorsement={this.editInfo} />}
      </div>
    )
  }
}

const titleAndAdd = (editable, title, open, modalName) => {
  return (
    <div className="h2">
      {title}
      {
        editable && (
          <button
            className="btn btn-info pull-right add"
            onClick={() => { open(modalName) }}
          ><i className="fa fa-plus" /></button>
        )
      }
    </div>
  )
}

const emptyAndAdd = (editable, title, execute) => {
  if (editable && execute) {
    return (
      <div>
        <p>Click Add Icon To Add {title}</p>
      </div>
    )
  }

  return null
}

const moreInfoContentExperiences = (editable, title, items = [], open) => {
  return (
    <Element name={title} className="section">
      {titleAndAdd(editable, title, open, "addExperience")}
      {emptyAndAdd(editable, title, items.length === 0)}
      {
        items.length !== 0 && (
          <div className="row">
            <div className="col-xs-12">
              <ul className="list">
                {
                  items.map((item, k) => {
                    return (
                      <li key={k} onClick={() => { open("editExperience", item) }}>
                        a
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        )
      }
    </Element>
  )
}

const moreInfoContentEducations = (editable, title, items = [], open) => {
  return (
    <Element name={title} className="section">
      {titleAndAdd(editable, title, open, "addEducation")}
      {emptyAndAdd(editable, title, items.length === 0)}
      {
        items.length !== 0 && (
          <div className="row">
            <div className="col-xs-12">
              <ul className="list">
                {
                  items.map((item, k) => {
                    return (
                      <li key={k} onClick={() => { open("editEducation", item) }}>
                        a
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        )
      }
    </Element>
  )
}

const moreInfoContentEndorsements = (editable, title, items = [], open) => {
  return (
    <Element name={title} className="section">
      {titleAndAdd(editable, title, open, "addEndorsement")}
      {emptyAndAdd(editable, title, items.length === 0)}
      {
        items.length !== 0 && (
          <div className="row">
            <div className="col-xs-12">
              <ul className="list">
                {
                  items.map((item, k) => {
                    return (
                      <li key={k} onClick={() => { open("editEndorsement", item) }}>
                        a
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        )
      }
    </Element>
  )
}
