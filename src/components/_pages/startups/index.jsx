import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import {
  getStartups,
  resetStartups
} from '../../../actions/startups'

import LoadingSpinner from '../../shared/loading-spinner'

const mapStateToProps = (state) => {
  return {
    startups: _.get(state, 'startups.index', []),
    getStartupsInProcess: _.get(state, 'requestStatus.GET_STARTUPS')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStartups: bindActionCreators(getStartups, dispatch),
    resetStartups: bindActionCreators(resetStartups, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class StartupsIndex extends Component {
  componentWillMount() {
    this.props.getStartups()
  }

  componentWillUnmount() {
    this.props.resetStartups()
  }

  render() {
    const { startups, getStartupsInProcess } = this.props

    const lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam accusantium voluptatum, facilis magnam, laboriosam repellat dolore cumque id quia exercitationem sequi unde, dicta incidunt! Nostrum sapiente blanditiis suscipit maiores eius."

    return (
      <div id="pages-startups-index" className="container">
        <section>
          <div className="row section-header">
            <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
              <h2>LIVE STARTUPS</h2>
              <p>{lorem}</p>
            </div>
          </div>

          <div className="row startup-list">
            {
              (() => {
                let component = null
                if (getStartupsInProcess) {
                  component = (
                    <LoadingSpinner optClass="col-xs-12" />
                  )
                } else {
                  if (startups.length === 0) {
                    component = (
                      <div className="col-xs-12">
                        <h3>No Startups Found</h3>
                      </div>
                    )
                  } else {
                    component = startups.map((startup, i) => {
                      return (
                        <div key={i} className="col-xs-12 col-sm-4 text-center startup-card">
                          <Link to={`/startups/${startup.id}`} className="border clearfix">
                            <div className="col-xs-12 card-header bg-primary">ACCEPTING INVESTMENT</div>
                            <div className="col-xs-12 card-banner">
                              <img
                                src={`${_.get(startup, "profile.banner.original", null) || "/company-logo.jpg"}`}
                                alt="banner"
                              />
                            </div>
                            <div className="col-xs-12 card-info">
                              <div className="name">
                                <div>Category</div>
                                <h4>{startup.name}</h4>
                              </div>

                              <div className="about">
                                <hr />
                                <div>{startup.profile.description}</div>
                                {
                                  startup.highlights.length > 0 && (
                                    <ul>
                                      {
                                        startup.highlights.map((highlight, k) => {
                                          if (i >= 3) return null

                                          return (
                                            <li key={k}>{highlight}</li>
                                          )
                                        })
                                      }
                                    </ul>
                                  )
                                }
                              </div>

                              <div className="stats">
                                <hr />
                                <div className="clearfix">
                                  <div className="pull-left"><b>$1,222</b> raised</div>
                                  <div className="pull-right"><b>4</b> investors</div>
                                </div>
                                <div className="progress">
                                  <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }} />
                                </div>
                                <div className="clearfix">
                                  <div className="pull-left"><b>80%</b> achieved</div>
                                  <div className="pull-right"><b>23</b> days left</div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      )
                    })
                  }
                }
                return component
              })()
            }
          </div>

          {/*
            <div className="row startup-list">
              <div className="col-xs-12 col-sm-4 text-center startup-card">
                <Link to="/startups/something" className="border clearfix">
                  <div className="col-xs-12 card-header bg-primary">ACCEPTING INVESTMENT</div>
                  <div className="col-xs-12 card-banner">
                    <img src="/company-logo.jpg" alt="banner" />
                  </div>
                  <div className="col-xs-12 card-info">
                    <div className="name">
                      <div>Company</div>
                      <b>Company Name</b>
                    </div>

                    <div className="about">
                      <hr />
                      <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</div>
                      <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</li>
                      </ul>
                    </div>

                    <div className="stats">
                      <hr />
                      <div className="clearfix">
                        <div className="pull-left"><b>$1,222</b> raised</div>
                        <div className="pull-right"><b>4</b> investors</div>
                      </div>
                      <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }} />
                      </div>
                      <div className="clearfix">
                        <div className="pull-left"><b>80%</b> achieved</div>
                        <div className="pull-right"><b>23</b> days left</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-xs-12 col-sm-4 text-center startup-card">
                <Link to="/startups/something" className="border clearfix">
                  <div className="col-xs-12 card-header bg-primary">ACCEPTING INVESTMENT</div>
                  <div className="col-xs-12 card-banner">
                    <img src="/company-logo.jpg" alt="banner" />
                  </div>
                  <div className="col-xs-12 card-info">
                    <div className="name">
                      <div>Company</div>
                      <b>Company Name</b>
                    </div>

                    <div className="about">
                      <hr />
                      <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</div>
                      <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</li>
                      </ul>
                    </div>

                    <div className="stats">
                      <hr />
                      <div className="clearfix">
                        <div className="pull-left"><b>$1,222</b> raised</div>
                        <div className="pull-right"><b>4</b> investors</div>
                      </div>
                      <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }} />
                      </div>
                      <div className="clearfix">
                        <div className="pull-left"><b>80%</b> achieved</div>
                        <div className="pull-right"><b>23</b> days left</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-xs-12 col-sm-4 text-center startup-card">
                <Link to="/startups/something" className="border clearfix">
                  <div className="col-xs-12 card-header bg-primary">ACCEPTING INVESTMENT</div>
                  <div className="col-xs-12 card-banner">
                    <img src="/company-logo.jpg" alt="banner" />
                  </div>
                  <div className="col-xs-12 card-info">
                    <div className="name">
                      <div>Company</div>
                      <b>Company Name</b>
                    </div>

                    <div className="about">
                      <hr />
                      <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</div>
                      <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</li>
                      </ul>
                    </div>

                    <div className="stats">
                      <hr />
                      <div className="clearfix">
                        <div className="pull-left"><b>$1,222</b> raised</div>
                        <div className="pull-right"><b>4</b> investors</div>
                      </div>
                      <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }} />
                      </div>
                      <div className="clearfix">
                        <div className="pull-left"><b>80%</b> achieved</div>
                        <div className="pull-right"><b>23</b> days left</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          */}
        </section>

        {/*
          <hr />

          <section>
            <div className="row section-header">
              <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                <h2>LIMTED TO ACCREDITED INVESTORS</h2>
                <p>{lorem}</p>
              </div>
            </div>

            <div className="row startup-list">
              <div className="col-xs-12 col-sm-4 text-center startup-card">
                <Link to="/startups/something" className="border clearfix">
                  <div className="col-xs-12 card-header bg-primary">ACCEPTING INVESTMENT</div>
                  <div className="col-xs-12 card-banner">
                    <img src="/company-logo.jpg" alt="banner" />
                  </div>
                  <div className="col-xs-12 card-info">
                    <div className="name">
                      <div>Company</div>
                      <b>Company Name</b>
                    </div>

                    <div className="about">
                      <hr />
                      <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</div>
                      <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</li>
                      </ul>
                    </div>

                    <div className="stats">
                      <hr />
                      <div className="clearfix">
                        <div className="pull-left"><b>$1,222</b> raised</div>
                        <div className="pull-right"><b>4</b> investors</div>
                      </div>
                      <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }} />
                      </div>
                      <div className="clearfix">
                        <div className="pull-left"><b>80%</b> achieved</div>
                        <div className="pull-right"><b>23</b> days left</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-xs-12 col-sm-4 text-center startup-card">
                <Link to="/startups/something" className="border clearfix">
                  <div className="col-xs-12 card-header bg-primary">ACCEPTING INVESTMENT</div>
                  <div className="col-xs-12 card-banner">
                    <img src="/company-logo.jpg" alt="banner" />
                  </div>
                  <div className="col-xs-12 card-info">
                    <div className="name">
                      <div>Company</div>
                      <b>Company Name</b>
                    </div>

                    <div className="about">
                      <hr />
                      <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</div>
                      <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</li>
                      </ul>
                    </div>

                    <div className="stats">
                      <hr />
                      <div className="clearfix">
                        <div className="pull-left"><b>$1,222</b> raised</div>
                        <div className="pull-right"><b>4</b> investors</div>
                      </div>
                      <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }} />
                      </div>
                      <div className="clearfix">
                        <div className="pull-left"><b>80%</b> achieved</div>
                        <div className="pull-right"><b>23</b> days left</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-xs-12 col-sm-4 text-center startup-card">
                <Link to="/startups/something" className="border clearfix">
                  <div className="col-xs-12 card-header bg-primary">ACCEPTING INVESTMENT</div>
                  <div className="col-xs-12 card-banner">
                    <img src="/company-logo.jpg" alt="banner" />
                  </div>
                  <div className="col-xs-12 card-info">
                    <div className="name">
                      <div>Company</div>
                      <b>Company Name</b>
                    </div>

                    <div className="about">
                      <hr />
                      <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</div>
                      <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</li>
                      </ul>
                    </div>

                    <div className="stats">
                      <hr />
                      <div className="clearfix">
                        <div className="pull-left"><b>$1,222</b> raised</div>
                        <div className="pull-right"><b>4</b> investors</div>
                      </div>
                      <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }} />
                      </div>
                      <div className="clearfix">
                        <div className="pull-left"><b>80%</b> achieved</div>
                        <div className="pull-right"><b>23</b> days left</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          <hr />

          <section>
            <div className="row section-header">
              <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                <h2>SUCCESSFUL FUNDRAISING</h2>
                <p>{lorem}</p>
              </div>
            </div>

            <div className="row startup-list">
              <div className="col-xs-12 col-sm-4 text-center startup-card">
                <Link to="/startups/something" className="border clearfix">
                  <div className="col-xs-12 card-header bg-primary">ACCEPTING INVESTMENT</div>
                  <div className="col-xs-12 card-banner">
                    <img src="/company-logo.jpg" alt="banner" />
                  </div>
                  <div className="col-xs-12 card-info">
                    <div className="name">
                      <div>Company</div>
                      <b>Company Name</b>
                    </div>

                    <div className="about">
                      <hr />
                      <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</div>
                      <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</li>
                      </ul>
                    </div>

                    <div className="stats">
                      <hr />
                      <div className="clearfix">
                        <div className="pull-left"><b>$1,222</b> raised</div>
                        <div className="pull-right"><b>4</b> investors</div>
                      </div>
                      <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }} />
                      </div>
                      <div className="clearfix">
                        <div className="pull-left"><b>80%</b> achieved</div>
                        <div className="pull-right"><b>23</b> days left</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-xs-12 col-sm-4 text-center startup-card">
                <Link to="/startups/something" className="border clearfix">
                  <div className="col-xs-12 card-header bg-primary">ACCEPTING INVESTMENT</div>
                  <div className="col-xs-12 card-banner">
                    <img src="/company-logo.jpg" alt="banner" />
                  </div>
                  <div className="col-xs-12 card-info">
                    <div className="name">
                      <div>Company</div>
                      <b>Company Name</b>
                    </div>

                    <div className="about">
                      <hr />
                      <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</div>
                      <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</li>
                      </ul>
                    </div>

                    <div className="stats">
                      <hr />
                      <div className="clearfix">
                        <div className="pull-left"><b>$1,222</b> raised</div>
                        <div className="pull-right"><b>4</b> investors</div>
                      </div>
                      <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }} />
                      </div>
                      <div className="clearfix">
                        <div className="pull-left"><b>80%</b> achieved</div>
                        <div className="pull-right"><b>23</b> days left</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-xs-12 col-sm-4 text-center startup-card">
                <Link to="/startups/something" className="border clearfix">
                  <div className="col-xs-12 card-header bg-primary">ACCEPTING INVESTMENT</div>
                  <div className="col-xs-12 card-banner">
                    <img src="/company-logo.jpg" alt="banner" />
                  </div>
                  <div className="col-xs-12 card-info">
                    <div className="name">
                      <div>Company</div>
                      <b>Company Name</b>
                    </div>

                    <div className="about">
                      <hr />
                      <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</div>
                      <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint officia, modi mollitia autem!</li>
                      </ul>
                    </div>

                    <div className="stats">
                      <hr />
                      <div className="clearfix">
                        <div className="pull-left"><b>$1,222</b> raised</div>
                        <div className="pull-right"><b>4</b> investors</div>
                      </div>
                      <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }} />
                      </div>
                      <div className="clearfix">
                        <div className="pull-left"><b>80%</b> achieved</div>
                        <div className="pull-right"><b>23</b> days left</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        */}
      </div>
    )
  }
}
