import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AutoAffix from 'react-overlays/lib/AutoAffix'
import Link from 'react-scroll/modules/components/Link'
import Element from 'react-scroll/modules/components/Element'

import { DEFAULT_USER_AVATAR, DEFAULT_USER_BANNER } from '../../../constants'

import { getFullName } from '../../../services/utils'

import {
  GET_MY_PROFILE
} from '../../../actions/my/profile'

import {
  getUser, GET_USER,
  resetUser
} from '../../../actions/users'

import { deleteMyExperience, DELETE_MY_EXPERIENCE } from '../../../actions/my/profile/experiences'
import { deleteMyEducation, DELETE_MY_EDUCATION } from '../../../actions/my/profile/educations'
import { deleteMyEndorsement, DELETE_MY_ENDORSEMENT } from '../../../actions/my/profile/endorsements'

import LoadingSpinner from '../../shared/loading-spinner'
import ImageBanner from '../../shared/image-banner'

import MyProfileEditProfileModal from '../../modals/my/profile/edit-profile'
import MyProfileAddExperienceModal from '../../modals/my/profile/add-experience'
import MyProfileAddEducationModal from '../../modals/my/profile/add-education'
import MyProfileAddEndorsementModal from '../../modals/my/profile/add-endorsement'
import MyProfileEditExperienceModal from '../../modals/my/profile/edit-experience'
import MyProfileEditEducationModal from '../../modals/my/profile/edit-education'
import MyProfileEditEndorsementModal from '../../modals/my/profile/edit-endorsement'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session'),
    user: _.get(state, 'user', null),
    getUserInProcess: _.get(state.requestStatus, GET_USER),
    getMyProfileInProcess: _.get(state.requestStatus, GET_MY_PROFILE),
    requestStatus: _.get(state, 'requestStatus')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: bindActionCreators(getUser, dispatch),
    resetUser: bindActionCreators(resetUser, dispatch),
    deleteMyExperience: bindActionCreators(deleteMyExperience, dispatch),
    deleteMyEducation: bindActionCreators(deleteMyEducation, dispatch),
    deleteMyEndorsement: bindActionCreators(deleteMyEndorsement, dispatch)
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
    const currentUserID = _.get(this.props, 'currentUser.id', null)
    const routeUserID = _.get(this.props, 'routeParams.userID')
    if (currentUserID === routeUserID) {
      this.props.getUser({ params: this.props.routeParams })
    }
  }

  componentWillReceiveProps(nextProps) {
    const currentUser = _.get(nextProps, 'currentUser', null)
    const editable = _.get(currentUser, 'id') === nextProps.routeParams.userID

    this.setState({ editable, user: editable ? currentUser : _.get(nextProps, 'user', null) })

    // if (this.state.editName) {
    //   this.setState({ editInfo: _.get(nextProps, this.state.editName) })
    // }
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

  title(title, modalName, editMode, editInfo, editName) {
    const iconClass = editMode ? "fa-pencil" : "fa-plus"
    return (
      <div className="h2">
        {title}
        {
          this.state.editable && (
            <button
              className="btn btn-info pull-right add"
              onClick={() => { this.open(modalName, editMode, editInfo, editName) }}
            ><i className={`fa ${iconClass}`} /></button>
          )
        }
      </div>
    )
  }

  emptyAndAdd(title, execute, editMode) {
    const keyWord = editMode ? "Edit" : "Add"
    if (this.state.editable && execute) {
      return (
        <div>
          <p>{`Click ${keyWord} Icon To ${keyWord} ${title}`}</p>
        </div>
      )
    }

    return null
  }

  moreInfoContacts() {
    const title = "Contacts"
    const { user } = this.state

    return (
      <Element name={title} className="section">
        <h2 className="h2">{title}</h2>
        <div className="row">
          <div className="col-xs-12"><strong>Email:</strong> {user.email || "N/A"}</div>
          <div className="col-xs-12"><strong>Mobile:</strong> {user.mobile || "N/A"}</div>
        </div>
      </Element>
    )
  }

  moreInfoContentExperiences() {
    const { requestStatus } = this.props
    const { user, editable } = this.state
    const title = "Experiences"
    const highlights = _.get(user, 'experiences', [])

    return (
      <Element name={title} className="section">
        {this.title(title, "addExperience", false)}
        {this.emptyAndAdd(title, highlights.length === 0)}
        {
          highlights.length !== 0 && (
            <div className="row">
              {
                highlights.map((highlight, k) => {
                  return (
                    <div key={k} className="col-xs-12 experience">
                      <div className="title"><strong>{highlight.position}</strong>, {highlight.company}</div>
                      <div className="year">{highlight.year && moment(highlight.year).format('YYYY')}</div>
                      <div className="description">{highlight.description}</div>
                      {
                        editable && (
                          <button className="btn btn-info edit" onClick={() => { this.open("editExperience", highlight) }}>
                            <i className="fa fa-pencil" />
                          </button>
                        )
                      }
                      {
                        editable && (
                          <button
                            className="btn btn-danger btn-outline delete"
                            disabled={_.get(requestStatus, `${DELETE_MY_EXPERIENCE}_${highlight.id}`)}
                            onClick={() => { this.props.deleteMyExperience({ myExperienceID: highlight.id }) }}
                          >
                            <i className="fa fa-trash" />
                          </button>
                        )
                      }
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </Element>
    )
  }

  moreInfoContentEducations() {
    const { requestStatus } = this.props
    const { user } = this.state
    const title = "Educations"
    const educations = _.get(user, 'educations', [])

    return (
      <Element name={title} className="section">
        {this.title(title, "addEducation", false)}
        {this.emptyAndAdd(title, educations.length === 0)}
        {
          educations.length !== 0 && (
            <div className="row">
              {
                educations.map((education, k) => {
                  return (
                    <div key={k} className="col-xs-12 education">
                      <div className="title"><strong>{education.education_level.name}</strong>, {education.school}</div>
                      <div className="year">{education.year && moment(education.year).format('YYYY')}</div>
                      <button className="btn btn-info edit" onClick={() => { open("editEducation", education) }}>
                        <i className="fa fa-pencil" />
                      </button>
                      <button
                        className="btn btn-danger btn-outline delete"
                        disabled={_.get(requestStatus, `${DELETE_MY_EDUCATION}_${education.id}`)}
                        onClick={() => { this.props.deleteMyEducation({ myEducationID: education.id }) }}
                      >
                        <i className="fa fa-trash" />
                      </button>
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </Element>
    )
  }

  moreInfoContentEndorsements() {
    const { requestStatus } = this.props
    const { user } = this.state
    const title = "Endorsements"
    const endorsements = _.get(user, 'endorsements', [])
    return (
      <Element name={title} className="section">
        {this.title(title, "addEndorsement", false)}
        {this.emptyAndAdd(title, endorsements.length === 0)}
        {
          endorsements.length !== 0 && (
            <div className="row">
              {
                endorsements.map((endorsement, k) => {
                  return (
                    <div key={k} className="col-xs-12 endorsement">
                      <div className="title"><strong>{endorsement.name}</strong></div>
                      <div className="description">{endorsement.description}</div>
                      <button className="btn btn-info edit" onClick={() => { open("editEndorsement", endorsement) }}>
                        <i className="fa fa-pencil" />
                      </button>
                      <button
                        className="btn btn-danger btn-outline delete"
                        disabled={_.get(requestStatus, `${DELETE_MY_ENDORSEMENT}_${endorsement.id}`)}
                        onClick={() => { this.props.deleteMyEndorsement({ myEndorsementID: endorsement.id }) }}
                      >
                        <i className="fa fa-trash" />
                      </button>
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </Element>
    )
  }

  render() {
    const { getUserInProcess, getMyProfileInProcess } = this.props
    const { editable, user } = this.state

    if (getUserInProcess || getMyProfileInProcess) return <LoadingSpinner />

    if (!user) {
      return (
        <div className="text-center">
          <h3>No Such User</h3>
        </div>
      )
    }

    const showContact = user.preferences.show_email || user.preferences.show_mobile

    return (
      <div id="pages-users-show" className="container-fluid">
        <div className="row">
          <section className="banner">
            <ImageBanner
              src={_.get(user, "profile.banner.t1600", null) || DEFAULT_USER_BANNER}
            />
            <img
              className="user-avatar"
              src={_.get(user, "profile.avatar.t128", null) || DEFAULT_USER_AVATAR}
              alt="avatar"
            />
            <div className="details">
              <span className="h1">{getFullName(user)}</span>
              {
                _.get(user, "profile.bio", null) && (
                  <p>{_.get(user, "profile.bio")}</p>
                )
              }
            </div>
            {
              editable && (
                <button
                  className="btn btn-info edit"
                  onClick={() => { this.open("editProfile", user.profile) }}
                ><i className="fa fa-pencil" /></button>
              )
            }
          </section>

          <section className="more-info clearfix">
            <div className="col-xs-12 col-sm-3">
              <AutoAffix viewportOffsetTop={100} container={this}>
                <div className="sidebar-wrapper">
                  <ul className="scrollto">
                    {
                      (editable || showContact) && (
                        <li><Link to="Contacts" spy smooth duration={500} offset={-100}>Contacts</Link></li>
                      )
                    }
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
              {(showContact) && this.moreInfoContacts()}
              {(editable || _.get(user, "experiences[0]")) && this.moreInfoContentExperiences()}
              {(editable || _.get(user, "educations[0]")) && this.moreInfoContentEducations()}
              {(editable || _.get(user, "endorsements[0]")) && this.moreInfoContentEndorsements()}
            </div>
          </section>
        </div>

        {this.state.editProfile && <MyProfileEditProfileModal close={() => { this.close("editProfile") }} profile={this.state.editInfo} />}
        {this.state.addExperience && <MyProfileAddExperienceModal close={() => { this.close("addExperience") }} />}
        {this.state.addEducation && <MyProfileAddEducationModal close={() => { this.close("addEducation") }} />}
        {this.state.addEndorsement && <MyProfileAddEndorsementModal close={() => { this.close("addEndorsement") }} />}
        {this.state.editExperience && <MyProfileEditExperienceModal close={() => { this.close("editExperience") }} experience={this.state.editInfo} />}
        {this.state.editEducation && <MyProfileEditEducationModal close={() => { this.close("editEducation") }} education={this.state.editInfo} />}
        {this.state.editEndorsement && <MyProfileEditEndorsementModal close={() => { this.close("editEndorsement") }} endorsement={this.state.editInfo} />}
      </div>
    )
  }
}
