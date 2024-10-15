import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database'; // Import necessary functions for Firebase Realtime Database
import Footer from '../components/Footer';
import Spinner from 'react-bootstrap/Spinner'; // Import Bootstrap spinner
import Card from 'react-bootstrap/Card'; // Import Bootstrap Card component

const UserProfile = ()=> {
  const auth = getAuth();
  const user = auth.currentUser;

  // State to store the email, role, education, phone, social links, and photo URL
  const [email, setEmail] = useState('');
   const [role, setRole] = useState('');
  const [education, setEducation] = useState('');
  const [phone, setPhone] = useState('');
  const [socialLinks, setSocialLinks] = useState({ linkedin: '', twitter: '', github: '' });
  const [photoURL, setPhotoURL] = useState(''); // State for photo URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // State for error messages

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        // User is authenticated
        setEmail(user.email); // Get the email from Firebase Auth
        setPhotoURL(user.photoURL || ''); // Get the photo URL from Firebase Auth

        // Fetch additional user data from Firebase Realtime Database
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);
        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log("User Data:", userData); // Log the retrieved user data

            // Set user data from the fetched data
            setRole(userData.role || 'Not provided'); // Default to 'Not provided' if not available
            setEducation(userData.education || 'Not provided'); // Set education
            setPhone(userData.phone || 'Not provided'); // Set phone
            setSocialLinks(userData.socialLinks || { linkedin: '', twitter: '', github: '' }); // Set social links
          } else {
            console.log("No data available");
            setError('No user data available.');
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError('Failed to fetch user data.');
        }
      } else {
        // User is not authenticated
        setEmail(''); // Set to an empty string or handle as needed
        // setRole('Not provided'); // Default role when not authenticated
        setEducation('Not provided'); // Default education when not authenticated
        setPhone('Not provided'); // Default phone when not authenticated
        setSocialLinks({ linkedin: '', twitter: '', github: '' }); // Default social links when not authenticated
      }
      setLoading(false); // Set loading to false once the check is done
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status" />
        <span className="sr-only">Loading...</span>
      </div>
    ); // Optionally show a loading state with Bootstrap spinner
  }

  return (
    <>
      <div className="container mt-5">
        <h2>User Profile</h2>
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
        {user ? (
          <Card className="mb-3">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt="Profile"
                    className="img-fluid rounded-circle"
                    style={{ width: '100px', height: '100px', marginRight: '20px' }}
                  />
                ) : (
                  <div
                    className="placeholder"
                    style={{ width: '100px', height: '100px', backgroundColor: '#ddd', borderRadius: '50%', marginRight: '20px' }}
                  ></div>
                )}
                <div>
                  <Card.Title>{email}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Role: {role}</Card.Subtitle>
                </div>
              </div>
              <Card.Text>
                <strong>Education:</strong> {education || 'Not provided'}<br />
                <strong>Phone Number:</strong> {phone || 'Not provided'}<br />
              </Card.Text>
              <div>
                <h5>Social Links</h5>
                <p>
                  <strong>LinkedIn:</strong> <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">{socialLinks.linkedin || 'Not provided'}</a>
                </p>
                <p>
                  <strong>Twitter:</strong> <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">{socialLinks.twitter || 'Not provided'}</a>
                </p>
                <p>
                  <strong>GitHub:</strong> <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">{socialLinks.github || 'Not provided'}</a>
                </p>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <p>User is not authenticated.</p> // Handle unauthenticated state
        )}
      </div>
      <Footer />
    </>
  );
};


export default UserProfile;
