import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function CustomNavbar() {
  return (
    <Navbar expand="lg" style={styles.navbar} variant="dark">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand href="#home" style={styles.brand}>
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/bus.png" // Replace with your logo
            alt="logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          FastX
        </Navbar.Brand>

        {/* Navbar Toggle for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"> {/* Align nav items to the right */}
            <Nav.Link href="#bookings" style={styles.link}>My Bookings</Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown" style={styles.link}>
              <NavDropdown.Item href="#action/3.1">Contact Us</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">FAQs</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">Privacy Policy</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {/* Signed in User Info */}
          <Navbar.Text style={styles.signedIn}>
            Signed in as: <a href="#profile" style={styles.userLink}></a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// Inline Custom Styles
const styles = {
  navbar: {
    backgroundColor: '#5A67D8', // Custom Navbar background color
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  link: {
    color: 'white',
    fontWeight: '500',
    marginRight: '15px',
  },
  signedIn: {
    color: '#D1D5DB',
    marginLeft: '15px',
  },
  userLink: {
    color: '#E9EAEC',
    textDecoration: 'underline',
  },
};

export default CustomNavbar;
