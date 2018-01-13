import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Panel from 'react-bootstrap/lib/Panel'

import {
  updatePassword, UPDATE_PASSWORD,
  updateMyProfile, UPDATE_MY_PROFILE
} from '../../../actions/my/profile'
import { uMyPreferences } from '../../../actions/my/preferences'

import MyProfileUpdatePasswordForm from '../../forms/my/profile/update-password'
import MyProfileNameForm from '../../forms/my/profile/settings-name'
import MyProfileContactForm from '../../forms/my/profile/settings-contact'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session'),
    updatePasswordInProcess: _.get(state.requestStatus, UPDATE_PASSWORD),
    updateMyProfileInProcess: _.get(state.requestStatus, UPDATE_MY_PROFILE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePassword: bindActionCreators(updatePassword, dispatch),
    updateMyProfile: bindActionCreators(updateMyProfile, dispatch),
    uMyPreferences: bindActionCreators(uMyPreferences, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class My extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tab: "general"
    }

    this.change = this.change.bind(this)
    this.updateMyProfile = this.updateMyProfile.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
  }

  componentWillMount() {
    const { location } = this.props
    if (location.hash) { this.setState({ tab: location.hash.replace("#", '') }) }
  }

  change(tab) {
    const { router, location } = this.props
    router.replace(`${location.pathname}#${tab}`)
    this.setState({ tab })
  }

  updateMyProfile(values) {
    this.props.updateMyProfile(values)
  }

  updatePassword(values) {
    this.props.updatePassword(values, () => {
      this.props.reset()
    })
  }

  render() {
    const { currentUser } = this.props

    const { email, mobile, validation_stages: {
      stage_one, stage_two, stage_three, stage_four
    } } = currentUser

    const { first_name, last_name } = currentUser.profile

    const { notify, locale, show_email, show_mobile } = currentUser.preferences

    return (
      <div id="page-my-settings" className="container">
        <div className="sidebar">
          <ul>
            <li className={this.state.tab === "general" ? "selected" : ""} onClick={() => { this.change("general") }}>General</li>
            <li className={this.state.tab === "privacy" ? "selected" : ""} onClick={() => { this.change("privacy") }}>Privacy</li>
            <li className={this.state.tab === "notification" ? "selected" : ""} onClick={() => { this.change("notification") }}>Notification</li>
            <li className={this.state.tab === "language" ? "selected" : ""} onClick={() => { this.change("language") }}>Language</li>
            <li className={this.state.tab === "security" ? "selected" : ""} onClick={() => { this.change("security") }}>Security</li>
          </ul>
        </div>
        <div className="content">
          {
            this.state.tab === "general" && (
              <div className="tab general">
                <Panel header="Name">
                  <MyProfileNameForm
                    optclass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
                    onSubmit={this.updateMyProfile}
                    submitInProcess={this.props.updateMyProfileInProcess}
                    initialValues={{
                      firstName: first_name,
                      lastName: last_name
                    }}
                  />
                </Panel>
                <Panel header="Contact">
                  <MyProfileContactForm
                    optclass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
                    onSubmit={this.updateMyProfile}
                    submitInProcess={this.props.updateMyProfileInProcess}
                    initialValues={{
                      email,
                      mobile
                    }}
                  />
                </Panel>
                <Panel header="Validation Status">
                  <div>Stage One - { stage_one ? "Completed" : "Waiting"}</div>
                  <div>Stage Two - { stage_two ? "Completed" : "Waiting"}</div>
                  <div>Stage Three - { stage_three ? "Completed" : "Waiting"}</div>
                  <div>Stage Four - { stage_four ? "Completed" : "Waiting"}</div>
                </Panel>
              </div>
            )
          }
          {
            this.state.tab === "privacy" && (
              <div className="tab privacy">
                <Panel header="Display Email/Mobile On Profile">
                  <div>
                    <div>
                      <label htmlFor="email">Show Email On Profile</label>
                    </div>
                    <label className="switch" htmlFor="email">
                      <input
                        id="email"
                        type="checkbox"
                        name="email"
                        checked={show_email}
                        onChange={(e) => {
                          this.props.uMyPreferences({ showEmail: e.target.checked })
                        }}
                      />
                      <span className="slider round" />
                    </label>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="mobile">Show Mobile On Profile</label>
                    </div>
                    <label className="switch" htmlFor="mobile">
                      <input
                        id="mobile"
                        type="checkbox"
                        name="mobile"
                        checked={show_mobile}
                        onChange={(e) => {
                          this.props.uMyPreferences({ showMobile: e.target.checked })
                        }}
                      />
                      <span className="slider round" />
                    </label>
                  </div>
                </Panel>
              </div>
            )
          }
          {
            this.state.tab === "notification" && (
              <div className="tab notification">
                <Panel header="Notifications">
                  <div className="settings-section">
                    <button
                      className={`btn ${notify === "email" ? "btn-primary" : "btn-default"}`}
                      onClick={() => { this.props.uMyPreferences({ notify: "email" }) }}
                    >Email</button>
                    <button
                      className={`btn ${notify === "sms" ? "btn-primary" : "btn-default"}`}
                      onClick={() => { this.props.uMyPreferences({ notify: "sms" }) }}
                    >SMS</button>
                  </div>
                </Panel>
              </div>
            )
          }
          {
            this.state.tab === "language" && (
              <div className="tab language">
                <Panel header="Languages">
                  <div className="settings-section">
                    <button
                      className={`btn ${locale === "en" ? "btn-primary" : "btn-default"}`}
                      onClick={() => { this.props.uMyPreferences({ locale: "en" }) }}
                    >English</button>
                    <button
                      className={`btn ${locale === "zh" ? "btn-primary" : "btn-default"}`}
                      onClick={() => { this.props.uMyPreferences({ locale: "zh" }) }}
                    >中文</button>
                  </div>
                </Panel>
              </div>
            )
          }
          {
            this.state.tab === "security" && (
              <div className="tab security">
                <Panel header="Update Password">
                  <MyProfileUpdatePasswordForm
                    optclass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
                    onSubmit={this.updatePassword}
                    submitInProcess={this.props.updatePasswordInProcess}
                  />
                </Panel>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}
