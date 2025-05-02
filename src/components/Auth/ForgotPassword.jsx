
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

  // Make sure this matches your backend URL exactly
  const API_BASE_URL = 'https://learning-management-system-backend-code-aiqn.vercel.app/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const requestUrl = `${API_BASE_URL}/auth/forgot-password`;
      console.log('Making forgot password request to:', requestUrl);
      
      const res = await axios.post(requestUrl, { email });
      console.log('Forgot password response:', res.data);
      setMessage(res.data.message);
    } catch (err) {
      console.error('Forgot password error:', err);
      
      if (err.response) {
        console.log('Error response data:', err.response.data);
        console.log('Error response status:', err.response.status);
        setError(err.response.data.message || 'Something went wrong. Please try again.');
      } else if (err.request) {
        console.log('Error request:', err.request);
        setError('No response received from server. Please check your network connection.');
      } else {
        console.log('Error message:', err.message);
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
          <div className="alert alert-info text-center" role="alert">
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