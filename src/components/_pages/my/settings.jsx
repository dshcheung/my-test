import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Panel from 'react-bootstrap/lib/Panel'

import { updatePassword, UPDATE_PASSWORD } from '../../../actions/my/profile'

import UpdatePasswordForm from '../../forms/my/update-password'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session'),
    updatePasswordInProcess: _.get(state.requestStatus, UPDATE_PASSWORD)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePassword: bindActionCreators(updatePassword, dispatch)
  }
}

// TODO: Notifications disable & function
@connect(mapStateToProps, mapDispatchToProps)
export default class My extends Component {
  render() {
    return (
      <div id="page-my-settings" className="container padding-top-20">
        <div className="row">
          <h1 className="page-title margin-bottom-20 margin-top-0">Settings</h1>

          <Panel header="Notifications">
            <label className="switch" htmlFor="notification">
              <input
                id="notification"
                type="checkbox"
                name="notification"
                onChange={(e) => {
                  window.notificationCheck = e.target.checked
                }}
              />
              <span className="slider round" />
            </label>
          </Panel>

          <Panel header="Update Password">
            <UpdatePasswordForm
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
