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
                      <li><Link className="" to="/p/about-us">About Us</Link></li>
                      <li><Link className="" to="/p/our-team">Our Team</Link></li>
                      <li><Link className="" to="/p/careers">Careers</Link></li>
                      <li><Link className="" to="/p/contact-us">Contact Us</Link></li>
                    </ul>
                  </div>
                  <div className="links-section">
                    <span className="header text-uppercase">Get Started</span>
                    <ul>
                      <li><Link className="" to="/get-started/invest">Invest</Link></li>
                      <li><Link className="" to="/get-started/raise">Raise</Link></li>
                    </ul>
                  </div>

                  <div className="links-section">
                    <span className="header text-uppercase">Learn</span>
                    <ul>
                      <li><Link className="" to="https://medium.com/angelhub" target="_blank">Blog</Link></li>
                      <li><Link className="" to="/guides?tag=investor">Investor Help Centre</Link></li>
                      <li><Link className="" to="/guides?tag=entrepreneur">Entrepreneur Help Centre</Link></li>
                    </ul>
                  </div>

                  <div className="links-section">
                    <span className="header text-uppercase">Legal</span>
                    <ul>
                      <li><Link className="" to="/legal/risk-warning">Risk Warning</Link></li>
                      <li><Link className="" to="/legal/terms-of-service">Terms Of Service</Link></li>
                      <li><Link className="" to="/legal/privacy-policy">Privacy Policy</Link></li>
                    </ul>
                  </div>

                  <div className="links-section hide">
                    <span className="header">Stay up-to-date</span>
                    <ul>
                      <li>Sign up to our newsletter to stay up-to-date with our latest news and promotions delivered to your inbox</li>
                    </ul>
                  </div>

                  <div className="links-section">
                    <img className="img-responsive" src="http://angelhub.io/images/angelhub-logo-white-tagline.png" alt="AngelHub" />
                  </div>
                </div>
                <hr />
                <p className="text-white">
                  <strong className="fw-500">AngelHub Limited is Approved in Principal Securities and Futures Commission Licensed Platform</strong>.
                  AngelHub Limited 2018. All rights reserved. AngelHub Limited, a limited company registered in Hong Kong (No. 2486647),
                  with registered office at Remex Centre 7F, 42 Wong Chuk Hang Road, Hong Kong. angelhub.io is a website owned and operated by AngelHub Limited.
                </p>
                <p className="fw-500 text-white">Investing carries risks, including loss of capital and illiquidity. Please ready our <Link className="text-primary" to="/legal/risk-warning">Risk Warning & Disclaimer</Link> for more information.</p>
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
                  <li><Link className="" to="/legal/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Use</Link></li>
                  <li><Link className="" to="/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
