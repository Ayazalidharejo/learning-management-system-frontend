
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [tokenDebugInfo, setTokenDebugInfo] = useState(null);

  const { password, confirmPassword } = formData;
  
  // API base URL - make sure this matches your backend exactly
  // Use the correct backend URL
  const API_BASE_URL = 'https://learning-management-system-backend-code-aiqn.vercel.app/api';

  useEffect(() => {
    const verifyToken = async () => {
      console.log('Verifying token:', token);
      
      try {
        // Log full request URL for debugging
        const requestUrl = `${API_BASE_URL}/auth/verify-reset-token/${token}`;
        console.log('Making API request to:', requestUrl);
        
        const res = await axios.get(requestUrl);
        
        console.log('Token verification response:', res.data);
        setTokenValid(res.data.valid);
        
        // Store any debug info returned from the server
        if (res.data.debug) {
          setTokenDebugInfo(res.data.debug);
        }
      } catch (err) {
        console.error('Token verification error:', err);
        
        // Log detailed error information
        if (err.response) {
          console.log('Error response data:', err.response.data);
          console.log('Error response status:', err.response.status);
          console.log('Error response headers:', err.response.headers);
          
          // Store debug info if any
          if (err.response.data && err.response.data.debug) {
            setTokenDebugInfo(err.response.data.debug);
          }
          
          setError(err.response.data.message || 'Invalid or expired token');
        } else if (err.request) {
          // The request was made but no response was received
          console.log('Error request:', err.request);
          setError('No response received from server. Please check your network connection.');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error message:', err.message);
          setError('Error setting up request: ' + err.message);
        }
      } finally {
        setVerifying(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setError('No reset token provided');
      setVerifying(false);
    }
  }, [token, API_BASE_URL]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      // Log full request URL for debugging
      const requestUrl = `${API_BASE_URL}/auth/reset-password/${token}`;
      console.log('Making password reset request to:', requestUrl);
      console.log('Request payload:', { password, confirmPassword });
      
      const res = await axios.post(requestUrl, {
        password,
        confirmPassword
      });

      console.log('Password reset response:', res.data);
      setMessage(res.data.message);

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.error('Password reset error:', err);
      
      // Log detailed error information
      if (err.response) {
        console.log('Error response data:', err.response.data);
        console.log('Error response status:', err.response.status);
        setError(err.response.data.message || 'Something went wrong');
      } else if (err.request) {
        console.log('Error request:', err.request);
        setError('No response received from server');
      } else {
        console.log('Error message:', err.message);
        setError('Error: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Verifying token...</span>
        </div>
        <div className="ms-3">Verifying reset token...</div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="card p-4 shadow" style={{ maxWidth: '500px', width: '100%' }}>
          <h3 className="text-center mb-3">Reset Password</h3>
          <div className="alert alert-danger">
            <p className="mb-0"><strong>Error:</strong> {error}</p>
            {tokenDebugInfo && (
              <div className="mt-3 p-2 bg-light">
                <small>Debug info: {JSON.stringify(tokenDebugInfo)}</small>
              </div>
            )}
          </div>
          <div className="text-center">
            <p>Your password reset link is invalid or has expired.</p>
            <p>Please request a new reset link or contact support if the problem persists.</p>
            <Link to="/forgot-password" className="btn btn-primary mt-2">Request New Reset Link</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '450px', width: '100%' }}>
        <h3 className="text-center mb-4">Reset Password</h3>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChange}
              required
              minLength="6"
              placeholder="Enter new password"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              required
              minLength="6"
              placeholder="Confirm new password"
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;