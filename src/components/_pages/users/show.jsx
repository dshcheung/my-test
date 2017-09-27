import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AutoAffix from 'react-overlays/lib/AutoAffix'
import Link from 'react-scroll/modules/components/Link'
import Element from 'react-scroll/modules/components/Element'

import { DEFAULT_PIC } from '../../../constants'

import { getFullName } from '../../../services/utils'

import {
  GET_MY_PROFILE
} from '../../../actions/my/profile'

import {
  getUser, GET_USER,
  resetUser
} from '../../../actions/users'

import { deleteMyExperience, DELETE_MY_EXPERIENCE } from '../../../actions/my/experiences'
import { deleteMyEducation, DELETE_MY_EDUCATION } from '../../../actions/my/educations'
import { deleteMyEndorsement, DELETE_MY_ENDORSEMENT } from '../../../actions/my/endorsements'

import LoadingSpinner from '../../shared/loading-spinner'
import ImageBanner from '../../shared/image-banner'

import EditMyProfileModal from '../../modals/my/edit-profile'
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
    getUserInProcess: _.get(state.requestStatus, GET_USER),
    getMyProfileInProcess: _.get(state.requestStatus, GET_MY_PROFILE),
    deleteMyExperienceInProcess: _.get(state.requestStatus, DELETE_MY_EXPERIENCE),
    deleteMyEducationInProcess: _.get(state.requestStatus, DELETE_MY_EDUCATION),
    deleteMyEndorsementInProcess: _.get(state.requestStatus, DELETE_MY_ENDORSEMENT)
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
    if (this.props.currentUser && _.get(this.props.currentUser, 'id') !== this.props.routeParams.userID) {
      this.props.getUser({ params: this.props.routeParams })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.getMyProfileInProcess === true && nextProps.getMyProfileInProcess === false) {
      if (_.get(nextProps.currentUser, 'id') !== nextProps.routeParams.userID) {
        this.props.getUser({ params: this.props.routeParams })
      }
    }
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
    const {
      currentUser, getUserInProcess, getMyProfileInProcess,
      deleteMyExperienceInProcess, deleteMyEducationInProcess, deleteMyEndorsementInProcess
    } = this.props

    const editable = _.get(currentUser, 'id') === this.props.routeParams.userID
    const user = editable ? currentUser : this.props.user

    if (getUserInProcess || getMyProfileInProcess) return <LoadingSpinner />

    if (!user) {
      return (
        <div className="text-center">
          <h3>No Such User</h3>
        </div>
      )
    }

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
              {
                (editable || _.get(user, "experiences[0]")) &&
                moreInfoContentExperiences(editable, "Experiences", user.experiences, this.open, deleteMyExperience, deleteMyExperienceInProcess)
              }
              {
                (editable || _.get(user, "educations[0]")) &&
                moreInfoContentEducations(editable, "Educations", user.educations, this.open, this.props.deleteMyEducation, deleteMyEducationInProcess)
              }
              {
                (editable || _.get(user, "endorsements[0]")) &&
                moreInfoContentEndorsements(editable, "Endorsements", user.endorsements, this.open, this.props.deleteMyEndorsement, deleteMyEndorsementInProcess)
              }
            </div>
          </section>
        </div>

        {this.state.editProfile && <EditMyProfileModal close={() => { this.close("editProfile") }} profile={this.state.editInfo} />}
        {this.state.addExperience && <AddMyExperienceModal close={() => { this.close("addExperience") }} />}
        {this.state.addEducation && <AddMyEducationModal close={() => { this.close("addEducation") }} />}
        {this.state.addEndorsement && <AddMyEndorsementModal close={() => { this.close("addEndorsement") }} />}
        {this.state.editExperience && <EditMyExperienceModal close={() => { this.close("editExperience") }} experience={this.state.editInfo} />}
        {this.state.editEducation && <EditMyEducationModal close={() => { this.close("editEducation") }} education={this.state.editInfo} />}
        {this.state.editEndorsement && <EditMyEndorsementModal close={() => { this.close("editEndorsement") }} endorsement={this.state.editInfo} />}
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

const moreInfoContentExperiences = (editable, title, items = [], open, deleteItem, requestInProcess) => {
  return (
    <Element name={title} className="section">
      {titleAndAdd(editable, title, open, "addExperience")}
      {emptyAndAdd(editable, title, items.length === 0)}
      {
        items.length !== 0 && (
          <div className="row">
            {
              items.map((item, k) => {
                return (
                  <div key={k} className="col-xs-12 experience">
                    <div className="title"><strong>{item.position}</strong>, {item.company}</div>
                    <div className="year">{item.year && moment(item.year).format('YYYY')}</div>
                    <div className="description">{item.description}</div>
                    <button className="btn btn-info edit" onClick={() => { open("editExperience", item) }}>
                      <i className="fa fa-pencil" />
                    </button>
                    <button
                      className="btn btn-danger delete"
                      disabled={requestInProcess}
                      onClick={() => { deleteItem({ myExperienceID: item.id }) }}
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

const moreInfoContentEducations = (editable, title, items = [], open, deleteItem, requestInProcess) => {
  return (
    <Element name={title} className="section">
      {titleAndAdd(editable, title, open, "addEducation")}
      {emptyAndAdd(editable, title, items.length === 0)}
      {
        items.length !== 0 && (
          <div className="row">
            {
              items.map((item, k) => {
                return (
                  <div key={k} className="col-xs-12 education">
                    <div className="title"><strong>{item.education_level.name}</strong>, {item.school}</div>
                    <div className="year">{item.year && moment(item.year).format('YYYY')}</div>
                    <button className="btn btn-info edit" onClick={() => { open("editEducation", item) }}>
                      <i className="fa fa-pencil" />
                    </button>
                    <button
                      className="btn btn-danger delete"
                      disabled={requestInProcess}
                      onClick={() => { deleteItem({ myEducationID: item.id }) }}
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

const moreInfoContentEndorsements = (editable, title, items = [], open, deleteItem, requestInProcess) => {
  return (
    <Element name={title} className="section">
      {titleAndAdd(editable, title, open, "addEndorsement")}
      {emptyAndAdd(editable, title, items.length === 0)}
      {
        items.length !== 0 && (
          <div className="row">
            {
              items.map((item, k) => {
                return (
                  <div key={k} className="col-xs-12 endorsement">
                    <div className="title"><strong>{item.name}</strong></div>
                    <div className="description">{item.description}</div>
                    <button className="btn btn-info edit" onClick={() => { open("editEndorsement", item) }}>
                      <i className="fa fa-pencil" />
                    </button>
                    <button
                      className="btn btn-danger delete"
                      disabled={requestInProcess}
                      onClick={() => { deleteItem({ myEndorsementID: item.id }) }}
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
