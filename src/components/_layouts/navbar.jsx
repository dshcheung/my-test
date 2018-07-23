import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BNavbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import NavItem from 'react-bootstrap/lib/NavItem'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'

import { DEFAULT_USER_AVATAR } from '../../services/constants'

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
            <span>ANGELHUB</span>
          </BNavbar.Brand>
          <BNavbar.Toggle>
            <i className="fa fa-signal fa-rotate-90" />
          </BNavbar.Toggle>
        </BNavbar.Header>

        <BNavbar.Collapse>
          {
            currentUser && (
              <Nav>
                {
                  currentUser.role === "Investor" && (
                    <LinkContainer to="/my/portfolio" active={false}>
                      <NavItem eventKey={1.1}>
                        <span>My Portfolio</span>
                      </NavItem>
                    </LinkContainer>
                  )
                }

                {
                  currentUser.role === "Investor" && (
                    <LinkContainer to="/campaigns" active={false}>
                      <NavItem eventKey={1.2}>
                        <span>Campaigns</span>
                      </NavItem>
                    </LinkContainer>
                  )
                }

                {
                  currentUser.role === "StartupUser" && (
                    <LinkContainer to="/my/dashboard" active={false}>
                      <NavItem eventKey={2.1}>
                        <span>Dashboard</span>
                      </NavItem>
                    </LinkContainer>
                  )
                }

                {
                  currentUser.role === "StartupUser" && (
                    <LinkContainer to="/my/campaigns" active={false}>
                      <NavItem eventKey={2.2}>
                        <span>My Campaigns</span>
                      </NavItem>
                    </LinkContainer>
                  )
                }
              </Nav>
            )
          }

          {
            !currentUser && (
              <Nav pullRight>
                <LinkContainer to="/auth/login" active={false}>
                  <NavItem eventKey={3.1}>
                    <span>Login</span>
                  </NavItem>
                </LinkContainer>

                <LinkContainer to="/auth/signup" active={false}>
                  <NavItem className="get-started" eventKey={3.2}>
                    <div>Get Started</div>
                  </NavItem>
                </LinkContainer>
              </Nav>
            )
          }

          {
            currentUser && (
              <Nav pullRight>
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
                      <LinkContainer to="/my/dashboard" active={false}>
                        <MenuItem eventKey={9.1}>Dashboard</MenuItem>
                      </LinkContainer>
                    )
                  }

                  {
                    currentUser.role === "StartupUser" && (
                      <LinkContainer to="/my/campaigns" active={false}>
                        <MenuItem eventKey={9.3}>My Campaigns</MenuItem>
                      </LinkContainer>
                    )
                  }

                  {
                    currentUser.role === "Investor" && (
                      <LinkContainer to="/my/portfolio" active={false}>
                        <MenuItem eventKey={9.4}>My Portfolio</MenuItem>
                      </LinkContainer>
                    )
                  }

                  {
                    currentUser.role === "Investor" && (
                      <LinkContainer to="/my/aml" active={false}>
                        <MenuItem eventKey={9.5}>My AML Process</MenuItem>
                      </LinkContainer>
                    )
                  }

                  {
                    currentUser.role === "Investor" && (
                      <LinkContainer to="/my/profile-suitability" active={false}>
                        <MenuItem eventKey={9.5}>My Profile Suitability</MenuItem>
                      </LinkContainer>
                    )
                  }

                  <MenuItem divider />

                  <LinkContainer to="/my/settings" active={false}>
                    <MenuItem eventKey={9.7}>Settings</MenuItem>
                  </LinkContainer>

                  <MenuItem divider />

                  <LinkContainer to="" active={false}>
                    <MenuItem eventKey={9.8} onClick={this.props.deleteSession}>Logout</MenuItem>
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
