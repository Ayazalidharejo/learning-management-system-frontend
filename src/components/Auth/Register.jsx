// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: 'student',
//     accessKey: ''
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
  
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (formErrors[e.target.name]) {
//       setFormErrors({ ...formErrors, [e.target.name]: '' });
//     }
//   };

//   const validate = () => {
//     const errors = {};
//     if (!formData.name) errors.name = 'Name is required';
//     if (!formData.email) errors.email = 'Email is required';
//     if (!formData.password) errors.password = 'Password is required';
//     if (formData.password !== formData.confirmPassword) {
//       errors.confirmPassword = 'Passwords do not match';
//     }
//     if (formData.role !== 'student' && !formData.accessKey) {
//       errors.accessKey = 'Access key is required for admin roles';
//     }
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
//       const result = await register(formData);
//       if (result.success) {
//         navigate('/dashboard');
//       } else {
//         setFormErrors({ general: result.error });
//       }
//     } catch (error) {
//       setFormErrors({ general: 'Registration failed. Please try again.' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <h2 className="text-center mb-4">Register</h2>
//           <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
            
//             {formErrors.general && (
//               <div className="alert alert-danger">{formErrors.general}</div>
//             )}

//             <div className="mb-3">
//               <label className="form-label">Name</label>
//               <input 
//                 type="text" 
//                 name="name" 
//                 className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
//                 value={formData.name} 
//                 onChange={handleChange} 
//               />
//               {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
//             </div>

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

//             <div className="mb-3">
//               <label className="form-label">Confirm Password</label>
//               <input 
//                 type="password" 
//                 name="confirmPassword" 
//                 className={`form-control ${formErrors.confirmPassword ? 'is-invalid' : ''}`}
//                 value={formData.confirmPassword} 
//                 onChange={handleChange} 
//               />
//               {formErrors.confirmPassword && <div className="invalid-feedback">{formErrors.confirmPassword}</div>}
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Role</label>
//               <select 
//                 name="role" 
//                 className="form-select"
//                 value={formData.role} 
//                 onChange={handleChange}
//               >
//                 <option value="student">Student</option>
//                 <option value="admin">Admin</option>
//                 <option value="superadmin">Super Admin</option>
//               </select>
//             </div>

//             {formData.role !== 'student' && (
//               <div className="mb-3">
//                 <label className="form-label">Access Key</label>
//                 <input 
//                   type="text" 
//                   name="accessKey" 
//                   className={`form-control ${formErrors.accessKey ? 'is-invalid' : ''}`}
//                   value={formData.accessKey} 
//                   onChange={handleChange}
//                   placeholder="Required for admin roles"
//                 />
//                 {formErrors.accessKey && <div className="invalid-feedback">{formErrors.accessKey}</div>}
//               </div>
//             )}

//             <div className="d-grid mb-3">
//               <button type="submit" className="btn btn-primary" disabled={isLoading}>
//                 {isLoading ? 'Registering...' : 'Register'}
//               </button>
//             </div>

//             <div className="text-center">
//               Already have an account? <Link to="/login">Login here</Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;





import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    accessKey: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const { name, email, password, confirmPassword, role, accessKey } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const userData = { name, email, password, role };

      if (role === 'admin' || role === 'superadmin') {
        if (!accessKey) {
          setError(`Access key is required for ${role} role`);
          setLoading(false);
          return;
        }
        userData.accessKey = accessKey;
      }

      const result = await register(userData);

      if (result.success) {
        if (result.role === 'student') navigate('/dashboard/student');
        else if (result.role === 'admin') navigate('/dashboard/admin');
        else if (result.role === 'superadmin') navigate('/dashboard/superadmin');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="text-center mb-4">Register</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={onChange}
              required
              placeholder="Enter your full name"
            />
          </div>

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
              minLength="6"
              placeholder="Create a password"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              required
              minLength="6"
              placeholder="Re-enter password"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              name="role"
              value={role}
              onChange={onChange}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>

          {(role === 'admin' || role === 'superadmin') && (
            <div className="mb-3">
              <label className="form-label">Access Key</label>
              <input
                type="text"
                className="form-control"
                name="accessKey"
                value={accessKey}
                onChange={onChange}
                required
                placeholder={`Enter ${role} access key`}
              />
              <div className="form-text">
                {role === 'admin'
                  ? 'Admin key: admin123'
                  : 'Super Admin key: superadmin123'}
              </div>
            </div>
          )}

          <div className="d-grid">
            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        <div className="mt-3 text-center">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
