import React, { Component } from 'react'
import Carousel from 'react-bootstrap/lib/Carousel'

import SharedOthersSideTitle from '../../shared/others/side-title'

import OthersMailingForm from '../../forms/others/mailing'

export default class Home extends Component {
  render() {
    // use this banner for now until final version is created
    const banner1 = "https://image.ibb.co/my9NCK/slide1_img.jpg"
    const b1l = "https://image.ibb.co/fvf7ez/slide1_pattern_Left.png"
    const b1r = "https://image.ibb.co/kpQJme/slide1_pattern_Right.png"
    const banner2 = "https://image.ibb.co/iEZYKz/slide2_img.jpg"
    const b2l = "https://image.ibb.co/md2yme/slide2_pattern_Left.png"
    const b2r = "https://image.ibb.co/kPDFXK/slide2_pattern_Right.png"
    const banner3 = "https://image.ibb.co/i9AUsK/slide3_img.jpg"
    const b3l = "https://image.ibb.co/fXYFXK/slide3_pattern_Left.png"
    const b3r = "https://image.ibb.co/eJUpsK/slide3_pattern_Right.png"
    const banner4 = "https://image.ibb.co/iySQXK/slide4_img.jpg"
    const b4l = "https://image.ibb.co/ivJ4Re/slide4_pattern_Left.png"
    const b4r = "https://image.ibb.co/kmiXCK/slide4_pattern_Right.png"
    const banner5 = "https://image.ibb.co/jOQesK/slide5_img.jpg"
    const b5l = "https://image.ibb.co/n69Tme/slide5_pattern_Left.png"
    const b5r = "https://image.ibb.co/b9qesK/slide5_pattern_Right.png"

    const people = [
      {
        name: "Ada Yip",
        image: "https://image.ibb.co/kL9mde/AdaYip.png",
        title: "Director at WYNG43 Social Investment",
        link: "https://www.linkedin.com/in/ada-yip-hongkong",
        bio: [
          "Ada is a director at WYNG43 Social Investment, which invests financial and human capital in innovative social start-ups.Ada Yip is also the CEO at Urban Spring, a purpose-driven start-up with a mission to reduce the consumption of single-use plastic in Hong Kong by building a water refill network.",
          "Previously, she was the Program Director of the i2i (incubation to investment) programme at SOW Asia, a Hong Kong-based impact investor and accelerator. Before joining the impact investing industry, Ada worked at a number of financial institutions in Toronto, Hong Kong and Tokyo.",
          "Ada is on the board of the Hong Kong Institute of Social Impact Analysts, Teach4HK and Education For Good. She is a member of the Advisory Committee at the Enhancing Self-Reliance Through District Partnership Programme under the Home Affairs Department of the Hong Kong Government.",
          "Ada earned a BSc in Economics from the London School of Economics."
        ]
      }, {
        name: "Alice Lopin",
        image: "https://image.ibb.co/i22iPK/Alice_Lopin.png",
        title: "Retail Store Leader @ Apple",
        link: "https://www.linkedin.com/in/alice-lopin-7820a77/?originalSubdomain=hk",
        bio: [
          "Alice Lopin is a global leader who has lived and worked in 8 countries including the USA, Japan, the UK, China, Singapore and France.",
          "With nearly twenty years of experience in Asia, Alice is an expert of the Chinese culture and Asian markets. From 2006, she supported the international growth of Chinese jeweller Qeelin, until it’s acquisition in 2012 by Kering-Gucci group, making it the very first Chinese luxury brand ever to be aquired by an international luxury group.",
          "Alice has held various leadership positions in the luxury industry, with a track record in opening new markets, bringing innovation to market, and putting together highly diverse teams.",
          "She then took a turn into tech and joined Apple, opening multiple Apple Stores in Asia. Alice leads teams of several hundreds to engage customers to achieve ownership, learn new skills, get technical support, and identify business solutions for entrepreneurs and businesses seeking innovation. She builds these lines of business by selecting top talent for Apple, and supporting her teams to achieve their fullest potential.",
          "Passionate Community leader, Alice was a founding member of the Ladies of Luxury network in Hong Kong, a think tank focused on Branding, Innovation, Creativity and Design. Alice has been a Community Engagement Lead for Apple in Hong Kong, and is currently co-chair of Women@Apple in Singapore.",
          "Alice holds a Masters in Business from HEC Paris as well as a Masters in Corporate Law from Paris II-Assas Law school. She graduated in 2004 as an expert gemologist from the GIA. Alice was appointed in 2013 French Foreign Trade Advisor (CCE). The same year, Alice was nominated for the HEC Trajectories (under 40) Award, and received the Rising Talent Award from the Women’s Forum in 2014."
        ]
      }, {
        name: "Bay McLaughlin",
        image: "https://image.ibb.co/e64Kye/Bay_Mc_Laughlin.png",
        title: "Co-Founder of Brinc",
        link: "https://www.linkedin.com/in/betabay/",
        bio: [
          "Bay is a Co-Founder of Brinc, a global IoT accelerator, manufacturing studio, and online hardware community based in Hong Kong with offices in Shenzhen, Guangzhou, London, Barcelona, Tel Aviv and Bahrain. He currently holds equity positions in 52 companies in 20 countries, serves on the board of Soundbrenner, Silentmode and Brinc, and is a contributor for Forbes and a KOL for Huawei. He now brings his experience and operations abilities to connect the dots from Asia to Silicon Valley for IoT companies from around the world.",
          "Over half of this time was spent at Apple as a founding team member of their global SMB channel and as the founder of their first Entrepreneurship Evangelism channel. His division at Apple has grossed more than $350M USD in sales and is still the best team globally in Apple SMB's division.",
          "As a regular mentor for Chinaccelerator, the Thiel Foundation, and other startup ecosystems in Asia, Bay is passionate about investing in founders with a global vision."
        ]
      }, {
        name: "Bénédicte Nolens",
        image: "https://image.ibb.co/hihTrz/Benedicte_Nolens.png",
        title: "Financial Services; Fintech",
        link: "https://www.linkedin.com/in/benedicte-n-nolens-77529747/",
        bio: [
          "Bénédicte is a former Head of Risk and Strategy of Hong Kong of the Hong Kong Securities and Futures Commission. Currently, Bénédicte is the Head of Regulatory Affairs for Asia and Europe for Circle, a Board Member of the Hong Kong Fintech Association and a Member of the Global Digital Finance Advisory Council.",
          "From 2007 to 2012 she was a Managing Director at Credit Suisse before which she was an Executive Director at Goldman Sachs. Bénédicte holds an LLM and MBA from the University of Chicago.",
          "In 2016 she was a recipient of the China Daily Asian Women Leadership Awards for people who are dedicated to entrepreneurialism, innovation and change."
        ]
      }, {
        name: "Cesar Jung-Harada",
        image: "https://image.ibb.co/geuDPK/Cesar_Harada.png",
        title: "MakerBay and Scoutbots Director",
        link: "https://www.linkedin.com/in/cesarharada/",
        bio: [
          "Cesar Jung-Harada, CEO of MakerBay (Hong Kong MakerSpace for Social and Environmental Impact), Scoutbots and Protei INC (Ocean Robotics), is a French-Japanese environmentalist, inventor and entrepreneur based in Hong Kong.",
          "He is a former MIT project leader, TED Senior Fellow, GOOD 100, IBM Figure of Progress, Unreasonable at Sea Fellow, Shuttleworth foundation and Ocean Exchange grantee. His company Scoutbots was nominated StartmeUp HK Grand Award winner and listed as China 10th most innovative company by FastCo (2015).",
          "Cesar often works as a professional speaker, panelist, educator, mentor, judge, designer, R&D. His TED Talk 'How I Teach Kids to Love Science' has been translated into 36 languages and viewed more than 1.5 million times. He is passionate about “Open Hardware for the Environment”, 'Citizen Science' with a strong focus on ocean communities & technologies.",
          "He used to teach Masters of “Design and Environment” at Goldsmiths University and 'Cultural Entrepreneurship' at HKU (Hong Kong). Cesar won the Ars Electronica Golden Nica [NEXT IDEA] with his Master graduation project from the Royal College of Arts, London. His works are part of the V&A (Victoria and Albert Museum, London) and CNAM (Musée des Arts et Metiers, Paris) collections.",
          "Cesar has lectured and mentored in many universities including MIT, Royal College of Arts, Central Saint Martins, Ecole Nationale Supérieure d'architecture de Versailles, Tokyo University (Japan), CCCB (Spain), Strathmore University (Kenya), Oslo School of Architecture and Design (Norway) and HKUST."
        ]
      }, {
        name: "Itai Damti",
        image: "https://image.ibb.co/bwQ9ye/Itai_Damti.png",
        title: "Fintech EIR at 500 Startups | CEO at Antifragile",
        link: "https://www.linkedin.com/in/itaidamti/",
        bio: [
          "Itai Damti is Entrepreneur in Residence (Fintech) at 500 Startups, a global VC and seed accelerator in San Francisco. He is also the founder and CEO of Antifragile, a Fintech consulting firm in Hong Kong.",
          "Previously, Itai co-founded and spent 10 years with Leverate (B2B, 160 employees, 6 offices)- an industry leader in tech for online brokers, with over 100b USD in monthly trading volume. He served 3 years as the company’s CEO Asia Pacific - taking its strategy, growth and operations into 12 countries in the region, 3 years as its first VP Products - overseeing 9 PM’s, 13 products and 4 years leading its engineering teams in Israel.",
          "Itai has a strong passion for building businesses around complex problems. His current interests include cryptocurrencies, data science, machine learning and hardware. He invests in startups and actively mentors in leading accelerators worldwide, including Barclays Techstars (Tel Aviv) and HAX (China).",
          "Before starting Leverate, Itai graduated with excellence from Basmach- the IDF’s Academy for Computer Science and Cyber Defense."
        ]
      }, {
        name: "Maaike Steinebach",
        image: "https://image.ibb.co/eDQbde/Maaike_Steinebach.png",
        title: "Banker | Founding Boardmember HK Fintech Association | Co-Founder Women in Tech HK | Boardmember | Community Builder | Techaficionado | Start Up Mentor & Advisor",
        link: "https://www.linkedin.com/in/maaike-steinebach-8a3a304/",
        bio: [
          "Maaike has been in the banking industry for 20+ years. Most recently she was Chief Executive of Commonwealth Bank of Australia where she managed Institutional Banking & Markets and provided oversight for the Private Bank, supported the bank’s business development in China and was instrumental in setting up the first overseas Innovation Lab for CBA in Hong Kong for which she was the executive sponsor.",
          "She has also worked across multiple jurisdictions in Europe and Asia and has held senior positions in financial institutions including CBA, Fortis Bank and ABN AMRO.",
          "She is passionate about technology and inclusive leadership. She is a board director for the Australian Chamber of Commerce for Hong Kong and Macau, where she sits on the Women in Business Committee. She started work on the FinTech Association of Hong Kong in 2016 which was officially launched in June 2017. She is also one of the conveners of Women in Tech Hong Kong and Women Chief Executives, a group of 16 female CEO of Financial Institutions in Hong Kong."
        ]
      }, {
        name: "Olivier Motte",
        image: "https://image.ibb.co/dscBBz/Olivier_Motte.png",
        title: "Sole director, Phileuropa Limited (Hong Kong)",
        link: "https://www.linkedin.com/in/olivier-motte-8967658/",
        bio: [
          "Oliver is a former Asia-Pacific Head of Conduct Compliance at HSBC. Since 2005, he has specialized in French, European and Asian compliance, government and public affairs (Credit Agricole Corporate and Investment Bank and HSBC APAC), in particular conduct compliance and FinTech.",
          "With particular participation in the elaboration of new regulations, linkage with concerned business lines and support functions, representation of the bank in various trade associations while being responsible  for the implementation of relevant regulation.",
          "Currently a retired international banker with 37 years of experience, he is a the consultant and sole Director of Phileuropa Ltd (HK)."
        ]
      }, {
        name: "Leroy Yau",
        image: "https://image.ibb.co/gXg0y0/LeroyYau.png",
        title: "Venture Builder",
        link: "https://www.linkedin.com/in/yauleroy/",
        bio: [
          "Leroy has over 20 years of professional experience in business and IT advisory services. He is a founding partner of #43 Ventures and co-founder for Everiii/Taiwan Startup Stadium. Leroy was previously an Advisory partner at EY and has extensive experience in corporate governance, cyber security, IT strategy, and financial and internal controls. A graduate in computer engineering, electronic engineering, and laws, Leroy is also a fellow member of the Hong Kong Institute of Certified Public Accountants, CPA Australia, and The Hong Kong Institute of Directors. In addition to being a frequent speaker and trainer for startup courses and events, Leroy is a co-author and instructor of a Hong Kong Institute of Bankers certificate course entitled “Certificate in Technology Management and Innovation in Banking”.  He is currently serving as the President of the ISACA China Hong Kong Chapter."
        ]
      }, {
        name: "Fabrice Fischer",
        image: "https://image.ibb.co/d2V4Qf/Fabrice-Fischer.jpg",
        title: "Founder & CEO at Blu Ltd - Artificial Intelligence",
        link: "https://www.linkedin.com/in/fabrice-fischer-3852ab/",
        bio: [
          "Fabrice Fischer is the Founder and CEO of Blu, an Artificial Intelligence advisory firm that specializes in disruptive innovation within the Financial Services industry, based in Hong Kong. Over the past 20 years, Fabrice has taken up multiple roles in Financial Services and IT within Asia, Europe and North America.",
          "In his six year stint as CFO of Sentient Technologies, Fabrice oversaw a period of extraordinary growth, which resulted in Sentient becoming one of the world’s best funded AI companies. He also played an integral part in the launch of Sentient Investment Management, Sentient’s artificial intelligence based Hedge Fund, which continually evolves and optimizes its investment strategies. He also headed Sentient’s Distributed Computing grid in Asia.",
          "Fabrice’s career highlights also include starting a HK-based IT-services company in infrastructure and ERP for the Asset Management industry. Subsequently, he joined Bain & Co. as a Consultant advising companies in the IT, Telecom and Private Equity industries across Europe and then continued as an independent advisor to Banks and Asset Managers. He was the CFO and COO of Bryan Garnier, a European boutique Investment Bank that specialized in Corporate Finance, Brokerage, Asset Management and Private Banking. There he managed the asset management activities and also the equity analysis team of the bank.",
          "Fabrice is currently advising on a variety of projects in numerous industries and geographic markets. His AI expertise includes Machine Learning (ML), Neural Networks (NN) and Deep Learning (DL), Evolutionary Algorithm (EA), Natural Language Processing (NLP), Image recognition and video processing. He is also has a rare hands on experience in Distributed Computing at a very large scale (over 2M CPU cores and thousands of GPUs). In addition, Fabrice has also spoken at multiple Artificial Intelligence and Technology conferences and events, both in Asia-Pacific, and around the world.",
          "Fabrice holds a Bachelor’s in Electrical Engineering from University of Montreal and an MBA from INSEAD."
        ]
      }
    ]

    return (
      <div id="page-home">
        <section className="clearfix banner">
          <Carousel controls={false}>
            <Carousel.Item>
              <div className="banner-background" style={{ backgroundImage: `url(${banner1})` }} />
              <Carousel.Caption>
                <div className="h2 margin-0">JOIN AN EXCLUSIVE COMMUNITY <br /> OF PROFESSIONAL INVESTORS</div>
                <div className="h4 fw-400 margin-top-5">| SFC Licensed Investment Platform</div>
              </Carousel.Caption>
              <img src={b1l} alt="pattern" className="pattern left" style={{ height: "105vh" }} />
              <img src={b1r} alt="pattern" className="pattern right" style={{ height: "105vh" }} />
            </Carousel.Item>
            <Carousel.Item>
              <div className="banner-background" style={{ backgroundImage: `url(${banner2})` }} />
              <Carousel.Caption>
                <div className="h2 margin-0 text-black">INVEST IN THE FUTURE</div>
                <div className="h4 fw-400 margin-top-5 text-black">| SFC Licensed Investment Platform</div>
              </Carousel.Caption>
              <img src={b2l} alt="pattern" className="pattern left" style={{ height: "105vh" }} />
              <img src={b2r} alt="pattern" className="pattern right" style={{ height: "105vh" }} />
            </Carousel.Item>
            <Carousel.Item>
              <div className="banner-background" style={{ backgroundImage: `url(${banner3})` }} />
              <Carousel.Caption>
                <div className="h2 margin-0">ALL THE INFORMATION YOU <br /> NEED TO INVEST IN STARTUPS</div>
                <div className="h4 fw-400 margin-top-5">| SFC Licensed Investment Platform</div>
              </Carousel.Caption>
              <img src={b3l} alt="pattern" className="pattern left" style={{ height: "105vh" }} />
              <img src={b3r} alt="pattern" className="pattern right" style={{ height: "105vh" }} />
            </Carousel.Item>
            <Carousel.Item>
              <div className="banner-background" style={{ backgroundImage: `url(${banner4})` }} />
              <Carousel.Caption>
                <div className="h2 margin-0">WE FEATURE ONLY HIGHLY VETTED <br /> INVESTMENT OPPORTUNITIES</div>
                <div className="h4 fw-400 margin-top-5">| SFC Licensed Investment Platform</div>
              </Carousel.Caption>
              <img src={b4l} alt="pattern" className="pattern left" style={{ height: "105vh" }} />
              <img src={b4r} alt="pattern" className="pattern right" style={{ height: "105vh" }} />
            </Carousel.Item>
            <Carousel.Item>
              <div className="banner-background" style={{ backgroundImage: `url(${banner5})` }} />
              <Carousel.Caption>
                <div className="h2 margin-0">BUILD A DIVERSIFED <br /> STARTUP PORTFOLIO</div>
                <div className="h4 fw-400 margin-top-5">| SFC Licensed Investment Platform</div>
              </Carousel.Caption>
              <img src={b5l} alt="pattern" className="pattern left" style={{ height: "105vh" }} />
              <img src={b5r} alt="pattern" className="pattern right" style={{ height: "105vh" }} />
            </Carousel.Item>
          </Carousel>
          <a className="btn btn-primary btn-lg rounded-2 o-90 start">START INVESTING</a>
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
          <div className="col-xs-12 col-md-11 background left" />
          <div className="hidden-xs hidden-sm col-md-1 background right" />
          <div className="col-xs-12 col-md-11 box-shadow px-0 col-md-offset-1">
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
                  <li><span className="text-primary margin-right-5">></span>Access Vetted Startup with the due diligence documents</li>
                  <li><span className="text-primary margin-right-5">></span>From discovery and thorough evaluation, to settlement and post investment monitoring</li>
                  <li><span className="text-primary margin-right-5">></span>Centralised portal with direct access to startups and education through master classes</li>
                </ul>
                <ul className="col-xs-4 list-style-none">
                  <li><span className="text-primary margin-right-5">></span>Overview at a glance or in depth</li>
                  <li><span className="text-primary margin-right-5">></span>Analytics and post investment report</li>
                </ul>
              </div>
            </div>
            <SharedOthersSideTitle
              title="SFC Licensed Investment Platform"
              optClass="hidden-xs hidden-sm col-md-1 color-primary bg-white side-text-small px-20"
            />
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
                    <div className="h4 title">Transparency & Due Diligence</div>

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

        <section className="investment-committee-and-partners clearfix">
          <div className="background">
            <div className="top" />
            <div className="bottom" />
          </div>
          <div className="investment-committee text-center col-xs-12">
            <div className="row title">
              <div className="h4 text-black">INVESTMENT COMMITTEE</div>

              <div className="col-xs-12 col-md-6 col-md-offset-3">Our Investment Committee is comprised of highly experienced entrepreneurs, investors, industry experts and top-level business leaders will extensive experience in startup investing and scaling.</div>
            </div>

            <div className="row slider">
              <Carousel
                className="col-xs-12 col-md-10 col-md-offset-1 box-shadow px-top-50 px-bottom-50"
                interval={null}
                indicators={false}
                prevIcon={<i className="ahub-arrow ahub-sm flip-horizontal text-primary" />}
                nextIcon={<i className="ahub-arrow ahub-sm text-primary" />}
              >
                {
                  people.map((p, i) => {
                    return (
                      <Carousel.Item key={i} className="row">
                        <div className="details col-xs-10 col-xs-offset-1 text-left px-left-50 px-right-50">
                          <div className="left hidden-xs">
                            <img src={p.image} alt={p.name} />
                          </div>
                          <div className="right">
                            <a href={p.link} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin fa-2x" /></a>
                            <div className="h4 name margin-0">{p.name}</div>
                            <div className="h5 title margin-top-5">{p.title}</div>
                            <div className="bio">{p.bio.map((b, n) => { return <div key={n} className="line">{b}</div> })}</div>
                          </div>
                        </div>
                      </Carousel.Item>
                    )
                  })
                }
              </Carousel>
            </div>
          </div>

          <div className="partners text-center col-xs-12 col-md-8 col-md-offset-2">
            <div className="row title">
              <div className="h4 text-primary">OUR PARTNERS</div>
            </div>

            <div className="margin-top-30">
              <div className="row">
                <div className="col-xs-12 col-md-3">
                  <a href="https://www.brinc.io" target="_blank" className="thumbnail" rel="noopener noreferrer"><img src="https://whub.io/assets/ahub/images/landing_partner1.png" alt="brinc" /></a>
                </div>
                <div className="col-xs-12 col-md-3">
                  <a href="https://www.hkvca.com.hk" target="_blank" className="thumbnail" rel="noopener noreferrer"><img src="https://whub.io/assets/ahub/images/landing_partner2.png" alt="HKVCA" /></a>
                </div>
                <div className="col-xs-12 col-md-3">
                  <a href="http://www.familyoffices-asia.org" target="_blank" className="thumbnail" rel="noopener noreferrer"><img src="https://whub.io/assets/ahub/images/landing_partner3.png" alt="AFO" /></a>
                </div>
                <div className="col-xs-12 col-md-3">
                  <a href="https://whub.io" target="_blank" className="thumbnail" rel="noopener noreferrer"><img src="https://whub.io/assets/ahub/images/landing_partner4.png" alt="WHub" /></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="philosophy clearfix text-center">
          <SharedOthersSideTitle
            title="SFC Licensed Investment Platform"
            optClass="hidden-xs hidden-sm col-md-1 color-primary bg-white side-text-small right"
          />
          <div className="col-xs-12 col-md-6 col-md-offset-3 col-lg-offset-3">
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
