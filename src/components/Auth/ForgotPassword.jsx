// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
  
//   const { forgotPassword } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email) {
//       setError('Email is required');
//       return;
//     }

//     setIsLoading(true);
//     setError('');
//     setMessage('');
    
//     try {
//       const result = await forgotPassword(email);
//       if (result.success) {
//         setMessage('Password reset email sent. Please check your inbox.');
//       } else {
//         setError(result.error);
//       }
//     } catch (err) {
//       setError('Failed to send reset email. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <h2 className="text-center mb-4">Forgot Password</h2>
//           <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">

//             {message && <div className="alert alert-success">{message}</div>}
//             {error && <div className="alert alert-danger">{error}</div>}

//             <div className="mb-3">
//               <label className="form-label">Email</label>
//               <input 
//                 type="email" 
//                 className={`form-control ${error && !email ? 'is-invalid' : ''}`}
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)} 
//                 placeholder="Enter your email" 
//               />
//               {error && !email && <div className="invalid-feedback">Email is required</div>}
//             </div>

//             <div className="d-grid mb-3">
//               <button type="submit" className="btn btn-primary" disabled={isLoading}>
//                 {isLoading ? 'Sending...' : 'Send Reset Link'}
//               </button>
//             </div>

//             <div className="text-center">
//               <Link to="/login">Back to Login</Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;






// src/pages/ForgotPassword.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>
      
      {message && <div className="message">{message}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      
      <div className="links">
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;