// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
  
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (formErrors[e.target.name]) {
//       setFormErrors({ ...formErrors, [e.target.name]: '' });
//     }
//   };

//   const validate = () => {
//     const errors = {};
//     if (!formData.email) errors.email = 'Email is required';
//     if (!formData.password) errors.password = 'Password is required';
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validate();
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const result = await login(formData.email, formData.password);
//       if (result.success) {
//         navigate('/dashboard');
//       } else {
//         setFormErrors({ general: result.error });
//       }
//     } catch (error) {
//       setFormErrors({ general: 'Login failed. Please try again.' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <h2 className="text-center mb-4">Login</h2>
//           <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
            
//             {formErrors.general && (
//               <div className="alert alert-danger">{formErrors.general}</div>
//             )}

//             <div className="mb-3">
//               <label className="form-label">Email</label>
//               <input 
//                 type="email" 
//                 name="email" 
//                 className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
//                 value={formData.email} 
//                 onChange={handleChange} 
//               />
//               {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Password</label>
//               <input 
//                 type="password" 
//                 name="password" 
//                 className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
//                 value={formData.password} 
//                 onChange={handleChange} 
//               />
//               {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
//             </div>

//             <div className="d-grid mb-3">
//               <button type="submit" className="btn btn-primary" disabled={isLoading}>
//                 {isLoading ? 'Logging in...' : 'Login'}
//               </button>
//             </div>

//             <div className="text-center mb-2">
//               <Link to="/forgot-password">Forgot Password?</Link>
//             </div>

//             <div className="text-center">
//               Don't have an account? <Link to="/register">Register here</Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;





import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        if (result.role === 'student') {
          navigate('/dashboard/student');
        } else if (result.role === 'admin') {
          navigate('/dashboard/admin');
        } else if (result.role === 'superadmin') {
          navigate('/dashboard/superadmin');
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={onChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="mt-3 text-center">
          <Link to="/forgot-password" className="d-block mb-2">
            Forgot Password?
          </Link>
          <Link to="/register">Don't have an account? Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
