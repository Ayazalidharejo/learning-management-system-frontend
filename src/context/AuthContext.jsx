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
       
          axios.defaults.headers.common['x-auth-token'] = token;
          
          // Get user data
          const res = await axios.get('https://learning-management-system-backend-code.vercel.app/api/auth/me');
          setUser(res.data);
        } catch (err) {
          console.error('Authentication error:', err);
        
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