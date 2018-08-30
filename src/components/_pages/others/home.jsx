import React, { Component } from 'react'

import SharedOthersSideTitle from '../../shared/others/side-title'

import OthersMailingForm from '../../forms/others/mailing'

export default class Home extends Component {
  render() {
    // use this banner for now until final version is created
    const banner = "https://image.ibb.co/hVFS09/banner.png"
    const committeImage = "https://media.licdn.com/dms/image/C5103AQG4w-O2qvtp7A/profile-displayphoto-shrink_800_800/0?e=1541030400&v=beta&t=IfXVk8hHFSK46AlYDIdltbMkYKzXSDoi5UqlcFSlDFw"

    return (
      <div id="page-home">
        <section className="banner clearfix">
          <div className="banner-background" style={{ backgroundImage: `url(${banner})` }} />
          <div className="h1 header text-uppercase">
            <div>Invest in the future</div>
          </div>
          <a className="btn btn-primary btn-lg px-20 rounded-2 o-90 start">START INVESTING</a>
        </section>

        <section className="what-we-offer clearfix">
          <SharedOthersSideTitle title="what we offer" optClass="col-xs-2 col-lg-3 color-primary" />

          <div className="col-xs-8 col-lg-6">
            <div className="row cards">
              <div className="col-xs-6 card">
                <div className="h5 text-uppercase">VENTURE AS AN ASSET CLASS</div>
                <div>Less than 5% of startups that apply get accepted by AngelHub. Listed startups have to get through our rigorous due diligence process</div>
              </div>

              <div className="col-xs-6 card">
                <div className="h5 text-uppercase">BUILD A DIVERSIFIED STARTUP PORTFOLIO</div>

                <div>Invest in startups from around the world across industries and sectors starting at a minimum investment of US$ 10,000</div>
              </div>

              <div className="col-xs-6 card">
                <div className="h5 text-uppercase">INVEST IN THE FUTURE</div>

                <div>Startups are driving innovation and changing the future and changing the status quo. Be a part of the digital revolution and empower startups to drive wealth and economic growth</div>
              </div>

              <div className="col-xs-6 card">
                <div className="h5 text-uppercase">POWER OF KEY STRATEGIC PARTNER</div>

                <div>We are a team of builders and operators, immersed in the startup eco- system and have built strong partnerships with incubators, accelerators and startup communities across the world</div>
              </div>

            </div>
          </div>
        </section>

        <section className="benefits clearfix text-center px-top-30 px-bottom-30">
          <div className="hidden-xs hidden-sm col-md-1">&nbsp;</div>
          <div className="col-xs-12 col-md-11 box-shadow px-0">
            <div className="col-xs-12 col-md-11 px-20">
              <div className="row title">
                <div className="h4 text-green">BENEFITS</div>
              </div>

              <div className="row images">
                <div className="col-xs-4"><i className="ahub-benefit1 ahub-5x" /></div>
                <div className="col-xs-4"><i className="ahub-benefit2 ahub-5x" /></div>
                <div className="col-xs-4"><i className="ahub-benefit3 ahub-5x" /></div>
              </div>

              <div className="row heading">
                <div className="h5 col-xs-4">Investment Portal Overview</div>
                <div className="h5 col-xs-4">Diversified Investment through a multi sector platform</div>
                <div className="h5 col-xs-4">Gain insights and keep track of your investment</div>
              </div>

              <div className="row points text-left">
                <ul className="col-xs-4 list-style-none">
                  <li><span className="text-primary margin-right-5">></span>Gives full flexibility and transparency</li>
                  <li><span className="text-primary margin-right-5">></span>Make informed decisions and build a personalised investment portfolio</li>
                  <li><span className="text-primary margin-right-5">></span>Stay informed anyway anytime</li>
                </ul>
                <ul className="col-xs-4 list-style-none">
                  <li><span className="text-primary margin-right-5">></span>Access Vetted Startup with the due dilligence documents</li>
                  <li><span className="text-primary margin-right-5">></span>From discovery and thorough evaluation, to settlement and post investment monitoring</li>
                  <li><span className="text-primary margin-right-5">></span>Centralised portal with direct access to startups and education through master classes</li>
                </ul>
                <ul className="col-xs-4 list-style-none">
                  <li><span className="text-primary margin-right-5">></span>Overview at a glance or in depth</li>
                  <li><span className="text-primary margin-right-5">></span>Analytics and post investment report</li>
                </ul>
              </div>
            </div>
            <SharedOthersSideTitle title="SFC Licensed Investment Platform" optClass="hidden-xs hidden-sm col-md-1 color-primary bg-white side-text-small px-20" />
          </div>
        </section>

        <section className="how-to-invest clearfix text-center">
          <div className="col-xs-8 col-xs-offset-2 col-lg-6 col-lg-offset-3">
            <div className="row title">
              <div className="h4 text-primary">HOW TO INVEST</div>
            </div>

            <div className="row steps text-left">
              <div className="col-xs-12">
                <div className="row top">
                  <div className="card col-xs-6">
                    <div className="h1 water-mark">01</div>
                    <div className="h4 title">Investor verification</div>

                    <div>
                      <strong>It is simple and easy</strong>
                      <p>AngelHub is a SFC-licensed entity and all Investors are required to be verified as Professional Investors before browsing any investment opportunities. Investor verification will grant you all access to startup campaigns and data room</p>
                    </div>
                  </div>

                  <div className="card col-xs-6">
                    <div className="h1 water-mark">02</div>
                    <div className="h4 title">Startup campaigns</div>

                    <div>
                      <strong>Browse diversifed investment opportunities</strong>
                      <p>Browse all AngelHub startup's campaigns and access all information you need to investment in the startup you believe in. We can also customized your feed according to your interests</p>
                    </div>
                  </div>
                </div>

                <div className="row bottom">
                  <div className="card col-xs-6">
                    <div className="h1 water-mark">03</div>
                    <div className="h4 title">Transparency & Due Dilligence</div>

                    <div>
                      <strong>Screen the campaign you like</strong>
                      <p>Access all the information you need through the campaign and data room to screen the campaign. You can also access the founders and their team face to face through events or in conference calls. Behind each tech company, there is a team of passionate and dedicated persons</p>
                    </div>
                  </div>

                  <div className="card col-xs-6 special-box">
                    <div className="h1 water-mark">04</div>
                    <div className="h4 title">Invest</div>
                    <div className="text">
                      <strong>Same terms for all investors</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="w-50" />
        <section className=" clearfix text-center">
          <div className="investment-committee">
            <div className="row">
              <div className="col-xs-12">
                <div className="row title">
                  <div className="h4 text-primary">INVESTMENT COMMITTEE</div>

                  <div className="col-xs-8 col-xs-offset-2">Our Investment Committee is comprised of highly experienced entrepreneurs, investors, industry experts and top-level business leaders will extensive experience in startup investing and scaling.</div>
                </div>

                <div className="row committees">
                  <ul className="nav members-list">
                    <li>
                      <div className="committee-img" style={{ backgroundImage: `url(${committeImage})` }}>
                        <div className="blur">
                          <div>
                            <p>Yip Wan</p>
                            <p>Company Position</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="committee-img" style={{ backgroundImage: `url(${committeImage})` }}>
                        <div className="blur">
                          <div>
                            <p>Yip Wan</p>
                            <p>Company Position</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="committee-img" style={{ backgroundImage: `url(${committeImage})` }}>
                        <div className="blur">
                          <div>
                            <p>Yip Wan</p>
                            <p>Company Position</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="philosophy clearfix text-center">
          <SharedOthersSideTitle title="SFC Licensed Investment Platform" optClass="hidden-xs hidden-sm col-md-1 color-primary bg-white side-text-small" />
          <div className="col-xs-12 col-md-6 col-md-offset-2">
            <div className="row title">
              <div className="h4 text-primary">OUR PHILOSOPHY</div>
            </div>

            <div className="row cards text-left">
              <div className="col-xs-6 card">
                <div className="h1 water-mark">WHO</div>
                <div className="h4 title">WHO IS BEHIND</div>

                <div>People matters. Behind AngelHub is a team of passionnate entrepreneurs, innoovators and tech lovers. At the ero of the 4th industrial revolution, Startups are driving innovation and changing the future by always challenging the status quo. The Founders of WHub, the biggest Hong Kong startup ecosystem, decided to continue its mission to empower startups by democratizing fundraising and making investment in startups accessible to all Professional Investors</div>
              </div>

              <div className="col-xs-6 card image">
                <div style={{ backgroundImage: `url(https://whub.io/assets/ahub/images/landing_who.jpg)` }} />
              </div>

              <div className="col-xs-6 card image">
                <div style={{ backgroundImage: `url(https://whub.io/assets/ahub/images/landing_why.jpg)` }} />
              </div>

              <div className="col-xs-6 card">
                <div className="h1 water-mark">WHY</div>
                <div className="h4 title">WHY WE ARE HERE</div>

                <div>Let's be part of the digital revolution and empower startups to drive wealth and economic growth by giving them the resource they need. Fundraising is a long and daunting process for entrepreneurs and they need to focus on developing their business rather than spending months fundraising. Professional Investors want to diversify their portfolio be part of the digital revolution but lack time. both entrepreneurs and Investors lack time, access and know-how to fulfill this. AngelHub is to help Professional Investors invest in the future.</div>
              </div>

              <div className="col-xs-6 card">
                <div className="h1 water-mark">WHAT</div>
                <div className="h4 title">WHAT WE ARE WORKING ON</div>

                <div>AngelHub is the only SFC Licensed highly vetted startup Investment platform for Professional investors. It provides access, time and know how to startups and PI to democratize the fundraising process that was reserved to an small exclusive group of people. AngelHub combines the professionalism of VCs, the flexibility of Angel investing and power of key strategic partnerships.</div>
              </div>

              <div className="col-xs-6 card image">
                <div style={{ backgroundImage: `url(https://whub.io/assets/ahub/images/landing_what.jpg)` }} />
              </div>
            </div>
          </div>
        </section>

        <section className="learn-more clearfix text-center">
          <div className="shadow col-xs-8 col-xs-offset-2 col-lg-6 col-lg-offset-3">
            <div className="row title">
              <div className="h4 text-black">LEARN MORE</div>
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-4">
                <div className="blue-hover first">
                  <i className="text-primary ahub-whitepaper" />
                  <div className="h5 margin-bottom-20">White paper</div>
                  <a className="btn btn-dark btn-block">DOWNLOAD</a>
                </div>
              </div>
              <div className="col-xs-12 col-md-4">
                <div className="blue-hover">
                  <i className="text-primary ahub-newsletter" />
                  <div className="h5 margin-bottom-20">Newsletter</div>
                  <a className="btn btn-dark btn-block">SUBSCRIBE</a>
                </div>
              </div>
              <div className="col-xs-12 col-md-4">
                <div className="blue-hover last">
                  <i className="text-primary ahub-education" />
                  <div className="h5 margin-bottom-20">Education Centre</div>
                  <a className="btn btn-dark btn-block">START LEARNING</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="launch-today clearfix text-center">
          <div className="col-xs-12">
            <div className="row title">
              <div className="h4 text-primary">LAUNCH A FUNDRAISE FOR YOUR BUSINESS TODAY</div>
            </div>

            <div className="row text-left">
              <OthersMailingForm
                optClass="col-xs-8 col-xs-offset-2 col-lg-6 col-lg-offset-3 dark"
                onSubmit={() => {}}
              />
            </div>
          </div>
        </section>

        <section className="media clearfix text-center px-top-50 px-bottom-50">
          <div className="col-xs-12">
            <div className="row title">
              <div className="h4 text-uppercase text-gold">Media</div>
            </div>
            <div className="container margin-top-30">
              <div className="row">
                <div className="col-xs-6 col-md-3">
                  <a className="thumbnail"><img src="https://whub.io/assets/ahub/images/landing_media2.jpg" alt="NY Times" /></a>
                </div>
                <div className="col-xs-6 col-md-3">
                  <a className="thumbnail"><img src="https://whub.io/assets/ahub/images/landing_media3.png" alt="BBC News" /></a>
                </div>
                <div className="col-xs-6 col-md-3">
                  <a className="thumbnail"><img src="https://whub.io/assets/ahub/images/landing_media1.png" alt="WSJ" /></a>
                </div>
                <div className="col-xs-6 col-md-3">
                  <a className="thumbnail"><img src="https://whub.io/assets/ahub/images/landing_media4.png" alt="HKET" /></a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
