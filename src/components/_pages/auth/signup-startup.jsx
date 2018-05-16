import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { createUser, CREATE_USER } from '../../../actions/users'

import AuthSignupStartupForm from '../../forms/auth/signup-startup'

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
      <div id="page-auth-signup-startup" className="container padding-top-20 padding-bottom-20">
        <div className="row">
          <AuthSignupStartupForm
            optClass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
            onSubmit={this.createUser}
            submitInProcess={this.props.createUserInProcess}
          />
        </div>
      </div>
    )
  }
}
