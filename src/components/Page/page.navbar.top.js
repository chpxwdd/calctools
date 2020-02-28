import React, { Component } from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'

export default class NavbarTop extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { glyph, title } = this.props
    const navbarCss = { height: '80px', marginBottom: '20px' }
    return (
      <Navbar bg="dark" variant="dark" style={navbarCss}>
        <Container>
          {(glyph || title) && (

            <Navbar.Brand href="/">
              {glyph && <i className={"fas fa-" + glyph} />}
              {title !== '' && (title)}
            </Navbar.Brand>
          )}
          <Nav className="mr-auto">
            <Nav.Link href="/billcounter">ver.1</Nav.Link>
            <Nav.Link href="/calculator">ver.2</Nav.Link>
          </Nav>
          {/* <Auth.NavbarLinks /> */}
        </Container>
      </Navbar>
    )
  }
}
