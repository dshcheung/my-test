import React, { Component } from 'react'

export default class Guides extends Component {
  getInfo() {
    return [
      {
        category: "Video",
        title: "Introduction to Fintech.",
        description: "A MOOC program designed and created by The University of Hong Kong in association with leading academics and practitioners from around the world about the innovations, technology and regulation driving the transformation of finance.",
        link: "https://www.edx.org/course/introduction-to-fintech",
        img: "http://angelhub.io/images/guides/fintech-hku.jpg"
      }, {
        category: "Video",
        title: "Chinese Fintech Industry Overview asfs fsa fsadfsadf sf asfasdf s",
        description: "Chinese consumers, who have few reservations about sharing personal information, are ready to embrace FinTech offerings, creating opportunities for FinTech firms and incumbents willing to take on digital transformation.",
        link: "https://www.youtube.com/watch?v=qBozRbPQEU4&feature=youtu.be",
        img: "http://angelhub.io/images/guides/chinese-fintech.jpg"
      }, {
        category: "Video",
        title: "What is Equity and Debt fundraising?",
        link: "https://zegal.com/zegal-u/fundraising-equity-and-debt/",
        img: "http://angelhub.io/images/guides/fundraising-equity-and-debt.jpg"
      }, {
        category: "Video",
        title: "How Does a Convertible Note Work?",
        description: "A convertible note is a form of short-term debt that converts into equity, typically in conjunction with a future financing round; in effect, the investor would be loaning money to a startup and instead of a return in the form of principal plus interest, the investor would receive equity in the company.",
        link: "https://zegal.com/zegal-u/how-does-a-convertible-note-work/",
        img: "http://angelhub.io/images/guides/fundraising-convertible-note.jpg"
      }, {
        category: "Blog",
        title: "Hong Kong - From an International Financial Centre",
        description: "Hong Kong is one of the most powerful Financial centres in the world, ranking third worldwide and and first in Asia. In order to maintain this competitive advantage Hong Kong needs to develop itself as a FinTech Hub.",
        link: "https://www.linkedin.com/pulse/fintech-natural-evolution-financial-industry-karen-contet-farzam/",
        img: "http://angelhub.io/images/guides/hk-echo.jpg"
      }, {
        category: "Blog",
        title: "How to fund your business?",
        description: "All businesses require capital. Whether it is to start a company, pay salaries, innovate, or spend on marketing, your business won’t be able to grow without any funding. There are many ways to raise capital. It is important to understand the advantages and disadvantages of different types of fundraising and to make sure you use the right documents when raising finance.",
        link: "https://zegal.com/blog/post/fund-your-business/",
        img: "http://angelhub.io/images/guides/zegal.png"
      }, {
        category: "Blog",
        title: "How to fundraise through crowdfunding?",
        description: "Crowdfunding, also known as crowdsourcing, is the process of a company publishing via a platform a request for funding and allowing interested investors to advance a portion of the amount that the company is seeking. Crowdfunding platforms typically have a less stringent process for starting a crowdfunding campaign. Rather, it is the potential investors who contribute to your crowdfunding campaign that make the decision on whether to invest based on their evaluation of your company’s proposal, track record and team. The reach of a crowdfunding campaign is also much wider, as potential investors from all around the world with access to online crowdfunding platforms will have the opportunity to view your campaign. Crowdfunding can be done via either equity financing or debt financing.",
        link: "https://zegal.com/blog/post/fundraising-business-consider-crowdfunding/",
        img: "http://angelhub.io/images/guides/zegal.png"
      }, {
        category: "Blog",
        title: "How to raise funds through convertible notes?",
        description: "A convertible note is a form of short-term debt paid back in equity. The investor puts cash in your startup and receives discounted shares when you issue shares at a later point. In other words, they don’t “own” part of your company just yet – this essentially means you get to retain control. At the same time, the investor is still considered a debtor.",
        link: "https://zegal.com/blog/post/fundraising-via-convertible-note-explained/",
        img: "http://angelhub.io/images/guides/zegal.png"
      }
    ]
  }

  render() {
    return (
      <div id="page-guides" className="clearfix margin-top-20">
        <div className="col-xs-12 col-md-10 col-md-offset-1">
          <div className="row items">
            {
              this.getInfo().map((info, i) => {
                const style = {
                  backgroundImage: `url(${info.img})`
                }
                return (
                  <div key={i} className="col-xs-6 col-md-4 col-lg-3 item-wrapper">
                    <a
                      href={info.link}
                      className="item px-bottom-10"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="banner" style={style}>
                        <span>{info.category}</span>
                      </div>

                      <div className="title margin-top-5 margin-bottom-10 pointer" title={info.title}>
                        <p className="h5 margin-top-0 margin-bottom-0">{info.title}</p>
                      </div>

                      <div className="description pointer" title={info.description}>
                        <p>{info.description}</p>
                      </div>
                    </a>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
