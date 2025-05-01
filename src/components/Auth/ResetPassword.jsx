// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const ResetPassword = () => {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isTokenValid, setIsTokenValid] = useState(false);
//   const [isTokenChecking, setIsTokenChecking] = useState(true);
  
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const { verifyResetToken, resetPassword } = useAuth();

//   useEffect(() => {
//     const checkToken = async () => {
//       try {
//         const result = await verifyResetToken(token);
//         setIsTokenValid(result.valid);
//       } catch (err) {
//         setIsTokenValid(false);
//       } finally {
//         setIsTokenChecking(false);
//       }
//     };

//     checkToken();
//   }, [token, verifyResetToken]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!password) return setError('Password is required');
//     if (password.length < 6) return setError('Password must be at least 6 characters');
//     if (password !== confirmPassword) return setError('Passwords do not match');

//     setIsLoading(true);
//     setError('');
//     setMessage('');

//     try {
//       const result = await resetPassword(token, password, confirmPassword);
//       if (result.success) {
//         setMessage('Password reset successful! Redirecting to login...');
//         setTimeout(() => navigate('/login'), 3000);
//       } else {
//         setError(result.error);
//       }
//     } catch (err) {
//       setError('Failed to reset password. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isTokenChecking) {
//     return <div className="text-center mt-5">Validating your reset link...</div>;
//   }

//   if (!isTokenValid) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-danger text-center">
//           <h4>Invalid or Expired Link</h4>
//           <p>Your password reset link is invalid or has expired.</p>
//           <Link to="/forgot-password" className="btn btn-link">Request a new password reset link</Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <h2 className="text-center mb-4">Reset Password</h2>
//           <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">

//             {message && <div className="alert alert-success">{message}</div>}
//             {error && <div className="alert alert-danger">{error}</div>}

//             <div className="mb-3">
//               <label className="form-label">New Password</label>
//               <input 
//                 type="password" 
//                 className={`form-control ${error && !password ? 'is-invalid' : ''}`}
//                 value={password} 
//                 onChange={(e) => setPassword(e.target.value)} 
//                 placeholder="Enter new password" 
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Confirm Password</label>
//               <input 
//                 type="password" 
//                 className={`form-control ${error && password !== confirmPassword ? 'is-invalid' : ''}`}
//                 value={confirmPassword} 
//                 onChange={(e) => setConfirmPassword(e.target.value)} 
//                 placeholder="Confirm new password" 
//               />
//             </div>

//             <div className="d-grid mb-3">
//               <button type="submit" className="btn btn-primary" disabled={isLoading}>
//                 {isLoading ? 'Resetting...' : 'Reset Password'}
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

// export default ResetPassword;








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

  const { password, confirmPassword } = formData;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.get(`earning-management-system-backend-code.vercel.app/api/auth/verify-reset-token/${token}`);
        
        setTokenValid(res.data.valid);
      } catch (err) {
        setError('Invalid or expired token');
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

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

    setLoading(true);

    try {
      const res = await axios.post(`https://learning-management-system-backend-code-aiqn.vercel.app/api/auth/reset-password/${token}`, {
        password,
        confirmPassword
      });

      setMessage(res.data.message);

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Verifying...</span>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="card p-4 shadow" style={{ maxWidth: '450px', width: '100%' }}>
          <h3 className="text-center mb-3">Reset Password</h3>
          <div className="alert alert-danger text-center">{error}</div>
          <div className="text-center">
            <Link to="/forgot-password">Request a new reset link</Link>
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
