import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component {
  render() {
    return (
      <div className="pages-home-index padding-top-0 padding-bottom-0">
        <section className="section main-header bg-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="text-uppercase margin-bottom-20">Welcome to AngelHub</h1>
                <p className="tagline text-uppercase margin-bottom-50">Bringing Growing Startups and Angel Investors Together.</p>
                <Link className="btn btn-white btn-lg btn-outline text-uppercase">Request Invitation</Link>
              </div>
            </div>
          </div>
        </section>
        <section className="section news bg-white">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-md-2 col-lg-2 text-centersi">
                <span className="news-heading h3 text-uppercase">
                  Latest News
                </span>
              </div>
              <div className="col-sm-12 col-md-3">
                <div className="news-item">
                  <div className="col-sm-6 col-md-3 news-date">
                    <span>JUL<br />10</span>
                  </div>
                  <div className="col-sm-6 col-md-9 news-details">
                    <Link className="news-link">
                      <span className="news-title">Lorem ipsum dolor sit amet</span>
                      <p className="news-caption">consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-3">
                <div className="news-item">
                  <div className="col-sm-6 col-md-3 news-date">
                    <span>JUL<br />12</span>
                  </div>
                  <div className="col-sm-6 col-md-9 news-details">
                    <Link className="news-link">
                      <span className="news-title">Lorem ipsum dolor sit amet</span>
                      <p className="news-caption">consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-3">
                <div className="news-item">
                  <div className="col-sm-6 col-md-3 news-date">
                    <span>JUL<br />13</span>
                  </div>
                  <div className="col-sm-6 col-md-9 news-details">
                    <Link className="news-link">
                      <span className="news-title">Lorem ipsum dolor sit amet</span>
                      <p className="news-caption">consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-1 col-lg-1 text-center">
                <Link className="btn btn-info"><span className="h4">More <br />News</span></Link>
              </div>
            </div>
          </div>
        </section>
        <section className="section note bg-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-md-offset-3 bg-primary text-center note-details">
                <span className="note-heading text-uppercase h2">AngelHub</span>
                <img className="" src="https://s3-ap-northeast-1.amazonaws.com/angel-hub-dev/static/footer-logo.png" alt="Logo" />
                <p className="note-caption">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="section how-it-works bg-white">
          <div className="diamond position-absolute top-minus-25">
            <div className="inner" />
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-md-6 col-lg-5 how-it-works-details">
                <span className="h2 section-heading text-uppercase">How it works</span>
                <p className="text-gray">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p className="text-gray">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <Link className="btn btn-primary btn-outline btn-lg text-uppercase">Get In Touch</Link>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-7 how-it-works-options">
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="text-center text-white option">
                      <i className="fa fa-money fa-4x fa-fw" />
                      <p className="caption">Lorem ipsum dolor sit amet</p>
                      <p className="hover">consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="text-center text-white option">
                      <i className="fa fa-money fa-4x fa-fw" />
                      <p className="caption">Lorem ipsum dolor sit amet</p>
                      <p className="hover">consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="text-center text-white option">
                      <i className="fa fa-money fa-4x fa-fw" />
                      <p className="caption">Lorem ipsum dolor sit amet</p>
                      <p className="hover">consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="text-center text-white option">
                      <i className="fa fa-money fa-4x fa-fw " />
                      <p className="caption">Lorem ipsum dolor sit amet</p>
                      <p className="hover">consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row exclusive-benefits">
              <div className="diamond border-none position-absolute top-minus-25 left-30">
                <div className="inner" />
              </div>
              <div className="col-md-12 col-lg-6 skew-20">
                <div className="bg-exclusive">
                  <div className="section-heading h1 text-white text-uppercase">Exclusive Member Benefits</div>
                  <p className="exclusive-details margin-top-30">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="benefits">
                  <div className="benefit">
                    <div className="row">
                      <div className="col-md-4 col-lg-2">
                        <i className="fa fa-mobile fa-4x fa-fw" />
                      </div>
                      <div className="col-md-8 col-lg-10">
                        <p className="text-gray margin-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      </div>
                    </div>
                  </div>
                  <div className="benefit">
                    <div className="row">
                      <div className="col-md-4 col-lg-2">
                        <i className="fa fa-mobile fa-4x fa-fw" />
                      </div>
                      <div className="col-md-8 col-lg-10">
                        <p className="text-gray margin-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      </div>
                    </div>
                  </div>
                  <div className="benefit">
                    <div className="row">
                      <div className="col-md-4 col-lg-2">
                        <i className="fa fa-mobile fa-4x fa-fw" />
                      </div>
                      <div className="col-md-8 col-lg-10">
                        <p className="text-gray margin-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      </div>
                    </div>
                  </div>
                  <div className="benefit">
                    <div className="row">
                      <div className="col-md-4 col-lg-2">
                        <i className="fa fa-mobile fa-4x fa-fw" />
                      </div>
                      <div className="col-md-8 col-lg-10">
                        <p className="text-gray margin-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      </div>
                    </div>
                  </div>
                  <div className="benefit">
                    <div className="col-md-8 col-md-offset-4 col-lg-10 col-lg-offset-2 padding-0">
                      <Link className="btn btn-primary btn-outline btn-lg text-uppercase text-bold">Get In Touch</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section growth bg-primary">
          <div className="diamond border-none position-absolute top-minus-25">
            <div className="inner" />
          </div>
        </section>
      </div>
    )
  }
}
