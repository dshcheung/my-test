import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  uMyStartupProfile, U_MY_STARTUP_PROFILE
} from '../../../../actions/my/startups/profile'

import MyStartupProfileForm from '../../../forms/my/startups/profile'

import MyStartupsNEStartupModal from './ne-startup'

const mapStateToProps = (state) => {
  return {
    startup: _.get(state, 'startup', null),
    uMyStartupProfileInProcess: _.get(state.requestStatus, U_MY_STARTUP_PROFILE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uMyStartupProfile: bindActionCreators(uMyStartupProfile, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsEProfileModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      eProfile: true
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  onSubmit(values) {
    this.props.uMyStartupProfile(values, this.props.params, () => {
      this.props.close()
    }, 'Profile')
  }

  open(stateEditMode, editInfo) {
    this.setState({ eProfile: false, neStartup: true, stateEditMode, editInfo })
  }

  close() {
    this.setState({ eProfile: true, neStartup: false, stateEditMode: false, editInfo: null })
  }

  render() {
    const { close, editMode, uMyStartupProfileInProcess, startup, params } = this.props
    const { stateEditMode, editInfo } = this.state

    const keyword = editMode ? "Edit" : "Add"
    const name = _.get(startup, 'name', '')
    const initialValues = editMode ? {
      description: _.get(startup, 'profile.description', ''),
      overview: _.get(startup, 'profile.overview', ''),
      tagline: _.get(startup, 'profile.tagline', ''),
      yearFounded: _.get(startup, 'profile.year_founded', '')
    } : undefined

    return (
      <Modal show onHide={close} className={`form-modal ${!this.state.eProfile && 'hide'}`} id="modals-my-startups-s-risk">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <div className="clearfix">
              <span>{name}</span>
              <button
                className="btn btn-sm btn-info pull-right"
                onClick={() => { this.open(true, name) }}
              >Change Name</button>
            </div>
          </div>
          <MyStartupProfileForm
            onSubmit={this.onSubmit}
            submitInProcess={uMyStartupProfileInProcess}
            initialValues={initialValues}
            bannerUrl={_.get(startup, 'profile.banner.original', '')}
            avatarUrl={_.get(startup, 'profile.avatar.original', '')}
          />
        </Modal.Body>
        {this.state.neStartup && <MyStartupsNEStartupModal close={this.close} params={params} editMode={stateEditMode} name={editInfo} /> }
      </Modal>
    )
  }
}
