import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Panel from 'react-bootstrap/lib/Panel'

import { updatePassword, UPDATE_PASSWORD } from '../../../actions/my/profile'
import { uMyPreferences } from '../../../actions/my/preferences'

import MyProfileUpdatePasswordForm from '../../forms/my/profile/update-password'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session'),
    updatePasswordInProcess: _.get(state.requestStatus, UPDATE_PASSWORD)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePassword: bindActionCreators(updatePassword, dispatch),
    uMyPreferences: bindActionCreators(uMyPreferences, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class My extends Component {
  render() {
    const { currentUser } = this.props

    const { notify, locale, show_email, show_mobile } = currentUser.preferences

    return (
      <div id="page-my-settings" className="container padding-top-20">
        <div className="row">
          <h1 className="page-title margin-bottom-20 margin-top-0">Settings</h1>

          <Panel header="Profile">
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

          <Panel header="Update Password">
            <MyProfileUpdatePasswordForm
              optclass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
              onSubmit={this.props.updatePassword}
              submitInProcess={this.props.updatePasswordInProcess}
            />
          </Panel>
          <hr />
        </div>
      </div>
    )
  }
}
