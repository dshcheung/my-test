import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import BNavbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import NavItem from 'react-bootstrap/lib/NavItem'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'

import { DEFAULT_PIC } from '../../constants'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session')
  }
}

const mapDispatchToProps = () => {
  return {
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
              <img src="https://s3-ap-northeast-1.amazonaws.com/angel-hub-dev/static/main-logo.png" alt="Logo" />
            </Link>
          </BNavbar.Brand>
          <BNavbar.Toggle>
            <i className="fa fa-signal fa-rotate-90" />
          </BNavbar.Toggle>
        </BNavbar.Header>

        <BNavbar.Collapse>
          <Nav>
            <LinkContainer to="/startups" active={false}>
              <NavItem eventKey={1}>
                <span>Discover Companies</span>
              </NavItem>
            </LinkContainer>

            <LinkContainer to="" active={false}>
              <NavItem eventKey={2}>
                <span>Learn</span>
              </NavItem>
            </LinkContainer>

            <LinkContainer to="" active={false}>
              <NavItem eventKey={3}>
                <span>About</span>
              </NavItem>
            </LinkContainer>
          </Nav>
          {
            !currentUser && (
              <Nav pullRight>
                <LinkContainer to="/auth/login" active={false}>
                  <NavItem eventKey={4}>
                    <span>Login</span>
                  </NavItem>
                </LinkContainer>

                <LinkContainer to="/auth/signup" active={false}>
                  <NavItem className="get-started" eventKey={5}>
                    <div>Get Started</div>
                  </NavItem>
                </LinkContainer>
              </Nav>
            )
          }
          {
            currentUser && (
              <Nav pullRight>
                <LinkContainer to="/my/messages" active={false}>
                  <NavItem className="messages" eventKey={6}>
                    <i className="fa fa-comments fa-2x hidden-xs" />
                    <span className="hidden-sm hidden-md hidden-lg">MESSAGES</span>
                    <div className="badge">1</div>
                  </NavItem>
                </LinkContainer>

                <LinkContainer to="/my/notifications" active={false}>
                  <NavItem className="notifications" eventKey={7}>
                    <i className="fa fa-globe fa-2x hidden-xs" />
                    <span className="hidden-sm hidden-md hidden-lg">Notifications</span>
                    <div className="badge">1</div>
                  </NavItem>
                </LinkContainer>

                <LinkContainer to={`/users/${currentUser.id}`} active={false}>
                  <NavItem className="profile" eventKey={8}>
                    <img src={_.get(currentUser, 'profile.avatar.small') || DEFAULT_PIC} alt="avatar" className="hidden-xs" />
                    <span className="hidden-sm hidden-md hidden-lg">MY PROFILE</span>
                  </NavItem>
                </LinkContainer>

                <NavDropdown title="" id="my-links" eventKey={9}>
                  <LinkContainer to={`/users/${currentUser.id}`} active={false}>
                    <MenuItem eventKey={9.1}>Edit Profile</MenuItem>
                  </LinkContainer>
                  <LinkContainer to="" active={false}>
                    <MenuItem eventKey={9.2}>Change Password</MenuItem>
                  </LinkContainer>
                  <LinkContainer to="" active={false}>
                    <MenuItem eventKey={9.3}>Settings</MenuItem>
                  </LinkContainer>
                  <LinkContainer to="" active={false}>
                    <MenuItem eventKey={9.4}>Logout</MenuItem>
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
