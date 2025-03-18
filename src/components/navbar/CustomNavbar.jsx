import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Link, useNavigate } from 'react-router-dom';
import "./CustomNavbar.css"

function CustomNavbar(props) {
  const username = props.username;
  const navigate = useNavigate()

  // Logout Function
  const handleLogout = () => {
    sessionStorage.clear(); // Clear session data
    navigate("/login");
    window.location.reload()
  };

  return (
    // <div className='navbar'>
    // <Navbar expand="lg" variant="light" className='custom-navbar'>
    //   <Container className='navbar-container'>
    //     {/* Brand Logo */}
    //     <Navbar.Brand href="#home" style={{
    //       display: 'flex',
    //       alignItems: 'center',
    //       color: 'blue',
    //       textDecoration: 'none'
    //     }}>
    //       <img
    //         src="https://img.icons8.com/ios-filled/50/ffffff/bus.png" 
    //         alt="logo"
    //         width="40"
    //         height="40"
    //         className="d-inline-block align-top"
    //         style={{
    //           marginRight: '10px'
    //         }}
    //       />{' '}
    //       <span style={{
    //         fontSize: '1.5rem',
    //         fontWeight: 'bold'
    //       }}>FastX</span>
    //     </Navbar.Brand>

    //     {/* Navbar Toggle for Mobile */}
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />

    //     {/* Navbar Links */}
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="ms-auto"> {/* Align nav items to the right */}
    //         <Link
    //           to="/my-bookings"
    //           state={{ username: props.username }}
    //           className="nav-link"
    //           style={{
    //             color: '#fff',
    //             padding: '0.5rem 1rem',
    //             textDecoration: 'none',
    //             '&:hover': {
    //               color: '#e3f2fd'
    //             }
    //           }}
    //         >
    //           My Bookings
    //         </Link>
            
    //       </Nav>
    //       {/* Signed in User Info */}
    //       <Navbar.Text style={{
    //         color: '#fff',
    //         marginLeft: '1rem'
    //       }}>
    //         Signed in as: <span style={{
    //           fontWeight: 'bold'
    //         }}>{username}</span>
    //       </Navbar.Text>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    // </div>
    <Navbar className="bg-body-tertiary custom-navbar" fixed="top" style={{
      width: '100%',
      backgroundColor: '#000000', 
      padding: '0.5rem 1rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      color:"#5A4AF4"
    }}>
      <Container style={{
        width: '100%',
        maxWidth: '100%',
        margin: '0',
        padding: '0 2rem',
        color:"#5A4AF4",
        backgroundColor: '#5A4AF4' 
      }}>
        <Navbar.Brand style={{ 
          fontWeight: 'bold', 
          fontSize: '1.5rem', 
          color: 'white',
          marginLeft: 0,
          display: 'flex',
          alignItems: 'center'
        }}>
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/bus.png"
            alt="logo"
            width="40"
            height="40"
            className="d-inline-block align-top"
            style={{ marginRight: '10px', color:"white" }}
          />
          FastX
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{
          backgroundColor: 'white'
        }}/>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            <Link
              to="/my-bookings"
              state={{ username: username }}
              className="nav-link"
              style={{
                color: 'white',
                padding: '0.5rem 1rem',
                textDecoration: 'none'
              }}
            >
              My Bookings
            </Link>
          </Nav>
          <Navbar.Text style={{ 
            color: '#FFFFFF', 
            marginRight: 0 
          }}>
            Signed in as: <span style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontWeight: 'bold',
            }}>{username}</span>&nbsp;&nbsp;
          </Navbar.Text>
          {/* Logout Text Button */}
          <span 
            onClick={handleLogout} 
            style={{
              color: '#FFFFFF', 
              cursor: 'pointer',
              textDecoration: 'underline',
              fontWeight: 'bold'
            }}>Logout</span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
