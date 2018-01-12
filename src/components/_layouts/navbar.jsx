import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import BNavbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import NavItem from 'react-bootstrap/lib/NavItem'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'

import { DEFAULT_USER_AVATAR, AHUB_LOGO } from '../../constants'

import { deleteSession } from '../../actions/session'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSession: bindActionCreators(deleteSession, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps, null, { pure: false })
export default class Navbar extends Component {
  render() {
    const { currentUser } = this.props

    return (
      <BNavbar
        fixedTop
        fluid
        collapseOnSelect
        id="layouts-navbar"
      >
        <BNavbar.Header>
          <BNavbar.Brand>
            <Link to="/">
              <img src={AHUB_LOGO} alt="Logo" />
            </Link>
          </BNavbar.Brand>
          <BNavbar.Toggle>
            <i className="fa fa-signal fa-rotate-90" />
          </BNavbar.Toggle>
        </BNavbar.Header>

        <BNavbar.Collapse>
          <Nav>
            {
              currentUser && (
                <LinkContainer to="/campaigns" active={false}>
                  <NavItem eventKey={2}>
                    <span>Campaigns</span>
                  </NavItem>
                </LinkContainer>
              )
            }

            {
              !currentUser && (
                <LinkContainer to="/learn" active={false}>
                  <NavItem eventKey={3}>
                    <span>Learn</span>
                  </NavItem>
                </LinkContainer>
              )
            }

            {
              !currentUser && (
                <LinkContainer to="/about" active={false}>
                  <NavItem eventKey={4}>
                    <span>About</span>
                  </NavItem>
                </LinkContainer>
              )
            }

          </Nav>
          {
            !currentUser && (
              <Nav pullRight>
                <LinkContainer to="/auth/login" active={false}>
                  <NavItem eventKey={5}>
                    <span>Login</span>
                  </NavItem>
                </LinkContainer>

                <LinkContainer to="/auth/signup" active={false}>
                  <NavItem className="get-started" eventKey={6}>
                    <div>Get Started</div>
                  </NavItem>
                </LinkContainer>
              </Nav>
            )
          }
          {
            currentUser && (
              <Nav pullRight>
                <LinkContainer to="/my/conversations" active={false}>
                  <NavItem className="conversations" eventKey={7}>
                    <i className="fa fa-comments fa-2x hidden-xs" />
                    <span className="hidden-sm hidden-md hidden-lg">Conversations</span>
                    <div className="badge">1</div>
                  </NavItem>
                </LinkContainer>

                <LinkContainer to="/my/notifications" active={false}>
                  <NavItem className="notifications" eventKey={8}>
                    <i className="fa fa-globe fa-2x hidden-xs" />
                    <span className="hidden-sm hidden-md hidden-lg">Notifications</span>
                    <div className="badge">1</div>
                  </NavItem>
                </LinkContainer>

                <NavDropdown
                  title={
                    <div>
                      <img src={_.get(currentUser, 'profile.avatar.original') || DEFAULT_USER_AVATAR} alt="avatar" className="hidden-xs" />
                      <span className="hidden-sm hidden-md hidden-lg">MY PROFILE</span>
                      <i className="fa fa-caret-down" />
                    </div>
                  }
                  noCaret
                  className="profile"
                  id="my-links"
                  eventKey={9}
                >
                  {
                    currentUser.role === "StartupUser" && (
                      <LinkContainer to="/my/campaigns" active={false}>
                        <MenuItem eventKey={9.1}>My Campaigns</MenuItem>
                      </LinkContainer>
                    )
                  }

                  {
                    currentUser.role === "StartupUser" && (
                      <LinkContainer to="/my/startups" active={false}>
                        <MenuItem eventKey={9.2}>My Startups</MenuItem>
                      </LinkContainer>
                    )
                  }

                  {
                    currentUser.role === "Investor" && (
                      <LinkContainer to="/my/portfolio" active={false}>
                        <MenuItem eventKey={9.3}>My Portfolio</MenuItem>
                      </LinkContainer>
                    )
                  }

                  <MenuItem divider />

                  <LinkContainer to={`/users/${currentUser.id}`} active={false}>
                    <MenuItem eventKey={9.4}>Edit Profile</MenuItem>
                  </LinkContainer>
                  <LinkContainer to="/my/settings" active={false}>
                    <MenuItem eventKey={9.5}>Settings</MenuItem>
                  </LinkContainer>

                  <MenuItem divider />

                  <LinkContainer to="" active={false}>
                    <MenuItem eventKey={9.6} onClick={this.props.deleteSession}>Logout</MenuItem>
                  </LinkContainer>
                </NavDropdown>
              </Nav>
            )
          }
        </BNavbar.Collapse>
      </BNavbar>
    )
  }
}
