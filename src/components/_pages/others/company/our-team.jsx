import React, { Component } from 'react'

export default class OurTeam extends Component {
  render() {
    const people = [
      {
        name: "Karen Contet Farzam",
        title: "Founder & CEO - Responsible Officer",
        image: 'http://angelhub.io/images/team/team_karen.jpg',
        link: 'https://www.linkedin.com/in/karencontetfarzam/',
        bio: `Karen Contet Farzam is passionate about Technology and Startups with a background in investment banking in JP Morgan.
        She is the co-founder & CEO of AngelHub - Hong Kong’s first Startup Investment platform for professional investors -
        co-founder & Chief Hustler of WHub.io - Hong Kong biggest startup community - and a founding board member of the
        FinTech Association of Hong Kong - co-lead the Best Practices on Token Sale published end of 2017 and board sponsor
        of the Policy and Advocacy Committee.
        Immersed in the startup scene, she is a French Foreign Trade Advisor, Accelerator Programs Mentor, International
        Conference Speaker (InspireFest2018 in Dublin, JS conference in Singapore, Vivatech in France, RISE in Hong Kong),
        FrenchTech Ambassador and WomenWhoCodeHK Founder.
        Karen has been working in Asia for 13 years, starting in Tokyo as JP Morgan Exotic Equity Derivatives Trader to
        Software Engineer for an IoT Startup and teaching Front-End Web Development.
        Karen has a double degree engineering diploma (France EPF - Canada ETS) and Master in Finance International from HEC Paris.`
      },
      {
        name: "Karena Belin",
        title: "Founder & COO/CFO - Responsible Officer",
        image: 'http://angelhub.io/images/team/team_karena.jpg',
        link: 'https://www.linkedin.com/in/karenabelin/',
        bio: `Karena Belin is Founder and CEO of HK’s biggest startup platform and community builder WHub (whub.io) and Founder and COO/CFO of AngelHub (angelhub.io), Hong Kong’s first (approval in principle) SFC licensed startup investment platform for professional investors and global startups raising growth capital.

              Since 2013, she has been passionate about entrepreneurship and a leader in the startup scene. She acts currently as speaker, mentor and judge at events and organisations such as the Chicago Booth GNVC, Google EYE, RISE Conference and Web Summit, Jeju Peace and Prosperity Conference, FinTech Valley Vizag India, Techsauce Thailande, Asia Pacific Konferenz, Tech Open Air Berlin, IFLR, Nexchange, Techstar’s StartupWeekendHK, global YPO YNG+ and more.  She is a Member of the Global FinTech Core Group at the Government of Andhra Pradesh, member of the FinTech Association of Hong Kong (FTAHK), The Indus Entrepreneurs Network (TiE), President of the board of the parent organisation (PFO) at Hong Kong International School,  as well as driving diversity and inclusion as board member of WOW at the American Women’s Association.

              Karena Belin holds a double diploma in business and administration from the University of
              Mannheim and the MBA business school ESSEC in Paris. She has worked 15 years for Procter & Gamble in various roles including Finance, Sales and Strategy across Europe, North East Asia and Greater China before co-founding W Hub. She has extensive background in business and financial planning, business acquisition and integration (leading Gillette integration in Japan).`
      },
      {
        name: "Gram Milosevic",
        title: "Alchemist & CTO",
        image: 'http://angelhub.io/images/team/team_gram.jpg',
        link: 'https://www.linkedin.com/in/grahammilosevic/',
        bio: `Gram has been developing for 17 years in various languages (Ruby, Python, Java, C#) and different domains.
              He has worked for over a year as Visual Engineer and Dev Ops for Noble Group. Prior to that, he has been the
              head of digital of the Hong Kong based agency AlchemyAsia. He has also been the platform creator and Alchemist
              of Hong Kong’s startup success BEECRAZY.` },
      {
        name: "Pritish Sanyal",
        title: "Investor Director",
        image: 'http://angelhub.io/images/team/team_pritish.jpg',
        link: 'https://www.linkedin.com/in/pritishsanyal/',
        bio: `Pritish has 10+ years of experience in which he has built and scaled early and late-stage startups
              across Asia and worked with organizations such as Accenture. He has experience across multiple
              industries in building and scaling businesses. He has closely worked with investors, VCs and
              family funds and most recently worked for as a founding team member of a premier venture
              builder in SEA founded by ex-AirBnB and WeWork senior employees. He is also a fellow of
              StartingBloc and RealAcad. He has an MBA from The University of Hong Kong and London
              Business School and Bachelor in Engineering from India.` },
      {
        name: "Nicolas Breitburd",
        title: "Head of Development",
        image: 'http://angelhub.io/images/team/team_nicolas.jpg',
        link: 'https://www.linkedin.com/in/nicolasbreitburd/',
        bio: `Holder of an executive MBA from INSEAD, Nicolas has been leading companies on the path of sustainable growth over the past 20 years.
              During 2015, Nicolas decided to move to Asia and settled in Hong-Kong, where he started advising and coaching start-up companies
              for their development. He also launched his own trading company in connection with his former industry expertise.
              In 2016, he joined the WHub Team and started helping startups of this large community to get ready for their fundraising.
              Focusing on AngelHub new venture was the next logical move to get to the next step in terms of fostering the Hong Kong
              ecosystem funding. As Head of Development, Nicolas is now in charge of building up the deal flow funnel, in collaboration
              with strategic partners, after having contributed to the Platform design.
              Experimenting, learning from new situations, building businesses, knowing new people, growing networks, It is Nicolas’ way
              to remain inspired and open-minded. Being an entrepreneur himself, Nicolas gives back part of his experience by helping the
              Startup founders to thrive and succeed, thanks to AngelHub Passion, Vision and Mission.` },
      {
        name: "Jason Gerber",
        title: "Compliance Officer",
        image: 'http://angelhub.io/images/team/team_jason.jpg',
        bio: `Jason has over 25 years’ experience advising companies in Asia on a broad range of corporate
              and legal matters including governance, regulatory compliance, M&A structuring and execution,
              joint ventures, cross border transactions, strategic partnerships, corporate restructurings, capital
              raising, intellectual property, international commercial dispute resolution, and business model
              execution from greenfield to market, in fintech, integrated media, FMCG, ecommerce,
              professional services, charitable ventures, commodities trading, tourism and hospitality. He
              began his career working for a boutique management consulting firm advising MNCs on market
              entry, market development and supply chain matters for the Greater China market. After
              returning to the US for law school, Jason resumed his career in Asia where, for the past 16 years,
              he has advised fast growing technology companies both as in house counsel and working with
              PE firms and family offices` },
      {
        name: "Denis Cheung",
        title: "Senior Developer",
        image: 'http://angelhub.io/images/team/team_denis.jpg',
        link: 'https://www.linkedin.com/in/dshcheung/',
        bio: `Denis is a Business Finance Major that has a passion for web development.
              Through various means, he educated himself to further advance his skills in development and has
              transitioned himself to a Full Stack Developer. In his journey, he transformed from a student to an
              instructor at General Assembly's Web Development Course and started his own business to take up
              consultancy work specifically for startups.`
      },
      {
        name: "Kartik Parameswaran",
        title: "Finance Manager",
        image: 'http://angelhub.io/images/team/team_kartik.jpg',
        link: 'https://www.linkedin.com/in/kartik-%E5%8D%A1%E8%BF%AA%E5%85%8B%EF%BC%89-parameswaran-97235659/',
        bio: `Kartik Parameswaran is a recent MBA graduate from the University of Hong Kong. He is a Chartered Accountant (CPA)
              by qualification and also a Master and a Bachelor in Commerce graduate from the University of Mumbai in India.
              He comes in with a first hand M&A experience having gained the same from selling his family business. He has a banking
              and financial services background, with experience in custody, foreign trade and stockbroking having worked in corporations
              such as Citibank NA and Deutsche Bank Group. Additionally, he has also done two internships during his MBA program
              with Transfer-To, a FinTech start-up based out of Singapore supporting their M&A team and with Infiniti Motors as a
              Finance intern. He loves to continually upgrade his knowledge and spends time in this regard whenever possible.
              When he is off work and studies, he enjoys travelling and deep-diving into Chinese culture. He speaks fluent mandarin
              Chinese. He also loves helping charities across Hong Kong and is involved with various volunteering projects across Hong Kong.
              Kartik has recently joined AngelHub as a Finance and Accounting Manager shortly after formally completing his MBA and
              is excited about the future of AngelHub, which promises to bring in a lot of exciting opportunities.` },
    ]
    return (
      <div>
        <div className="docs-header">
          <div className="container text-white">
            <h1>AngelHub Team</h1>
            <p>You can't create everything on your own.</p>
          </div>
        </div>

        <section className="who-we-are clearfix margin-top-50 margin-bottom-50">
          <div className="container">
            {
              people.map((p, i) => {
                return (
                  <div key={i} className="row">
                    <div className="col-sm-6 col-md-4 text-center">
                      <img src={p.image} alt={p.name} className="img-responsive" />
                    </div>
                    <div className="col-sm-6 col-md-8">
                      <div className="box-content">
                        <h3 className="name margin-top-0 margin-bottom-0">
                          {p.name}
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
                        </h3>
                        <div className="title text-bold margin-bottom-10">{p.title}</div>
                        <div className="bio-content">{p.bio}</div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </section>
      </div>
    )
  }
}
