import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import './Navbar.css';
const Navbar = ({ user, handleLogout }) => {
  // console.log(user); // Check the user object

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
        <span style={{ display: 'inline-block', transform: 'rotate(45deg)', marginRight: '5px' }}>
            <i className="bi bi-rocket"></i>
          </span>LearnByDoing</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link"  to="/">Home</Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            {user ? (
              user.role === 'admin' ? ( // Check if user is admin
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/add-projects">Add Projects</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/add-courses">Add Courses</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user-delete">User Delete</Link>
                  </li>
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="link" id="dropdown-basic">
                      <i className="bi bi-person-circle"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/admin">Admin Profile</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <>
                  {/* Common Links for Regular Users */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/projects">Projects</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/courses">Courses</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about">About Us</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact">Contact</Link>
                  </li>

                  <Dropdown align="end">
                    <Dropdown.Toggle variant="link" id="dropdown-basic">
                      <i className="bi bi-person-circle"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/user">User Profile</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )
            ) : (
              <li className="nav-item">
                <Link className="btn" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
