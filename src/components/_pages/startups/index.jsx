import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import {
  getStartups,
  resetStartups
} from '../../../actions/startups'

const mapStateToProps = (state) => {
  return {
    startups: _.get(state, 'startups.index', [])
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
      </div>
    )
  }
}
