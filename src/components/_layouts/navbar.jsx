import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import BNavbar from 'react-bootstrap/lib/Navbar'

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Navbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false
    }
  }

  componentWillMount() {
    window.addEventListener("resize", () => {
      if (this.state.expanded && window.innerWidth >= 768) {
        this.setState({ expanded: false })
      }
    })
  }

  toggleMenu(alwaysFalse) {
    if (window.innerWidth < 768) {
      this.setState({ expanded: alwaysFalse ? false : !this.state.expanded })
    }
  }

  render() {
    return (
      <BNavbar
        fixedTop
        fluid
        collapseOnSelect
        expanded={this.state.expanded}
        onToggle={() => {}}
        id="layouts-navbar"
      >
        <BNavbar.Header>
          <BNavbar.Brand>
            <Link to="/" onClick={() => { this.toggleMenu(true) }}>
              <img src="https://s3-ap-northeast-1.amazonaws.com/angel-hub-dev/static/main-logo.png" alt="Logo" />
            </Link>
          </BNavbar.Brand>
          <BNavbar.Toggle onClick={() => { this.toggleMenu() }} />
        </BNavbar.Header>

        <BNavbar.Collapse>
          <ul className="nav navbar-nav">
            <li onClick={() => { this.toggleMenu() }}>
              <Link to="/startups" activeClassName="active">
                <span>Discover Companies</span>
              </Link>
            </li>
            <li onClick={() => { this.toggleMenu() }}>
              <Link activeClassName="active">
                <span>Learn</span>
              </Link>
            </li>
            <li onClick={() => { this.toggleMenu() }}>
              <Link activeClassName="active">
                <span>About</span>
              </Link>
            </li>
          </ul>
          <ul className="nav navbar-nav">
            <li onClick={() => { this.toggleMenu() }}>
              <Link to="/auth/login" activeClassName="active">
                <span>Login</span>
              </Link>
            </li>
            <li onClick={() => { this.toggleMenu() }} className="li-btn">
              <Link className="btn btn-info border-none" to="/auth/signup" activeClassName="active">
                Get Started
              </Link>
            </li>
          </ul>
        </BNavbar.Collapse>
      </BNavbar>
    )
  }
}
