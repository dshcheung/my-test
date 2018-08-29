import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Signup extends Component {
  render() {
    return (
      <div id="page-auth-signup">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-2 selector signup-wrapper">
            <h1 className="page-title">Sign Up</h1>

            <p>You need to sign up to get full access. Free to join!</p>

            <div className="row">
              <div className="col-xs-12 col-md-6 px-50">
                <div className="text-center">
                  <i className="fa fa-fw fa-4x fa-hands" />
                  <p className="fw-500">I am an Investor</p>
                  <Link
                    to="/auth/signup-investor"
                    className="btn btn-primary btn-outline px-10 mt-2"
                  >Sign Up</Link>
                </div>
              </div>
              <div className="col-xs-12 col-md-6 px-50 border-before">
                <div className="text-center">
                  <i className="fa fa-fw fa-4x fa-rocket" />
                  <p className="fw-500">I am a Startup</p>
                  <Link
                    to="/auth/signup-startup"
                    className="btn btn-primary btn-outline px-10 mt-2"
                  >Sign Up</Link>
                </div>
              </div>
            </div>

            <hr className="clear-both" />

            <div className="have-account">
              <span>Already have an account? </span>
              <Link to="/auth/login" className="text-hover-none border-bottom">Log in here</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
