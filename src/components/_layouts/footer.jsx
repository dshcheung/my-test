import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

const mapStateToProps = () => {
  return { }
}

const mapDispatchToProps = () => {
  return { }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Footer extends Component {
  render() {
    return (
      <div id="layouts-footer">
        <div className="bg-black px-30">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="links">
                  <div className="links-section">
                    <span className="header text-uppercase">COMPANY</span>
                    <ul>
                      <li><Link className="" to="/p/about-us">About AngelHub</Link></li>
                      <li><Link className="" to="/p/our-team">Our Team</Link></li>
                      <li><Link className="" to="/p/careers">Careers</Link></li>
                      <li><Link className="" to="/p/contact-us">Contact Us</Link></li>
                    </ul>
                  </div>
                  <div className="links-section">
                    <span className="header text-uppercase">Get Started</span>
                    <ul>
                      <li><Link className="" to="/guide/invest">Invest</Link></li>
                      <li><Link className="" to="/guide/raise">Raise</Link></li>
                      <li><Link className="" to="/guide/types">Types of Equity</Link></li>
                    </ul>
                  </div>

                  <div className="links-section">
                    <span className="header text-uppercase">Learn</span>
                    <ul>
                      <li><Link className="" to="/masterclass/case-studies">Case Studies</Link></li>
                      <li><Link className="" to="/masterclass/guides">Guide</Link></li>
                      <li><Link className="" to="https://blog.angelhub.io">Blog</Link></li>
                      <li><Link className="" to="/help/invesetor">Investor Help Centre</Link></li>
                      <li><Link className="" to="/help/entrepreneur">Entrepreneur Help Centre</Link></li>
                      <li><Link className="" to="/guide/glossary">Glossary</Link></li>
                    </ul>
                  </div>

                  <div className="links-section">
                    <span className="header text-uppercase">Legal</span>
                    <ul>
                      <li><Link className="" to="/legal/risk">Risk Warning</Link></li>
                      <li><Link className="" to="/legal/security">Security</Link></li>
                      <li><Link className="" to="/legal/referral">Referral Fee Terms</Link></li>
                      <li><Link className="" to="/legal/campaign-terms">Campaign Terms</Link></li>
                    </ul>
                  </div>

                  <div className="links-section hide">
                    <span className="header">Stay up-to-date</span>
                    <ul>
                      <li>Sign up to our newsletter to stay up-to-date with our latest news and promotions delivered to your inbox</li>
                    </ul>
                  </div>

                  <div className="links-section">
                    <img className="footer-brand" src="https://s3-ap-northeast-1.amazonaws.com/angel-hub-dev/static/footer-logo.png" alt="AngelHub" />
                  </div>
                </div>
                <hr />
                <p className="text-white">
                  <strong className="fw-500">AngelHub Limited is an authorised and regulated by the Securities and Futures Commission <span className="text-primary">(No. XXXXXX)</span></strong>.
                  AngelHub Limited 2018. All rights reserved. AngelHub Limited, a limited company registered in Hong Kong (No. XXXXXX),
                  with registered office at Remex Centre 7F, 42 Wong Chuk Hang Road, Hong Kong. angelhub.io is a website owned and operated by AngelHub Limited.
                </p>
                <p className="fw-500 text-white">Investing carries risks, including loss of capital and illiquidity. Please ready our <Link className="text-primary" to="/legal/risk">Risk Warning & Disclaimer</Link> for more information.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="others clearfix">
                <span className="copy-right pull-left">&copy; 2018 AngelHub Limited</span>
                <ul className="social pull-right">
                  <li><Link className="" to="/legal/terms" target="_blank" rel="noopener noreferrer">Terms of Use</Link></li>
                  <li><Link className="" to="/legal/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
