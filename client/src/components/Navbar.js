// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Dropdown } from 'react-bootstrap';
// import './Navbar.css';
// import { getAuth } from 'firebase/auth'; // Import Firebase Auth

// const Navbar = ({ user, handleLogout }) => {
//   const auth = getAuth();
//   const loggedInUser = auth.currentUser;

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">
//           <span style={{ display: 'inline-block', transform: 'rotate(45deg)', marginRight: '5px' }}>
//             <i className="bi bi-rocket"></i>
//           </span>LearnByDoing
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav me-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Home</Link>
//             </li>
//           </ul>

//           <ul className="navbar-nav">
//             {loggedInUser ? (
//               loggedInUser.role === 'admin' ? ( // Check if the logged-in user is admin
//                 <>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/add-projects">Add Projects</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/add-courses">Add Courses</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/user-delete">User Delete</Link>
//                   </li>
//                   <Dropdown align="end">
//                     <Dropdown.Toggle variant="link" id="dropdown-basic">
//                       <i className="bi bi-person-circle"></i>
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu>
//                       <Dropdown.Item as={Link} to="/admin">{loggedInUser.email}</Dropdown.Item>
//                       <Dropdown.Item as={Link} to="/update-profile">Update Profile</Dropdown.Item> {/* Add Update Profile link */}
//                       <Dropdown.Item as={Link} to="/change-password">Change Password</Dropdown.Item>
//                       <Dropdown.Divider />
//                       <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
//                     </Dropdown.Menu>
//                   </Dropdown>
//                 </>
//               ) : (
//                 <>
//                   {/* Common Links for Regular Users */}
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/projects">Projects</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/courses">Courses</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/about">About Us</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/contact">Contact</Link>
//                   </li>

//                   <Dropdown align="end">
//                     <Dropdown.Toggle variant="link" id="dropdown-basic">
//                       <i className="bi bi-person-circle"></i>
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu>
//                       <Dropdown.Item as={Link} to="/user">{loggedInUser.email}</Dropdown.Item>
//                       <Dropdown.Item as={Link} to="/update-profile">Update Profile</Dropdown.Item> {/* Add Update Profile link */}
//                       <Dropdown.Item as={Link} to="/change-password">Change Password</Dropdown.Item>
//                       <Dropdown.Divider />
//                       <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
//                     </Dropdown.Menu>
//                   </Dropdown>
//                 </>
//               )
//             ) : (
//               <li className="nav-item">
//                 <Link className="btn" to="/login">Login</Link>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import './Navbar.css';

const Navbar = ({ user, handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <span style={{ display: 'inline-block', transform: 'rotate(45deg)', marginRight: '5px' }}>
            <i className="bi bi-rocket"></i>
          </span>
          LearnByDoing
        </Link>
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
              <Link className="nav-link" to="/">Home</Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            {user ? ( // Check if user prop is not null
              user.role === 'admin' ? ( // Check if the logged-in user is admin
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
                      <Dropdown.Item as={Link} to="/admin">{user.email}</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/update-profile">Update Profile</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/change-password">Change Password</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <>
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
                      <Dropdown.Item as={Link} to="/user">{user.email}</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/update-profile">Update Profile</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/change-password">Change Password</Dropdown.Item>
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
