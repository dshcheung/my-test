import React, { Component } from 'react'

import SharedOthersSideTitle from '../../shared/others/side-title'

import OthersMailingForm from '../../forms/others/mailing'

export default class Home extends Component {
  render() {
    // use this banner for now until final version is created
    const banner = "https://image.ibb.co/hVFS09/banner.png"
    const committeImage = "https://media.licdn.com/dms/image/C5103AQG4w-O2qvtp7A/profile-displayphoto-shrink_800_800/0?e=1541030400&v=beta&t=IfXVk8hHFSK46AlYDIdltbMkYKzXSDoi5UqlcFSlDFw"
    const philosophyImage = "https://agilutions.com/wp-content/uploads/2018/04/team-coding-300x200.jpg"

    return (
      <div id="page-home">
        <section className="banner clearfix">
          <div className="banner-background" style={{ backgroundImage: `url(${banner})` }} />
          <div className="h2 header">
            <div>BUILD A DIVERSIFED</div>
            <div>STARTUP PORTFOLIO</div>
          </div>
          <a className="btn btn-default start">START INVESTING</a>
        </section>

        <section className="what-we-offer clearfix">
          <SharedOthersSideTitle title="what we offer" optClass="col-xs-2 col-lg-3 color-primary" />

          <div className="col-xs-8 col-lg-6">
            <div className="row cards">
              <div className="col-xs-6 card">
                <div className="h5">PROFESSIONALISM OF VENTURE CAPITAL</div>

                <div>Invest in highly Vetted Startup. The startups listed on AngelHub must all passed a screening, due diligence process and Investment committee</div>
              </div>

              <div className="col-xs-6 card">
                <div className="h5">FLEXIBILITY OF ANGEL INVESTING</div>

                <div>Invest a minimum of US$10,000, much lower than any startup investment to diversify yorr portfolio</div>
              </div>

              <div className="col-xs-6 card">
                <div className="h5">INVEST IN THE FUTURE</div>

                <div>Startups are driving innovation and changing the future and changing the status quo. be part of the digital revolution and empower startups to drive wealth and economic growth</div>
              </div>

              <div className="col-xs-6 card">
                <div className="h5">POWER OF KEY STRATEGIC PARTNERSHIPS</div>

                <div>AngelHub's team is emerge in the Startup ecosystem and has build key partnerships with accelerators, incubators, startup communities over the world to foster the most promising startups</div>
              </div>

              <div className="col-xs-6 card">
                <div className="h5">WORLDWIDE STARTUPS</div>

                <div>Invest a minium of US$10,000, much lower than any startup investment to diversify your portfolio</div>
              </div>
            </div>
          </div>
        </section>

        <section className="benefits clearfix text-center">
          <div className="col-xs-8 col-xs-offset-2 col-lg-6 col-lg-offset-3">
            <div className="row title">
              <div className="h4 text-primary">BENEFITS</div>
            </div>

            <div className="row images">
              <div className="col-xs-4"><i className="fas fa-laptop" /></div>
              <div className="col-xs-4"><i className="fas fa-leaf" /></div>
              <div className="col-xs-4"><i className="fas fa-chart-line" /></div>
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
                      <strong>Same contract for everybody</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="investment-committee clearfix text-center">
          <div className="col-xs-8 col-xs-offset-2 col-lg-6 col-lg-offset-3">
            <div className="row title">
              <div className="h4 text-primary">INVESTMENT COMMITTEE</div>

              <div className="col-xs-8 col-xs-offset-2">Our Investment Committee is comprised of highly experienced entrepreneurs, investors, industry experts and top-level business leaders will extensive experience in startup investing and scaling.</div>
            </div>

            <div className="row committees">
              <div className="committee-img margin-left-10 margin-right-10" style={{ backgroundImage: `url(${committeImage})` }}>
                <div className="blur">
                  <div>
                    <p>Yip Wan</p>
                    <p>Company Position</p>
                  </div>
                </div>
              </div>

              <div className="committee-img margin-left-10 margin-right-10" style={{ backgroundImage: `url(${committeImage})` }}>
                <div className="blur">
                  <div>
                    <p>Yip Wan</p>
                    <p>Company Position</p>
                  </div>
                </div>
              </div>

              <div className="committee-img margin-left-10 margin-right-10" style={{ backgroundImage: `url(${committeImage})` }}>
                <div className="blur">
                  <div>
                    <p>Yip Wan</p>
                    <p>Company Position</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="partners clearfix text-center">
          <div className="col-xs-8 col-xs-offset-2 col-lg-6 col-lg-offset-3">
            <div className="row title">
              <div className="h4 text-primary">OUR PARTNERS</div>

              <div className="col-xs-8 col-xs-offset-2">Our Partners have a deep passion and expertise in the startup ecosystem. Amongst them, we work with leading acceleration programs, family offices and associations involved in scaling and investing in the most promising startups in their respective field, regionally and globally.</div>
            </div>

            <div className="row logos">
              <div>Amazon</div>
              <div>pipedrive</div>
              <div>React</div>
              <div>slack</div>
              <div>zendesk</div>
              <div>asana</div>
            </div>
          </div>
        </section>

        <section className="philosophy clearfix text-center">
          <div className="col-xs-8 col-xs-offset-2 col-lg-6 col-lg-offset-3">
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
                <div style={{ backgroundImage: `url(${philosophyImage})` }} />
              </div>

              <div className="col-xs-6 card image">
                <div style={{ backgroundImage: `url(${philosophyImage})` }} />
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
                <div style={{ backgroundImage: `url(${philosophyImage})` }} />
              </div>
            </div>
          </div>
        </section>

        <section className="learn-more clearfix text-center">
          <div className="shadow col-xs-8 col-xs-offset-2 col-lg-6 col-lg-offset-3">
            <div className="row title">
              <div className="h4 text-primary">LEARN MORE</div>
            </div>

            <div className="row">
              <div className="col-xs-4">
                <i className="text-primary fas fa-file-alt" />
                <div className="h4">White paper</div>
              </div>
              <div className="col-xs-4">
                <i className="text-primary fas fa-envelope-open" />
                <div className="h4">Newsletter</div>
              </div>
              <div className="col-xs-4">
                <i className="text-primary fas fa-handshake" />
                <div className="h4">Education Centre</div>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-4">
                <a className="btn btn-default">DOWNLOAD</a>
              </div>
              <div className="col-xs-4">
                <a className="btn btn-default">SUBSCRIBE</a>
              </div>
              <div className="col-xs-4">
                <a className="btn btn-default">START LEARNING</a>
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
      </div>
    )
  }
}
