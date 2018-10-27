import React, { Component } from 'react'

import SharedOthersSideTitle from '../../../shared/others/side-title'

import OthersMailingForm from '../../../forms/others/mailing'

export default class ContactUs extends Component {
  render() {
    return (
      <div>

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

        <section className="launch-today clearfix text-center">
          <div className="col-xs-12">
            <div className="row title">
              <div className="h4 text-primary text-uppercase">Contact Us</div>
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
