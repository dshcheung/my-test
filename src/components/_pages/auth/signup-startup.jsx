import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { createUser, CREATE_USER } from '../../../actions/users'

import AuthSignupStartupForm from '../../forms/auth/signup-startup'
import SharedOthersSideTitle from '../../shared/others/side-title'

const mapStateToProps = (state) => {
  return {
    createUserInProcess: _.get(state.requestStatus, CREATE_USER)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: bindActionCreators(createUser, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SignupStartup extends Component {
  constructor(props) {
    super(props)

    this.createUser = this.createUser.bind(this)
  }

  createUser(values) {
    this.props.createUser(values)
  }

  render() {
    return (
      <div id="page-auth-signup-startup">
        <div className="row">
          <SharedOthersSideTitle title="startup" optClass="col-sm-3 col-md-4" />

          <AuthSignupStartupForm
            optClass="col-sm-6 col-md-4"
            onSubmit={this.createUser}
            submitInProcess={this.props.createUserInProcess}
          />
        </div>
      </div>
    )
  }
}
