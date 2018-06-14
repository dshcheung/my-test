import React, { Component } from 'react'
import { Link } from 'react-router'

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
                <span className="news-heading h4 text-uppercase">
                  Latest Insights, Trends and Analysis
                </span>
              </div>
              <div className="col-sm-12 col-md-3">
                <div className="news-item">
                  <div className="col-sm-6 col-md-3 news-date">
                    <span>SEP<br />1</span>
                  </div>
                  <div className="col-sm-6 col-md-9 news-details">
                    <Link className="news-link" to="https://www.slideshare.net/WHubio/hong-kong-startup-ecosystem-toolbox-v30" target="_blank" rel="noopener noreferrer">
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
                    <Link className="news-link" to="https://techcrunch.com/2017/09/01/gogovan-becomes-hong-kongs-first-1-billion-startup-following-merger-deal/" target="_blank" rel="noopener noreferrer">
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
                    <Link className="news-link" to="https://www.eventbrite.hk/e/hong-kong-fintech-ecosystem-toolbox-2017-insights-trends-tickets-36853092592" target="_blank" rel="noopener noreferrer">
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
              <div className="col-md-8 col-md-offset-2 bg-primary text-center note-details">
                <img src="https://s3-ap-northeast-1.amazonaws.com/angel-hub-dev/static/footer-logo.png" alt="Logo" />
                <span className="h2 section-heading text-uppercase">Why AngelHub?</span>
                <p className="note-caption text-bold">
                  Our mission is simple: connect Professional Investors to high quality startups seeking funding.
                </p>
                <p className="note-caption">
                  To fulfill our mission, we created an innovative digital capital market which greatly reduces the
                  traditional barriers for investing in highly vetted private companies.
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
            <div className="container selecting-the-best">
              <div className="row">
                <div className="col-xs-12">
                  <div className="h1 text-center section-heading margin-top-0 margin-bottom-10">Selecting the Best Startups</div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-md-6 col-md-offset-1">
                  <ul className="nav nav-list-icons">
                    <li className="nav-list-item">
                      <div className="list-icon">
                        <i className="fa fa-search fa-fw fa-4x" />
                      </div>
                      <div className="list-text">
                        <strong>Deal Origination</strong>
                        <p>
                          Our rigorous vetting process starts with screening referrals from our different partners and online
                          applications from the community. This includes investors, accelerators, incubators and VC firms.
                          All startups apply online through our detail questionnaire about their company, team, idea, problem,
                          market opportunity, competition analysis, previous funding, technology, milestones and financials.
                        </p>
                      </div>
                    </li>
                    <li className="nav-list-item">
                      <div className="list-icon">
                        <i className="fa fa-lightbulb-o fa-fw fa-4x" />
                      </div>
                      <div className="list-text">
                        <strong>Deal Selection</strong>
                        <p>
                          We conduct interviews and due diligence process of the deals. We want to know more about the
                          company and the people. This is followed by an in depth review of our Investment Committee
                          composed of highly successful entrepreneurs, experienced investors, experts and top-level business leaders.
                        </p>
                      </div>
                    </li>
                    <li className="nav-list-item">
                      <div className="list-icon">
                        <i className="fa fa-paper-plane fa-fw fa-4x" />
                      </div>
                      <div className="list-text">
                        <strong>Deal Launch</strong>
                        <p>
                          The deal information and due diligence documents are uploaded to the platform and launched for our investor community.
                          An opportunity listed on AngelHub for investment has gone through this rigorous selection process.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="col-xs-12 col-md-4">
                  <img src="https://s3-ap-northeast-1.amazonaws.com/angel-hub-dev/static/landing-imac.png" className="img-responsive" alt="Screenshot" />
                </div>
              </div>
            </div>
            <div className="row exclusive-benefits">
              <div className="col-md-12 col-lg-6 skew-20">
                <div className="bg-exclusive">
                  <div className="section-heading h1 text-white text-uppercase">Exclusive Investor Benefits</div>
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
