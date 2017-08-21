import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import SignupForm from '../../forms/auth/signup'

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Signup extends Component {
  render() {
    return (
      <div id="page-auth-signup" className="container clearfix">
        <div className="row">
          <SignupForm
            optClass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
            onSubmit={this.createUser}
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
