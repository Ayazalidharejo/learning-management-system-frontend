


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       const res = await axios.post('https://learning-management-system-backend-code.vercel.app/api/auth/forgot-password', { email });
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container d-flex align-items-center justify-content-center min-vh-100">
//       <div className="card p-4 shadow" style={{ maxWidth: '450px', width: '100%' }}>
//         <h3 className="text-center mb-4">Forgot Password</h3>

//         {message && (
//           <div className="alert alert-info text-center" role="alert">
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Enter your email address</label>
//             <input
//               type="email"
//               className="form-control"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               placeholder="you@example.com"
//             />
//           </div>

//           <div className="d-grid mb-3">
//             <button type="submit" className="btn btn-primary" disabled={loading}>
//               {loading ? 'Sending...' : 'Send Reset Link'}
//             </button>
//           </div>
//         </form>

//         <div className="text-center">
//           <Link to="/login">Back to Login</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // This is the correct API URL that matches your backend resetURL
  const API_URL = 'https://learning-management-system-backend-code-aiqn.vercel.app/api/auth/forgot-password';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Log the request for debugging
      console.log('Sending forgot password request to:', API_URL);
      console.log('Email being sent:', email.trim());
      
      const res = await axios.post(API_URL, { 
        email: email.trim() 
      });
      
      console.log('Response received:', res.data);
      setMessage(res.data.message || 'Password reset link sent successfully. Please check your email.');
    } catch (err) {
      console.error('Password reset request error:', err);
      
      if (err.response) {
        console.log('Error response data:', err.response.data);
        console.log('Error response status:', err.response.status);
        setError(err.response.data.message || 'Something went wrong. Please try again.');
      } else if (err.request) {
        // The request was made but no response was received
        console.log('No response received:', err.request);
        setError('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request
        console.log('Error setting up request:', err.message);
        setError('Error: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '450px', width: '100%' }}>
        <h3 className="text-center mb-4">Forgot Password</h3>

        {message && (
          <div className="alert alert-success text-center" role="alert">
            {message}
          </div>
        )}
        
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Enter your email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
            <small className="form-text text-muted">
              We'll send a password reset link to this email address.
            </small>
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;