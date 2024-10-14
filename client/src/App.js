
// import React, { useState, useEffect } from 'react';
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import UserProfile from './pages/UserProfile';
// import AdminProfile from './pages/AdminProfile';
// import Projects from './pages/ProjectsPage';
// import Courses from './pages/CoursesPage';
// import About from './pages/AboutUs';
// import Contact from './pages/Contact';
// import AddProjects from './pages/AddProjects';
// import AddCourses from './pages/AddCourses';
// import UserProfileDelete from './pages/UserProfileDelete';
// import Auth from './pages/Auth';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Terms from './components/Terms';
// import Privacy from './components/Privacy';
// import ChangePassword from './components/ChangePassword';
// import UpdateProfile from './components/UpdateProfile';
// import Workspace from './pages/WorkspacePage';
// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // Flag to handle loading state
//   const navigate = useNavigate();

//   // Fetch user from localStorage on every page load
//   useEffect(() => {
//     const storedUser = localStorage.getItem('userData');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false); // Finish loading after checking localStorage
//   }, []);

//   // Logout function
//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem('userData'); // Clear user data from localStorage
//     navigate('/login'); // Redirect to home
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Show loading until the user state is checked
//   }

//   return (
//     <>
//       <Navbar user={user} handleLogout={handleLogout} />
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home isLoggedIn={!!user} />} />
//         <Route path="/login" element={<Auth setUser={setUser} />} />
//         <Route path="/user" element={<UserProfile user={user} />} />
//         <Route path="/update-profile" element={<UpdateProfile />} />
//         <Route path="/change-password" element={<ChangePassword />} />
//         <Route path="/projects" element={<Projects />} />
//         <Route path="/project-workspace/:projectId" component={Workspace} />
//         <Route path="/courses" element={<Courses />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/terms" element={<Terms />} />
//         <Route path="/privacy" element={<Privacy />} />

//         {/* Admin Routes */}
//         {user && user.role === 'admin' && (
//           <>
//             <Route path="/admin" element={<AdminProfile />} />

//             <Route path="/add-projects" element={<AddProjects />} />
//             <Route path="/add-courses" element={<AddCourses />} />
//             <Route path="/user-delete" element={<UserProfileDelete />} />

//           </>
//         )}
//       </Routes>
//       <ToastContainer />
//     </>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import AdminProfile from './pages/AdminProfile';
import Projects from './pages/ProjectsPage';
import Courses from './pages/CoursesPage';
import About from './pages/AboutUs';
import Contact from './pages/Contact';
import AddProjects from './pages/AddProjects';
import AddCourses from './pages/AddCourses';
import UserProfileDelete from './pages/UserProfileDelete';
import Auth from './pages/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import ChangePassword from './components/ChangePassword';
import UpdateProfile from './components/UpdateProfile';
import Workspace from './pages/WorkspacePage'; // Ensure the import path is correct

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Flag to handle loading state
  const navigate = useNavigate();

  // Fetch user from localStorage on every page load
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Finish loading after checking localStorage
  }, []);

  // Logout function
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('userData'); // Clear user data from localStorage
    navigate('/login'); // Redirect to login
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading until the user state is checked
  }

  return (
    <>
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home isLoggedIn={!!user} />} />
        <Route path="/login" element={<Auth setUser={setUser} />} />
        <Route path="/user" element={<UserProfile user={user} />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project-workspace/:projectId" element={<Workspace />} /> {/* Change here */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* Admin Routes */}
        {user && user.role === 'admin' && (
          <>
            <Route path="/admin" element={<AdminProfile />} />
            <Route path="/add-projects" element={<AddProjects />} />
            <Route path="/add-courses" element={<AddCourses />} />
            <Route path="/user-delete" element={<UserProfileDelete />} />
          </>
        )}
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
