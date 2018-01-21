import React, { Component } from 'react'
import Link from 'react-scroll/modules/components/Link'
import Element from 'react-scroll/modules/components/Element'
import RouteLink from 'react-router/lib/Link'

import { DEFAULT_STARTUP_BANNER, DEFAULT_STARTUP_AVATAR, DEFAULT_USER_AVATAR } from '../../../constants'

import LoadingSpinner from '../loading-spinner'
import ImageBanner from '../image-banner'

import MyStartupEProfileModal from '../../modals/my/startups/e-profile'

export default class StartupsProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editMode: false
    }

    this.close = this.close.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ editable: true })
    // this.setState({ editable: _.get(nextProps, 'startup.is_editable', false) })
  }

  editModeToggle() {
    this.setState({ editMode: !this.state.editMode })
  }

  open(modalName) {
    this.setState({ [modalName]: true })
  }

  close(modalName) {
    this.setState({ [modalName]: false })
  }

  render() {
    const { campaign, startup, loadingInProcess } = this.props
    const { editable, editMode } = this.state

    if (loadingInProcess) return <LoadingSpinner />

    if (!startup) {
      return (
        <div className="text-center">
          <h3>No Such Startup</h3>
        </div>
      )
    }

    const routeParams = {
      ...this.props.routeParams,
      startupID: startup.id,
      campaignID: campaign.id
    }

    const banner = _.get(startup, "profile.banner.original", DEFAULT_STARTUP_BANNER)
    const avatar = _.get(startup, "profile.avatar.original", DEFAULT_STARTUP_AVATAR)
    const bannerStyles = { backgroundImage: `url(${banner})` }
    const startupName = startup.name

    return (
      <div id="shared-startups-profile" className="container-fluid">
        {
          editable && (
            <div className="row edit-mode-actions">
              <div className="col-xs-12 text-right">
                <button
                  className="btn btn-info edit-profile"
                  onClick={() => { this.open("eProfile", startup) }}
                ><i className="fa fa-pencil" /> Edit Profile</button>

                <button
                  className="btn btn-info edit-mode"
                  onClick={() => { this.editModeToggle() }}
                >{editMode ? "Exit" : "Enter"} Edit Mode</button>
              </div>
            </div>
          )
        }
        <div className="row header">
          <div className="col-xs-12 startup-banner" style={bannerStyles}>
            <img src={avatar} className="startup-avatar" alt="Startup Avatar" />
            <div className="h1 startup-name">{startupName}</div>
          </div>
        </div>

        {
          this.state.eProfile && (
            <MyStartupEProfileModal
              close={() => { this.close("eProfile") }}
              params={routeParams}
              updateTarget="campaign"
            />
          )
        }
      </div>
    )
  }
}
