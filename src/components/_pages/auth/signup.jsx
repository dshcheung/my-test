import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Signup extends Component {
  render() {
    return (
      <div id="page-auth-signup">
        <div className="col-sm-6 col-sm-offset-3 col-md-8 col-md-offset-2 selector signup-wrapper">
          <h1 className="page-title text-uppercase">Sign Up</h1>

          <p>You need to sign up to get full access. Free to join!</p>

          <div className="row">
            <div className="col-xs-12 col-md-6 px-50">
              <div className="text-center">
                <i className="ahub-investor ahub-9x" />
                <p className="fw-500 margin-top-20 margin-bottom-20">I am an Investor</p>
                <Link
                  to="/auth/signup-investor"
                  className="btn btn-primary btn-outline px-10 mt-2 text-uppercase"
                >Request Access</Link>
              </div>
            </div>
            <div className="col-xs-12 col-md-6 px-50 border-before">
              <div className="text-center">
                <i className="ahub-startup ahub-9x" />
                <p className="fw-500 margin-top-20 margin-bottom-20">I am a Startup</p>
                <Link
                  to="/auth/signup-startup"
                  className="btn btn-primary btn-outline px-10 mt-2 text-uppercase"
                >Sign Up</Link>
              </div>
            </div>
          </div>

          <hr className="clear-both" />

          <div className="have-account">
            <span className="inline-block">Already have an account? </span>
            <Link to="/auth/login" className="text-uppercase">Log in here</Link>
          </div>

          <div className="is-institute margin-top-10">
            <span className="inline-block">Are you an Institutional Investor?</span>
            <Link to="/p/contact-us" className="text-uppercase">Please contact us here</Link>
          </div>
        </div>
      </div>
    )
  }
}
