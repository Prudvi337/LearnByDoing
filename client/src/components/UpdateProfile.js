import React, { useEffect, useState } from 'react';
import { getAuth, updateEmail, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, set } from 'firebase/database'; 
import Footer from '../components/Footer';
import { ToastContainer,toast } from 'react-toastify';

const UpdateProfile = () => {
  const auth = getAuth();
  const storage = getStorage();
  const [user, setUser] = useState(auth.currentUser);
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [education, setEducation] = useState('');
  const [phone, setPhone] = useState('');
  const [socialLinks, setSocialLinks] = useState({ linkedin: '', twitter: '', github: '' });
 const [success, setSuccess] = useState('');
   const [error, setError] = useState('');
  const [preview, setPreview] = useState(null); 

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prevLinks) => ({ ...prevLinks, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (!user) {
      toast.error('User is not authenticated.');
      return;
    }

    try {
      if (email !== user.email) {
        await updateEmail(user, email);
      }

      let photoURL = user.photoURL; 
      if (file) {
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(storageRef, file);
        photoURL = await getDownloadURL(storageRef); 
        await updateProfile(user, { photoURL }); 
      }

      const db = getDatabase();
      const userRef = dbRef(db, `users/${user.uid}`); 
      await set(userRef, {
        email: email, 
        education: education, 
        phone: phone, 
        socialLinks: socialLinks, 
      });

      toast.success('Profile updated successfully.');
    } catch (error) {
      toast.error('Failed to update profile: ' + error.message);
    }
  };

  return (
    <>
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>Update Profile</h2>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleUpdateProfile}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="form-label">Profile Picture</label>
              <input
                type="file"
                className="form-control"
                id="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {preview && (
                <div className="mt-2">
                  <img src={preview} alt="Preview" className="img-fluid rounded-circle" style={{ width: '100px', height: '100px' }} />
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="education" className="form-label">Education Details</label>
              <input
                type="text"
                className="form-control"
                id="education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="linkedin" className="form-label">LinkedIn</label>
              <input
                type="url"
                className="form-control"
                id="linkedin"
                name="linkedin"
                value={socialLinks.linkedin}
                onChange={handleSocialLinkChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="twitter" className="form-label">Twitter</label>
              <input
                type="url"
                className="form-control"
                id="twitter"
                name="twitter"
                value={socialLinks.twitter}
                onChange={handleSocialLinkChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="github" className="form-label">GitHub</label>
              <input
                type="url"
                className="form-control"
                id="github"
                name="github"
                value={socialLinks.github}
                onChange={handleSocialLinkChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    <ToastContainer />
    </>
  );
};

export default UpdateProfile;
