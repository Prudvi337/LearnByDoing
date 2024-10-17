import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import { auth, database } from '../firebaseConfig'; // Firebase config
import './Auth.css'; // Add your styles in this file
import Footer from '../components/Footer';

const Auth = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '', role: 'user', otp: '' });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const sendOtp = async (email) => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    const templateParams = {
      to_email: email,
      otp: generatedOtp,
    };

    try {
      await emailjs.send('service_0zt6x89', 'template_oe1jicm', templateParams, 'A6EiiOCmBIte0AE5m');
      setOtp(generatedOtp);
      setOtpSent(true);
      toast.success('OTP sent to your email!');
    } catch (error) {
      toast.error(`Error sending OTP: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      if (!otpSent) {
        sendOtp(form.email);
      } else {
        if (otp === form.otp) {
          try {
            const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
            const user = userCredential.user;

            const userRef = ref(database, 'users/' + user.uid);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
              const userData = snapshot.val();
              if (userData.role === 'admin') {
                setUser({ email: user.email, uid: user.uid, role: 'admin' });
                toast.success('Admin logged in successfully!');
              } else {
                setUser({ email: user.email, uid: user.uid, role: 'user' });
                toast.success('Logged in successfully!');
              }
              navigate('/');
            } else {
              toast.error('No user data found!');
            }
          } catch (error) {
            toast.error(`Error logging in: ${error.message}`);
          }
        } else {
          toast.error('Invalid OTP!');
        }
      }
    } else {
      if (form.password !== form.confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }

      if (otp === form.otp) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
          const user = userCredential.user;

          await set(ref(database, 'users/' + user.uid), {
            email: form.email,
            role: form.role,
          });

          toast.success('Account created successfully!');
          setUser({ email: user.email, uid: user.uid, role: form.role });
          navigate('/');
        } catch (error) {
          toast.error(`Error signing up: ${error.message}`);
        }
      } else {
        toast.error('Invalid OTP!');
      }
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setOtpSent(false);
    setForm({ email: '', password: '', confirmPassword: '', role: 'user', otp: '' });
  };

  return (
    <>
    <div className="auth-container">
      <div className={`auth-box ${isLogin ? 'auth-box-signin' : 'auth-box-signup'}`}>
        <div className="auth-left">
          <h2><span style={{ display: 'inline-block', transform: 'rotate(45deg)', marginRight: '5px' }}>
            <i className="bi bi-rocket"></i>
          </span>Welcome Back!</h2>
          <p>To keep connected with us, please login with your personal info</p>
          <button className="btn btn1 switch-btn w-80" onClick={toggleAuthMode}>
    {isLogin ? (
      <>
        <i className="fas fa-sign-in-alt"></i> Sign In
      </>
    ) : (
      <>
        <i className="fas fa-sign-in-alt"></i> Login
      </>
    )}
  </button>    </div>
        <div className="auth-right">
          <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            {!isLogin && (
              <>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            </>
            )}
            {otpSent && (
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={form.otp}
                onChange={handleChange}
                required
              />
            )}
            <button type="submit" className="btn btn1">{isLogin ? 'LOGIN' : 'SIGN UP'}</button>
          </form>
          <div className="social-login">
            <p className='text-white font-weight-bold'>or use your email for registration</p>
            <div className="social-icons">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-google"></i>
              <i className="fab fa-linkedin"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
 
};

export default Auth;
