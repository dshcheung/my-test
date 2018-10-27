import React, { Component } from 'react'

export default class OurTeam extends Component {
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
            <h1>Our Team</h1>
            <p>You can't create everything on your own.</p>
          </div>
        </div>

        <section className="who-we-are clearfix margin-top-50">
          <div className="container">
            <div className="row">
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
                          <ul className="icon">
                            <li>
                              <a href={p.linkedIn} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin fa-2x" />
                              </a>
                            </li>
                          </ul>
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
