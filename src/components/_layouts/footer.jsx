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
      <div id="layouts-footer" className="bg-primary px-50 clearfix">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 col-md-offset-1">
              <div className="links">
                <div className="links-section">
                  <span className="header text-uppercase">COMPANY</span>
                  <ul>
                    <li><Link className="btn-gray" to="/p/about-us">About AngelHub</Link></li>
                    <li><Link className="btn-gray" to="/p/our-team">Our Team</Link></li>
                    <li><Link className="btn-gray" to="/p/careers">Careers</Link></li>
                    <li><Link className="btn-gray" to="/p/contact-us">Contact Us</Link></li>
                  </ul>
                </div>

                <div className="links-section">
                  <span className="header text-uppercase">Get Started</span>
                  <ul>
                    <li><Link className="btn-gray" to="/guide/invest">Invest</Link></li>
                    <li><Link className="btn-gray" to="/guide/raise">Raise</Link></li>
                    <li><Link className="btn-gray" to="/guide/types">Types of Equity</Link></li>
                  </ul>
                </div>

                <div className="links-section">
                  <span className="header text-uppercase">Learn</span>
                  <ul>
                    <li><Link className="btn-gray" to="/masterclass/case-studies">Case Studies</Link></li>
                    <li><Link className="btn-gray" to="/masterclass/guides">Guide</Link></li>
                    <li><Link className="btn-gray" to="https://blog.angelhub.io">Blog</Link></li>
                    <li><Link className="btn-gray" to="/help/invesetor">Investor Help Centre</Link></li>
                    <li><Link className="btn-gray" to="/help/entrepreneur">Entrepreneur Help Centre</Link></li>
                    <li><Link className="btn-gray" to="/guide/glossary">Glossary</Link></li>
                  </ul>
                </div>

                <div className="links-section">
                  <span className="header text-uppercase">Legal</span>
                  <ul>
                    <li><Link className="btn-gray" to="/legal/risk">Risk Warning</Link></li>
                    <li><Link className="btn-gray" to="/legal/security">Security</Link></li>
                    <li><Link className="btn-gray" to="/legal/referral">Referral Fee Terms</Link></li>
                    <li><Link className="btn-gray" to="/legal/campaign-terms">Campaign Terms</Link></li>
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
            </div>
          </div>
        </div>
        <div className=
          <div className="row">
            <div className="col-xs-12 col-md-10 col-md-offset-1">
              <hr />
              <div className="others clearfix">
                <span className="copy-right">&copy; 2018 AngelHub</span>

                <ul className="social">
                  <li><Link className="btn-gray" to="/legal/terms" target="_blank" rel="noopener noreferrer">Terms of Use</Link></li>
                  <li><Link className="btn-gray" to="/legal/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
