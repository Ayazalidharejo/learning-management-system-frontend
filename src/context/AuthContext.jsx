// import { createContext, useState, useContext, useEffect } from 'react';
// import api from '../serviceses/api';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Check if user is authenticated on page load
//   useEffect(() => {
//     const loadUser = async () => {
//       if (token) {
//         try {
//           const res = await api.get('/auth/me');
//           setUser(res.data);
//           setLoading(false);
//         } catch (err) {
//           console.error('Failed to load user', err);
//           logout();
//           setLoading(false);
//         }
//       } else {
//         setLoading(false);
//       }
//     };

//     loadUser();
//   }, [token]);

//   // Register user
//   const register = async (userData) => {
//     try {
//       setError(null);
//       const res = await api.post('/auth/register', userData);
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('userRole', res.data.role);
//       setToken(res.data.token);
//       setUserRole(res.data.role);
//       await loadUser();
//       return { success: true };
//     } catch (err) {
//       setError(err.response?.data?.msg || 'Registration failed');
//       return { success: false, error: err.response?.data?.msg || 'Registration failed' };
//     }
//   };

//   // Login user
//   const login = async (email, password) => {
//     try {
//       setError(null);
//       const res = await api.post('/auth/login', { email, password });
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('userRole', res.data.role);
//       setToken(res.data.token);
//       setUserRole(res.data.role);
//       await loadUser();
//       return { success: true };
//     } catch (err) {
//       setError(err.response?.data?.msg || 'Login failed');
//       return { success: false, error: err.response?.data?.msg || 'Login failed' };
//     }
//   };

//   // Load user data
//   const loadUser = async () => {
//     if (token) {
//       try {
//         const res = await api.get('/auth/me');
//         setUser(res.data);
//       } catch (err) {
//         console.error('Failed to load user', err);
//         logout();
//       }
//     }
//   };

//   // Logout user
//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userRole');
//     setToken(null);
//     setUserRole(null);
//     setUser(null);
//   };

//   // Forgot password
//   const forgotPassword = async (email) => {
//     try {
//       setError(null);
//       await api.post('/auth/forgot-password', { email });
//       return { success: true };
//     } catch (err) {
//       setError(err.response?.data?.message || 'Error sending reset email');
//       return { success: false, error: err.response?.data?.message || 'Error sending reset email' };
//     }
//   };

//   // Verify reset token
//   const verifyResetToken = async (token) => {
//     try {
//       const res = await api.get(`/auth/verify-reset-token/${token}`);
//       return { valid: res.data.valid };
//     } catch (err) {
//       return { valid: false };
//     }
//   };

//   // Reset password
//   const resetPassword = async (token, password, confirmPassword) => {
//     try {
//       setError(null);
//       await api.post(`/auth/reset-password/${token}`, { 
//         password, 
//         confirmPassword 
//       });
//       return { success: true };
//     } catch (err) {
//       setError(err.response?.data?.message || 'Error resetting password');
//       return { 
//         success: false, 
//         error: err.response?.data?.message || 'Error resetting password' 
//       };
//     }
//   };

//   const value = {
//     user,
//     token,
//     userRole,
//     loading,
//     error,
//     isAuthenticated: !!token,
//     register,
//     login,
//     logout,
//     forgotPassword,
//     verifyResetToken,
//     resetPassword
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };





















// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          // Setup axios with token
          axios.defaults.headers.common['x-auth-token'] = token;
          
          // Get user data
          const res = await axios.get('https://learning-management-system-backend-code.vercel.app/api/auth/me');
          setUser(res.data);
        } catch (err) {
          console.error('Authentication error:', err);
          // Clear invalid token
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post('https://learning-management-system-backend-code.vercel.app/api/auth/login', {
        email,
        password
      });

      const { token, role } = res.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['x-auth-token'] = token;
      setToken(token);
      
      return { success: true, role };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.msg || 'Login failed'
      };
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post('https://learning-management-system-backend-code.vercel.app/api/auth/register', userData);
      
      const { token, role } = res.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['x-auth-token'] = token;
      setToken(token);
      
      return { success: true, role };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.msg || 'Registration failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;
  const userRole = user?.role || null;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated,
        userRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};