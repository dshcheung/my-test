import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import {
  getMyStartups, GET_MY_STARTUPS,
  resetMyStartups
} from '../../../actions/my/startups'

import LoadingSpinner from '../../shared/loading-spinner'

import MyStartupsAddStartupModal from '../../modals/my/startups/add-startup'

const mapStateToProps = (state) => {
  return {
    myStartups: _.get(state, 'myStartups', []),
    getMyStartupsInProcess: _.get(state.requestStatus, GET_MY_STARTUPS)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyStartups: bindActionCreators(getMyStartups, dispatch),
    resetMyStartups: bindActionCreators(resetMyStartups, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class StartupsIndex extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  componentWillMount() {
    this.props.getMyStartups()
  }

  componentWillUnmount() {
    this.props.resetMyStartups()
  }

  open() {
    this.setState({ addStartup: true })
  }

  close() {
    this.setState({ addStartup: false })
  }

  render() {
    const { myStartups, getMyStartupsInProcess } = this.props

    return (
      <div id="pages-my-startups-index" className="container-fluid">
        <section className="container">
          <div className="row startup-list">
            {
              (() => {
                let component = null
                if (getMyStartupsInProcess) {
                  component = <LoadingSpinner />
                } else {
                  const noStartups = myStartups.length === 0 && (
                    <div key="no-startups" className="col-xs-12"><h3>No Startups Found</h3></div>
                  )

                  const newStartup = (
                    <div
                      key="new-startup"
                      className="col-xs-12 col-sm-6 col-md-4 text-center startup-card-new"
                    >
                      <a className="clearfix card-banner-wrapper" onClick={this.open}>
                        <div
                          className="col-xs-12 card-banner clearfix"
                          style={{ backgroundImage: "url(/default-banner-2.jpeg)" }}
                        />
                      </a>

                      <div className="col-xs-12 card-info">
                        <div className="name">
                          <div className="h3 margin-top margin-bottom-text-bold text-gray-dark">
                            <a onClick={this.open}>Create A New Startup</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )

                  const startupList = myStartups.map((myStartup, i) => {
                    const banner = _.get(myStartup, 'profile.banner.original', null) || '/company-logo.jpg'
                    const styles = {
                      backgroundImage: `url(${banner})`
                    }
                    return (
                      <div key={i} className="col-xs-12 col-sm-6 col-md-4 text-center startup-card">
                        <Link to={`/startups/${myStartup.id}`} className="clearfix card-banner-wrapper">
                          <div className="col-xs-12 card-banner clearfix" style={styles}>
                            <img
                              className="startup-logo position-absolute top-15 left-10"
                              src={banner}
                              alt={`Logo ${myStartup.name}`}
                            />
                          </div>
                        </Link>

                        <div className="col-xs-12 card-info">
                          <div className="name">
                            <div className="h4">{myStartup.category}</div>
                            <div className="h3 margin-top margin-bottom-text-bold text-gray-dark">
                              <Link to={`/startups/${myStartup.id}`}>{myStartup.name}</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })

                  component = [noStartups, newStartup, ...startupList]
                }
                return component
              })()
            }
          </div>
        </section>

        {this.state.addStartup && <MyStartupsAddStartupModal close={this.close} />}
      </div>
    )
  }
}
