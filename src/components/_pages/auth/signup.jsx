import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Signup extends Component {
  render() {
    return (
      <div id="page-auth-signup" className="container padding-top-20 padding-bottom-20">
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 selector signup-wrapper">
            <h1 className="title margin-bottom-20 margin-top-0 text-uppercase">Join AngelHub</h1>
            <p>You need to sign up to get full access. Free to join!</p>
            <div className="col-xs-6">
              <Link
                to="/auth/signup-investor"
                className="margin-bottom-15 btn btn-block btn-default"
              >I am an Investor</Link>
            </div>
            <div className="col-xs-6">
              <Link
                to="/auth/signup-startup"
                className="margin-bottom-15 btn btn-block btn-default"
              >I am a Founder</Link>
            </div>

            <hr className="clear-both" />

            <div className="have-account">
              <span>Already have an account? </span><Link to="/auth/login">Log in here</Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="tnc col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <span>By joining AngelHub, you are agreeing to our </span>
            <Link to="/investor-agreement">Investor Registration Agreement</Link>
            <span> and </span>
            <Link>User Agreement</Link>
            <span>, and you will keep all information presented on this website confidential</span>
          </div>
        </div>
      </div>
    )
  }
}
