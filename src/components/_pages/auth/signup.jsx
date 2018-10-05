import React, { Component } from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'

import NAuthInvestorSignupPreparing from '../../modals/auth/n-investor-signup-preparing'

const mapStateToProps = (state) => {
  return {
    hasSecret: _.get(state.secret, 'hasSecret', false)
  }
}

@connect(mapStateToProps, null)
export default class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nSignupPreparing: false
    }

    this.close = this.close.bind(this)
  }

  close() {
    this.setState({ nSignupPreparing: false })
  }

  render() {
    const { hasSecret } = this.props
    const { nSignupPreparing } = this.state

    return (
      <div id="page-auth-signup">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 col-md-8 col-md-offset-2 selector signup-wrapper">
            <h1 className="page-title text-uppercase">Sign Up</h1>

            <p>You need to sign up to get full access. Free to join!</p>

            <div className="row">
              <div className="col-xs-12 col-md-6 px-50">
                <div className="text-center">
                  <i className="ahub-investor ahub-9x" />
                  <p className="fw-500 margin-top-20 margin-bottom-20">I am an Investor</p>
                  {
                    hasSecret ? (
                      <Link
                        to="/auth/signup-investor"
                        className="btn btn-primary btn-outline px-10 mt-2 text-uppercase"
                      >Sign Up</Link>
                    ) : (
                      <a
                        onClick={() => { this.setState({ nSignupPreparing: true }) }}
                        className="btn btn-primary btn-outline px-10 mt-2 text-uppercase"
                      >Signup</a>
                    )
                  }
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
              <span>Already have an account? </span>
              <Link to="/auth/login" className="text-uppercase">Log in here</Link>
            </div>
          </div>
        </div>

        { nSignupPreparing && <NAuthInvestorSignupPreparing close={this.close} /> }
      </div>
    )
  }
}
