import React, { Component } from 'react'
import { Link } from 'react-router'

import SharedOthersSideTitle from '../../../shared/others/side-title'

import OthersMailingForm from '../../../forms/others/mailing'

export default class ContactUs extends Component {
  render() {
    return (
      <div>

        <section className="launch-today clearfix margin-top-20 margin-bottom-20">
          <SharedOthersSideTitle title="Contact Us" optClass="col-xs-2 col-lg-2 color-primary" />
          <div className="col-xs-10 col-lg-9">
            <div className="row title">
              <div className="h2 text-primary text-uppercase">Contact us to see how we can help you</div>
            </div>

            <div className="row text-left">
              <OthersMailingForm
                optClass="col-xs-12"
                onSubmit={() => {}}
              />
            </div>
          </div>
        </section>

        <section className="row map no-gutters">
          <div className="col-xs-12">
            <iframe
              title="Our Office"
              width="100%"
              height="350"
              scrolling="no"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAibTn6EJIjozFBpfzE1zlRwNIPtFDjX8E&q=Remex Centre Hong Kong"
              allowFullScreen="true"
            />
          </div>
        </section>

        <section className="row no-gutters join bg-dark px-50 margin-top-0">
          <div className="container">
            <div className="col-xs-12 ">
              <div className="title h2">Get started on AngelHub.</div>
              <div className="section-content">
                <Link to="/auth/signup-investor" className="btn btn-primary btn-lg text-uppercase">
                  Join As An Investor
                </Link>
                &nbsp;
                <Link to="/auth/signup-startup" className="btn btn-default btn-lg text-uppercase">
                  Join As A Starutp
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    )
  }
}
