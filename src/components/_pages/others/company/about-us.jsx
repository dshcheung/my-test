import React, { Component } from 'react'

export default class AboutUs extends Component {
  render() {
    return (
      <div>
        <div className="docs-header">
          <div className="container text-white">
            <h1>AngelHub</h1>
            <p>The first regulated growth venture platform in Hong Kong, opening up access to venture capital and angel investing to everyone.</p>
          </div>
        </div>

        <section className="what-we-offer clearfix margin-top-30">
          <div className="container">
            <div className="h1 text-uppercase text-center">What We Do</div>
            <hr className="w-50" />
            <div className="col-xs-12">
              <div className="section-content">
                <div className="col-xs-12">
                  <p>AngelHub is the only (Approval in Principal) SFC Licensed highly vetted Startup Investment platform for Professional Investors. It provides access, time and know how to startups and PI to democratize the fundraising process that was reserved to an small exclusive group of people. AngelHub combines the professionalism of VCs, the flexibility of Angel investing and power of key strategic partnerships.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="who-is-behind clearfix margin-top-30">
          <div className="container">
            <div className="h1 text-uppercase text-center">Who Is Behind</div>
            <hr className="w-50" />
            <div className="col-xs-12">
              <div className="section-content">
                <div className="col-xs-12">
                  <p>People matters. Behind AngelHub is a team of passionnate entrepreneurs, innoovators and tech lovers. At the ero of the 4th industrial revolution, Startups are driving innovation and changing the future by always challenging the status quo. The Founders of WHub, the biggest Hong Kong startup ecosystem, decided to continue its mission to empower startups by democratizing fundraising and making investment in startups accessible to all Professional Investors</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="what-we-offer clearfix margin-top-30">
          <div className="container">
            <div className="h1 text-uppercase text-center">Why We're Here</div>
            <hr className="w-50" />
            <div className="col-xs-12">
              <div className="section-content">
                <div className="col-xs-12">
                  <p>Let's be part of the digital revolution and empower startups to drive wealth and economic growth by giving them the resource they need. Fundraising is a long and daunting process for entrepreneurs and they need to focus on developing their business rather than spending months fundraising. Professional Investors want to diversify their portfolio be part of the digital revolution but lack time. both entrepreneurs and Investors lack time, access and know-how to fulfill this. AngelHub is to help Professional Investors invest in the future.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
