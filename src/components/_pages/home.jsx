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
                <h1 className="text-uppercase margin-bottom-20">Invest in Highly Vetted Startups</h1>
                <p className="tagline text-uppercase margin-top-20">AngelHub: the 1st Startup Investment Platform</p>
                <p className="text-uppercase margin-bottom-50">Licensed by the SFC</p>
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
                    <span>SEP<br />1</span>
                  </div>
                  <div className="col-sm-6 col-md-9 news-details">
                    <Link className="news-link" to="https://www.slideshare.net/WHubio/hong-kong-startup-ecosystem-toolbox-v30">
                      <span className="news-title">Hong Kong Startup Ecosystem White Paper</span>
                      <p className="news-caption">
                        Discover the people that make the Startup Ecosystem, VC, funded Startups, accelerators and incubators...
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-3">
                <div className="news-item">
                  <div className="col-sm-6 col-md-3 news-date">
                    <span>SEP<br />4</span>
                  </div>
                  <div className="col-sm-6 col-md-9 news-details">
                    <Link className="news-link" to="https://techcrunch.com/2017/09/01/gogovan-becomes-hong-kongs-first-1-billion-startup-following-merger-deal/">
                      <span className="news-title">Hong Kong’s 1st unicorn is a logistic company</span>
                      <p className="news-caption">GoGoVan becomes Hong Kong’s first $1 billion startup following merger deal</p>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 col-md-3">
                <div className="news-item">
                  <div className="col-sm-6 col-md-3 news-date">
                    <span>SEP<br />19</span>
                  </div>
                  <div className="col-sm-6 col-md-9 news-details">
                    <Link className="news-link" to="https://www.eventbrite.hk/e/hong-kong-fintech-ecosystem-toolbox-2017-insights-trends-tickets-36853092592">
                      <span className="news-title">FinTech Toolbox Launch Event</span>
                      <p className="news-caption">
                        Who are the key players in the Hong Kong FinTech sector? What resources can you find in Hong Kong?
                      </p>
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
                <span className="h2 section-heading text-uppercase">Why AngelHub?</span>
                <img className="" src="https://s3-ap-northeast-1.amazonaws.com/angel-hub-dev/static/footer-logo.png" alt="Logo" />
                <p className="note-caption">
                  <strong>Our mission is simple: connect Professional Investors to high quality startups seeking funding.</strong><br />
                  To fulfill our mission, we created an innovative digital capital market which greatly reduces the traditional barriers for investing in highly vetted private companies.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="section how-it-works bg-white bg-connected">
          <div className="container-fluid">
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
