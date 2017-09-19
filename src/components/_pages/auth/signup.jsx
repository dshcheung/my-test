import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import { createUser, CREATE_USER } from '../../../actions/users'

import SignupForm from '../../forms/auth/signup'

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
export default class Signup extends Component {
  render() {
    return (
      <div id="page-auth-signup" className="container padding-top-20 padding-bottom-20">
        <div className="row">
          <SignupForm
            optClass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
            onSubmit={this.props.createUser}
            submitInProcess={this.props.createUserInProcess}
          />
        </div>

        <div className="row">
          <div className="tnc col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <span>By joining AngelHub, you are agreeing to our </span>
            <Link>Investor Registration Agreement</Link>
            <span> and </span>
            <Link>User Agreement</Link>
            <span>, and you will keep all information presented on this website confidential</span>
          </div>
        </div>
      </div>
    )
  }
}
