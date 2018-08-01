import React, { Component } from 'react'

import SharedOthersSideTitle from '../../shared/others/side-title'
import SharedOthersIntro from '../../shared/others/intro'

export default class SignupInvestor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pickInvestor: true,
      resultSelected: 0,
      pickerResults: {
        0: ["I am a Professional Investor, because I have individual net worth, or joint net worth with my spouse, that exceeds $8 million HKD."],
        1: ["We are only offering sign-ups for Professional Investors at this time."],
        2: [
          "I am a Professional Investor because I had income exceeding $1,500,000 HKD, or income with my spouse exceeding $2,250,000 HKD, each of the past two years and expect the same this year.",
          "I am a Professional Investor because I have individual net worth, or joint net worth with my spouse, that exceeds $8 million HKD.",
          "I am a Professional Investor because I invest on behalf of an entity with at least $35M in assets or an entity in which all the owners are Professional Investors (e.g. a venture capital fund, LLC).",
          "I am a Professional Investor because I invest on behalf of a trust with at least $35M in assets and I have sufficient knowledge to evaluate the merits and risks of startup investing.",
          "I am not a Professional Investor because none of the above apply to me."
        ]
      },
      termsAgreement: false,
      intro: false
    }

    this.onPickInvestorContinue = this.onPickInvestorContinue.bind(this)
    this.onIntroContinue = this.onIntroContinue.bind(this)
  }

  onPickInvestorContinue() {
    this.setState({ pickInvestor: false, intro: true })
  }

  onIntroContinue() {
    this.props.router.push("/auth/signup-investor-step-1")
  }

  pickerInvestor() {
    const { resultSelected, pickerResults, termsAgreement } = this.state

    return (
      <div className="col-sm-6 pick-investor">
        <h1 className="page-title-l fw-500 fs-28">I am a professional investor</h1>
        <p className="margin-bottom-20">We are required by the SFC to collect this information to determine if you are able to access. Note, most people are not Professional Investors</p>
        <div className="picker margin-bottom-20">
          <div
            className={`btn ${resultSelected === 0 ? "btn-danger" : "btn-default"}`}
            onClick={() => { this.setState({ resultSelected: 0 }) }}
          >Yes, I AM</div>
          <div
            className={`btn ${resultSelected === 1 ? "btn-danger" : "btn-default"}`}
            onClick={() => { this.setState({ resultSelected: 1 }) }}
          >NO, I AM NOT</div>
          <div
            className={`btn ${resultSelected === 2 ? "btn-danger" : "btn-default"}`}
            onClick={() => { this.setState({ resultSelected: 2 }) }}
          >I DON"T KNOW YET</div>
        </div>

        <div className="picker-result">
          {
            pickerResults[resultSelected].map((r, i) => {
              return (
                <div key={i}>{r}</div>
              )
            })
          }
        </div>

        <div className="terms-agreement">
          <input type="checkbox" id="agreement" onChange={(e) => { this.setState({ termsAgreement: e.target.checked }) }} />
          <label htmlFor="agreement">By joining AngelHub, I am agreeing to AngelHub's Terms of Use and Privacy Policy. I furthermore acknowledge that Issuse that successfully raise on AngelHub may pay affiliates of AngelHub fees in the form of cash or securities. Learn more on our FAQs</label>
        </div>

        <button
          className="btn btn-danger pull-right"
          onClick={this.onPickInvestorContinue}
          disabled={resultSelected !== 0 || !termsAgreement}
        >Continue</button>
      </div>
    )
  }

  intro() {
    return (
      <SharedOthersIntro
        optClass="col-sm-6 col-md-6"
        onContinue={this.onIntroContinue}
        title="what we need from you"
        content={[
          {
            title: "Tell us about yourself",
            body: "important warning and your details"
          },
          {
            title: "Ask you a few questions",
            body: "risk assessment"
          },
          {
            title: "Take a photo",
            body: "use your mobile to send us a photo"
          }
        ]}
      />
    )
  }

  render() {
    const { pickInvestor, intro } = this.state

    return (
      <div id="page-auth-signup-investor">
        <div className="row">
          <SharedOthersSideTitle title="investor" optClass="hidden-xs col-sm-3 col-md-offset-1 col-md-2" />

          { pickInvestor && this.pickerInvestor() }
          { intro && this.intro() }
        </div>
      </div>
    )
  }
}
