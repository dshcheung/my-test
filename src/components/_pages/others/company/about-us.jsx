import React, { Component } from 'react'

// import SharedOthersSideTitle from '../../../shared/others/side-title'

export default class AboutUs extends Component {
  render() {
    const people = [
      { name: "Karen Contet Farzam", title: "Founder & CEO", image: 'http://angelhub.io/images/team/team_karen.jpg', link: 'https://www.linkedin.com/in/karencontetfarzam/' },
      { name: "Karena Belin", title: "Founder & COO", image: 'http://angelhub.io/images/team/team_karena.jpg', link: 'https://www.linkedin.com/in/karenabelin/' },
      { name: "Gram Milosevic", title: "Alchemist & CTO", image: 'http://angelhub.io/images/team/team_gram.jpg', link: 'https://www.linkedin.com/in/grahammilosevic/' },
      { name: "Nicolas Breitburd", title: "Head of Development", image: 'http://angelhub.io/images/team/team_nicolas.jpg', link: 'https://www.linkedin.com/in/nicolasbreitburd/' },
      { name: "Jason Gerber", title: "Compliance Officer", image: 'http://angelhub.io/images/team/team_jason.jpg' },
      { name: "Pritish Sanyal", title: "Investor Director", image: 'http://angelhub.io/images/team/team_pritish.jpg', link: 'https://www.linkedin.com/in/pritishsanyal/' },
      { name: "Denis Cheung", title: "Senior Developer", image: 'http://angelhub.io/images/team/team_denis.jpg', link: 'https://www.linkedin.com/in/dshcheung/' },
      { name: "Kartik Parameswaran", title: "Finance Manager", image: 'http://angelhub.io/images/team/team_kartik.jpg', link: 'https://www.linkedin.com/in/kartik-%E5%8D%A1%E8%BF%AA%E5%85%8B%EF%BC%89-parameswaran-97235659/' },
    ]

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

        <section className="who-we-are clearfix margin-top-50 margin-bottom-30">
          <div className="container">
            <div className="row">
              <div className="h1 text-uppercase text-center">Our Team</div>
              <hr className="w-50" />
              {
                people.map((p, i) => {
                  return (
                    <div key={i} className="col-md-3 col-sm-6 margin-top-10">
                      <div className="hover-info">
                        <img src={p.image} alt={p.name} />
                        <div className="box-content">
                          <h3 className="name">{p.name}</h3>
                          <span className="title">{p.title}</span>
                          {
                            p.link && (
                              <ul className="no-bullets pull-right bio-share">
                                <li>
                                  <a href={p.linkedIn} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin fa-2x" />
                                  </a>
                                </li>
                              </ul>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </section>
      </div>
    )
  }
}
