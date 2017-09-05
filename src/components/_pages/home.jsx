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
                <p className="tagline text-uppercase margin-bottom-50">The New Era of Angel Investing.</p>
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
                  Latest Insights, Trends and Analysis
                </span>
              </div>
              <div className="col-sm-12 col-md-3">
                <div className="news-item">
                  <div className="col-sm-6 col-md-3 news-date">
                    <span>JUL<br />10</span>
                  </div>
                  <div className="col-sm-6 col-md-9 news-details">
                    <Link className="news-link" to="https://whub.io/events/hong-kong-fintech-ecosystem-toolbox-2017-insights-trends-1502351926">
                      <span className="news-title">Toolbox</span>
                      <p className="news-caption">Insights about the FinTech ecosystem: Who are the key players in the Hong Kong FinTech sector?</p>
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
                <img className="" src="https://s3-ap-northeast-1.amazonaws.com/angel-hub-dev/static/footer-logo.png" alt="Logo" />
                <p className="note-caption">
                  AngelHub is focused on funding and supporting the world’s most promising startups. Our rigorous vetting process starts
                  with screening referrals from our different partners and online applications from the community. This includes investors,
                  accelerators, incubators and VC firms. We conduct interviews and due diligence process of the deals. This is followed
                  by an in depth review of our Investment Committee composed of highly successful entrepreneurs, experienced investors,
                  experts and top-level business leaders. An opportunity listed on AngelHub for investment has gone through this rigorous
                  selection process.
                </p>
                <p className="note-caption">
                  AngelHub is the <span className="text-underline">first Curated Startup Equity Investment Platform</span> for
                  Professional Investors <span className="text-underline">licensed by the SFC</span>.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="section how-it-works bg-white bg-connected">
          <div className="diamond position-absolute top-minus-25">
            <div className="inner" />
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-md-6 col-lg-5 how-it-works-details">
                <span className="h2 section-heading text-uppercase">How it works</span>
                <p className="text-gray">
                  Experience the new way to investing with access to highly curated startups while building a diversified
                  portfolio in the simplest, trustworthy and most efficient way.
                </p>
                <Link className="btn btn-primary btn-outline btn-lg text-uppercase">Get In Touch</Link>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-7 how-it-works-options">
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="text-center text-white option">
                      <i className="fa fa-list fa-4x fa-fw" />
                      <p className="caption">Highly Vetted Startup</p>
                      <p className="hover">
                        Rigorous selection process through interviews and Investment Committee composed of
                        highly successful entrepreneurs, experienced investors, experts and top-level business leaders
                      </p>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="text-center text-white option">
                      <i className="fa fa-pie-chart fa-4x fa-fw" />
                      <p className="caption">Investment Management</p>
                      <p className="hover">
                        Monitor the companies you invest in and manage your portfolio with an ongoing investor-startup relation
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="text-center text-white option">
                      <i className="fa fa-book fa-4x fa-fw" />
                      <p className="caption">Diversified Portfolio</p>
                      <p className="hover">
                        Increase the probability of success via our sector agnostic vetted startups
                      </p>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="text-center text-white option">
                      <i className="fa fa-shield fa-4x fa-fw " />
                      <p className="caption">Secure & Transparent</p>
                      <p className="hover">
                        First Equity Crowdfunding platform licensed by the SFC. Digitized
                        data-room to assess the opportunity and risks through due diligence documentation
                      </p>
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
                  <p className="exclusive-details margin-top-30">Be part of the Future by investing in the Innovative and disruptive Startups that are building it</p>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="benefits">
                  <div className="benefit">
                    <div className="row">
                      <div className="col-md-4 col-lg-2">
                        <i className="fa fa-check fa-fw" />
                      </div>
                      <div className="col-md-8 col-lg-10">
                        <p className="text-gray margin-0">Access exclusive deals vetted by our Professional Team and Investment Committee</p>
                      </div>
                    </div>
                  </div>
                  <div className="benefit">
                    <div className="row">
                      <div className="col-md-4 col-lg-2">
                        <i className="fa fa-search fa-fw" />
                      </div>
                      <div className="col-md-8 col-lg-10">
                        <p className="text-gray margin-0">
                          Discover innovative business models, new products and cutting-edge technology
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="benefit">
                    <div className="row">
                      <div className="col-md-4 col-lg-2">
                        <i className="fa fa-calendar fa-fw" />
                      </div>
                      <div className="col-md-8 col-lg-10">
                        <p className="text-gray margin-0">
                          Meet the Founders through our private events and video conference
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="benefit">
                    <div className="row">
                      <div className="col-md-4 col-lg-2">
                        <i className="fa fa-comments-o fa-fw" />
                      </div>
                      <div className="col-md-8 col-lg-10">
                        <p className="text-gray margin-0">
                          Connect and build relationships with entrepreneurs and fellow investors who share
                          your passion for a particular product, community or sector
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="benefit">
                    <div className="row">
                      <div className="col-md-4 col-lg-2">
                        <i className="fa fa-mobile fa-fw" />
                      </div>
                      <div className="col-md-8 col-lg-10">
                        <p className="text-gray margin-0">
                          Get the Investor Protection you deserve through our professional nominee structure
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="benefit">
                    <div className="row">
                      <div className="col-md-4 col-lg-2">
                        <i className="fa fa-user-plus fa-fw" />
                      </div>
                      <div className="col-md-8 col-lg-10">
                        <p className="text-gray margin-0">
                          Be part of the Future by investing in the Innovative and disruptive Startups that are building it
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section growth bg-primary hide">
          <div className="diamond border-none position-absolute top-minus-25">
            <div className="inner" />
          </div>
        </section>
      </div>
    )
  }
}
