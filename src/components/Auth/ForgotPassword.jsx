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





import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post('https://learning-management-system-backend-code.vercel.app/api/auth/forgot-password', { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong. Please try again.');
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
