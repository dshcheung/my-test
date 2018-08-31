import React, { Component } from 'react'

import { DEFAULT_STARTUP_BANNER, DEFAULT_STARTUP_AVATAR } from '../../../services/constants'

import SharedOthersTabNav from '../others/tab-nav'

export default class SharedCampaignsProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTab: "overview"
    }
  }

  render() {
    // TODO: change this back to using this.props
    const campaign = {
      active: true,
      approved: true,
      campaign_type: {
        id: 100,
        amount: 1000000,
        amount_type: "equity",
        equity_percentage: 10,
        equity_type: "ordinary",
        pre_money_valuation: 20000000
      },
      id: "Z9r1t5KMx5vwR4E2",
      end_date: 1536506131000,
      start_date: 1535640809000,
      raised: 500000,
      goal: 1000000,
      number_of_investors: 5,
      has_reached_goal: false,
      startup: {
        id: "TeWuz4n8QC3cyCPu",
        name: "UBER",
        profile: {
          id: 11,
          avatar: {
            original: "https://image.ibb.co/dxbRdU/campaign_logo.png",
          },
          banner: {
            original: "https://image.ibb.co/cUuOQ9/campaign_banner.png"
          }
        },
        year_founded: 2015,
        location: "Hong Kong",

      },
      status: {
        submitted: "approved"
      }
    }

    const { startup } = campaign

    // startup profile stuff
    const banner = _.get(startup, "profile.banner.original") || DEFAULT_STARTUP_BANNER
    const avatar = _.get(startup, "profile.avatar.original") || DEFAULT_STARTUP_AVATAR
    const bannerStyles = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner})`
    }
    const startupName = _.get(startup, 'name')
    const yearFounded = _.get(startup, 'year_founded')
    const location = _.get(startup, 'location')

    // campaign stuff
    const endDate = moment(_.get(campaign, 'end_date')).fromNow()
    const goal = _.get(campaign, 'goal') || 0
    const raised = _.get(campaign, 'raised') || 0
    const achieved = Math.floor((raised / goal) * 100)
    const progressStyle = { width: `${achieved}%` }
    const preMoney = _.get(campaign, 'campaign_type.pre_money_valuation') || 0

    const problemImage = "https://image.ibb.co/iMXosp/campaign_problem.png"
    const solutionImage = "https://image.ibb.co/nG6sJU/campaign_solution.png"

    return (
      <div id="shared-campaigns-profile">
        <section className="header clearfix" style={bannerStyles}>
          <div className="h1 startup-name">{startupName}</div>

          <div className="take-action">
            <button className="btn btn-primary invest">INVEST</button>

            <div className="time-left">
              <div>{endDate}</div>
              <div>remaining to expire</div>
            </div>
          </div>

          <div className="lower-block">
            <div className="stats pull-right">
              <div className="progress">
                <div className="progress-bar" style={progressStyle} />
              </div>

              <div className="raised">
                <div>HKD ${raised.currency()}</div>
                <div>FUND RAISED</div>
              </div>

              <div className="goal">
                <div>HKD ${goal.currency()}</div>
                <div>INVESTMENT GOAL</div>
              </div>
            </div>
          </div>
          <img className="logo" src={avatar} alt="avatar" />
        </section>

        <section className="body">
          <SharedOthersTabNav
            order={[
              { key: "overview", title: "OVERVIEW" },
              { key: "campaign", title: "CAMPAIGN" },
              { key: "team_story", title: "TEAM STORY" },
              { key: "product", title: "PRODUCT/SERVICE" },
              { key: "updates", title: "UPDATES" },
              { key: "dataroom", title: "DATAROOM" },
              { key: "faq", title: "FAQs" },
            ]}
            currentTab={this.state.currentTab}
            handleClick={(tab) => {
              window.location = window.location.origin + window.location.pathname + `#${tab}`
              this.setState({ currentTab: tab })
            }}
          />

          <a id="overview" className="hash-link" />
          <section className="overview clearfix">
            <div className="col-xs-8 col-xs-offset-2 col-lg-6 col-lg-offset-3">
              <div className="row description">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste natus sit eos amet nemo corporis aperiam, dolore veritatis maxime! Recusandae harum a, fugit pariatur eligendi obcaecati assumenda totam adipisci ab. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis possimus repellendus odio veniam optio tempore illo aliquam ipsa at cupiditate eligendi eveniet, maxime sequi esse distinctio accusantium quam praesentium placeat!</p>
              </div>

              <div className="row stats">
                <div className="col-xs-12">
                  <div className="row cards">
                    <div className="card col-xs-4">
                      <div><i className="ahub-campaign" /></div>
                      <div>YEAR OF FOUNDATION</div>
                      <div><strong>{yearFounded}</strong></div>
                    </div>

                    <div className="card col-xs-4">
                      <div><i className="ahub-location" /></div>
                      <div>LOCATION</div>
                      <div><strong>{location}</strong></div>
                    </div>

                    <div className="card col-xs-4">
                      <div><i className="ahub-valuation" /></div>
                      <div>VALUATION PRE-MONEY</div>
                      <div><strong>${preMoney.currency()}</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="quote clearfix text-center">
            <div className="col-xs-8 col-xs-offset-2">
              <div className="h3 text-primary">"The Connections, collaborations and community that help you on your journey to success and drive meaningful change."</div>
            </div>
          </section>

          <section className="problem-and-solution clearfix text-left">
            <div className="col-xs-8 col-xs-offset-2 col-lg-6 col-lg-offset-3">
              <div className="row cards">
                <div className="card col-xs-6 margin-bottom-30">
                  <div className="h4 title">PROBLEM</div>

                  <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore consectetur rem, dolorem ipsa alias excepturi molestias laboriosam nihil sint, repellendus maiores doloremque omnis necessitatibus, deserunt quis quae delectus ut aperiam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum quam odio ratione facere earum nihil unde deserunt hic.</div>
                </div>

                <div className="card image col-xs-6 margin-bottom-30">
                  <div style={{ backgroundImage: `url(${problemImage})` }} />
                </div>

                <div className="card image col-xs-6">
                  <div style={{ backgroundImage: `url(${solutionImage})` }} />
                </div>

                <div className="card col-xs-6">
                  <div className="h4 title">SOLUTION</div>

                  <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore consectetur rem, dolorem ipsa alias excepturi molestias laboriosam nihil sint, repellendus maiores doloremque omnis necessitatibus, deserunt quis quae delectus ut aperiam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum debitis, eos aliquam. Ex temporibus, optio vel quis pariatu.</div>
                </div>
              </div>
            </div>
          </section>

          <hr className="w-50" />

          <section className="highlights clearfix">
            <div className="col-xs-8 col-xs-offset-2 col-lg-6 col-lg-offset-3">
              <div className="row cards">
                <div className="card col-xs-6">
                  <div className="h4 title">BUSINESS HIGHLIGHTS #1 </div>

                  <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore consectetur rem, dolorem ipsa alias excepturi molestias laboriosam nihil sint, repellendus maiores doloremque omnis necessitatibus, deserunt quis quae delectus ut aperiam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum debitis, eos aliquam. Ex temporibus, optio vel quis pariatu.</div>
                </div>

                <div className="card col-xs-6 col-xs-offset-6">
                  <div className="h4 title">BUSINESS HIGHLIGHTS #2 </div>

                  <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore consectetur rem, dolorem ipsa alias excepturi molestias laboriosam nihil sint, repellendus maiores doloremque omnis necessitatibus, deserunt quis quae delectus ut aperiam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum debitis, eos aliquam. Ex temporibus, optio vel quis pariatu.</div>
                </div>
              </div>
            </div>
          </section>

          <hr className="w-50" />

          <section className="media clearfix text-center">
            <div className="col-xs-8 col-xs-offset-2 col-lg-6 col-lg-offset-3">
              <div className="row title">
                <div className="h4">MEDIA & PUBLICATIONS</div>
              </div>

              <div className="row cards">
                <div className="card">
                  <a href="">
                    <img src="https://image.ibb.co/dFj73U/WSJ_facebook.png" alt="WSJ" />
                  </a>
                </div>
                <div className="card">
                  <a href="">
                    <img src="https://image.ibb.co/ck1bdU/landing_media2.png" alt="Times" />
                  </a>
                </div>
                <div className="card">
                  <a href="">
                    <img src="https://image.ibb.co/bVRbdU/landing_media3.png" alt="BBC" />
                  </a>
                </div>
                <div className="card">
                  <a href="">
                    <img src="https://image.ibb.co/igZ7k9/landing_media4.png" alt="hket" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="team clearfix">
            <div className="col-xs-8 col-xs-offset-2 col-lg-6 col-lg-offset-3">
              <div className="row cards">
                <div className="col-xs-6 team-story">
                  <div className="h4 title text-primary">TEAM STORY</div>

                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam perspiciatis perferendis, ad nemo porro explicabo mollitia cupiditate aliquam quidem quasi non, facilis, exercitationem praesentium delectus animi laboriosam ea necessitatibus molestiae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas perferendis ab labore non iusto consectetur debitis ratione, officiis incidunt ut earum dolore quia ipsum, dolorum maiores velit ex minima repudiandae!</p>

                  <a href="" className="btn btn-primary">VIEW MORE</a>
                </div>

                <div className="col-xs-6 text-center">
                  <div className="row team-pics">
                    <div className="col-xs-6 pic">
                      <img src="https://image.ibb.co/kbbEXp/campaign_team1.png" alt="person" />
                      <div className="name">ALICE SCHUTT</div>
                      <div className="position">GENERAL MANAGER</div>
                    </div>
                    <div className="col-xs-6 pic">
                      <img src="https://image.ibb.co/hYv8sp/campaign_team2.png" alt="person" />
                      <div className="name">NIAMH GIVEN </div>
                      <div className="position">CHIEF GROWTH OFFICER </div>
                    </div>
                    <div className="col-xs-6 pic">
                      <img src="https://image.ibb.co/kOkPXp/campaign_team3.png" alt="person" />
                      <div className="name">CHANDMI MOTWANI</div>
                      <div className="position">HEAD OF PRODUCT </div>
                    </div>
                    <div className="col-xs-6 pic">
                      <img src="https://image.ibb.co/ceqDQ9/campaign_team4.png" alt="person" />
                      <div className="name">JACKLINE TANG</div>
                      <div className="position">HEAD OF MEMBERSHIP & COMMUNITY</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="software clearfix text-center">
            <div className="col-xs-8 col-xs-offset-2">
              <div className="row title">
                <div className="h4">SOFTWARE STACK</div>
              </div>

              <div className="row cards">
                <div className="card">
                  <a href="">
                    <img src="https://image.ibb.co/chme09/campaign_software1.png" alt="amazon" />
                  </a>
                </div>
                <div className="card">
                  <a href="">
                    <img src="https://image.ibb.co/dii3Sp/campaign_software2.png" alt="pipedrive" />
                  </a>
                </div>
                <div className="card">
                  <a href="">
                    <img src="https://image.ibb.co/dcKz09/campaign_software3.png" alt="react" />
                  </a>
                </div>
                <div className="card">
                  <a href="">
                    <img src="https://image.ibb.co/h1CK09/campaign_software4.png" alt="slask" />
                  </a>
                </div>
                <div className="card">
                  <a href="">
                    <img src="https://image.ibb.co/jMsxnp/campaign_software5.png" alt="zendesk" />
                  </a>
                </div>
                <div className="card">
                  <a href="">
                    <img src="https://image.ibb.co/d4dgDU/campaign_software6.png" alt="asana" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="campaign-pics clearfix text-center">
            <div className="cards">
              <div className="card">
                <a href="">
                  <img src="https://image.ibb.co/dYBXnp/campaign_photos1.png" alt="campaign 1" />
                </a>
              </div>
              <div className="card">
                <a href="">
                  <img src="https://image.ibb.co/fX6nL9/campaign_photos2.png" alt="campaign 2" />
                </a>
              </div>
              <div className="card">
                <a href="">
                  <img src="https://image.ibb.co/jHd1f9/campaign_photos3.png" alt="campaign 3" />
                </a>
              </div>
              <div className="card">
                <a href="">
                  <img src="https://image.ibb.co/eYgySp/campaign_photos4.png" alt="campaign 4" />
                </a>
              </div>
              <div className="card">
                <a href="">
                  <img src="https://image.ibb.co/duv3tU/campaign_photos5.png" alt="campaign 5" />
                </a>
              </div>
              <div className="card">
                <a href="">
                  <img src="https://image.ibb.co/cA1nL9/campaign_photos6.png" alt="campaign 6" />
                </a>
              </div>
            </div>
          </section>
        </section>
      </div>
    )
  }
}
