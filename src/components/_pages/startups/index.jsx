import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import {
  getStartups, GET_STARTUPS,
  resetStartups
} from '../../../actions/startups'

import StartupsSearchForm from '../../forms/startups/search'
import LoadingSpinner from '../../shared/loading-spinner'

const mapStateToProps = (state) => {
  return {
    startups: _.get(state, 'startups', []),
    getStartupsInProcess: _.get(state.requestStatus, GET_STARTUPS)
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
  constructor(props) {
    super(props)

    this.state = {}

    this.getStartups = this.getStartups.bind(this)
  }

  componentWillMount() {
    this.props.getStartups()
  }

  componentWillUnmount() {
    this.props.resetStartups()
  }

  getStartups(values) {
    this.setState({
      keyword: _.get(values, "keyword"),
      filterBy: _.get(values, "filter") ? "category_id" : "",
      filter: _.get(values, "filter"),
      sortBy: _.get(values, "sortBy"),
      sort: _.get(values, "sort")
    })
    this.props.getStartups({
      queries: {
        q: _.get(values, "keyword"),
        filter_by: _.get(values, "filter") ? "category_id" : "",
        filter: _.get(values, "filter"),
        sort_by: _.get(values, "sortBy"),
        sort: _.get(values, "sort")
      }
    })
  }

  render() {
    const { startups, getStartupsInProcess } = this.props

    return (
      <div id="pages-startups-index" className="container-fluid">
        <section className="container">
          <div className="row section-search">
            <StartupsSearchForm
              optClass=""
              onSubmit={this.getStartups}
              submitInProcess={this.props.getStartupsInProcess}
            />
          </div>
          <div className="row section-header">
            <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
              <h1>LIVE STARTUPS</h1>
              <p>Invest into businesses you believe in</p>
            </div>
          </div>

          <div className="row startup-list">
            {
              (() => {
                let component = null
                if (getStartupsInProcess) {
                  component = <LoadingSpinner />
                } else {
                  if (startups.length === 0) {
                    component = <div className="col-xs-12"><h3>No Startups Found</h3></div>
                  } else {
                    component = startups.map((startup, i) => {
                      const privateCard = i > 0
                      const banner = _.get(startup, 'profile.banner.original', null) || '/company-logo.jpg'
                      const styles = {
                        backgroundImage: `url(${banner})`
                      }
                      return (
                        <div key={i} className="col-xs-12 col-sm-6 col-md-4 text-center startup-card">
                          {
                            privateCard ? (
                              <div className="col-xs-12 card-header text-white bg-info">COMING SOON</div>
                            ) : (
                              <div className="col-xs-12 card-header text-white bg-info">ACCEPTING INVESTMENT</div>
                            )
                          }

                          <Link to={`/startups/${startup.id}`} className="clearfix card-banner-wrapper">
                            <div className={`col-xs-12 card-banner clearfix`} style={styles}>
                              <img
                                className="startup-logo position-absolute top-15 left-10"
                                src={banner}
                                alt={`Logo ${startup.name}}`}
                              />
                            </div>
                          </Link>

                          {
                            privateCard ? (
                              <div className="col-xs-12 card-info">
                                <div className="name">
                                  <div className="h4">{startup.category}</div>
                                  <div className="h3 margin-top-5 margin-bottom-5 text-bold text-gray-dark">
                                    <Link to={`/startups/${startup.id}`}>{startup.name}</Link>
                                  </div>
                                </div>
                                <div className="about">
                                  <hr />
                                  <div>{startup.profile.tagline}</div>
                                </div>
                              </div>
                            ) : (
                              <div className="col-xs-12 card-info">
                                <div className="name">
                                  <div className="h4">{startup.category}</div>
                                  <div className="h3 margin-top-5 margin-bottom-5 text-bold text-gray-dark">
                                    <Link to={`/startups/${startup.id}`}>{startup.name}</Link>
                                  </div>
                                </div>

                                <div className="about">
                                  <hr />
                                  <div>{startup.profile.tagline}</div>
                                </div>

                                <div className="stats">
                                  <hr />
                                  <div className="clearfix">
                                    <div className="pull-left"><strong>US$1,500,000</strong> raised</div>
                                    <div className="pull-right"><strong>7</strong> investors</div>
                                  </div>
                                  <div className="progress">
                                    <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "75%" }} />
                                    <div className="progress-start filled" />
                                    <div className="progress-end" />
                                  </div>
                                  <div className="clearfix">
                                    <div className="pull-left"><strong>75%</strong> achieved</div>
                                    <div className="pull-right"><strong>{ moment('2017-10-31').diff(moment(), 'days') }</strong> days left</div>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                        </div>
                      )
                    })
                  }
                }
                return component
              })()
            }
          </div>

        </section>
        <section className="bg-opportunities padding-top-40 padding-bottom-40">
          <div className="row">
            <div className="col-xs-12">
              <div className="h1 text-white margin-bottom-30">Access More Investment Opportunities</div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-6 col-md-offset-3">
              <Link to="/auth/signup" className="btn btn-info btn-lg text-uppercase margin-right-20">Get Started</Link>
              <Link to="/login" className="btn btn-outline btn-white btn-log btn-lg text-uppercase margin-left-20">Login</Link>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

/*
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
*/

/*
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
*/
