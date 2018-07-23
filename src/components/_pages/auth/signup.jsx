import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Signup extends Component {
  render() {
    return (
      <div id="page-auth-signup">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 selector signup-wrapper">
            <h1 className="page-title">Join AngelHub</h1>

            <p>You need to sign up to get full access. Free to join!</p>

            <div className="row">
              <div className="col-xs-6">
                <Link
                  to="/auth/signup-investor"
                  className="btn btn-block btn-default"
                >I am an Investor</Link>
              </div>
              <div className="col-xs-6">
                <Link
                  to="/auth/signup-startup"
                  className="btn btn-block btn-default"
                >I am a Startup</Link>
              </div>
            </div>

            <hr className="clear-both" />

            <div className="have-account">
              <span>Already have an account? </span><Link to="/auth/login">Log in here</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
