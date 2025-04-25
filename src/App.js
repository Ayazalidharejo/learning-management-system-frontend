
// // export default App;
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import axios from 'axios';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// // Components
// import Navbar from './components/Navbar';
// import Register from './components/Register';
// import Login from './components/Login';
// import StudentDashboard from './components/StudentDashboard';
// import AdminDashboard from './components/AdminDashboard';
// import SuperadminDashboard from './components/SuperadminDashboard';
// import PrivateRoute from './components/PrivateRoute';
// import ForgetPassword from './components/ForgetPassword';
// import ResetPassword from './components/ResetPassword';

// function App() {
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [role, setRole] = useState(localStorage.getItem('role'));
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadUser = async () => {
//       if (token) {
//         try {
//           axios.defaults.headers.common['x-auth-token'] = token;

//           // ✅ Correct backend endpoint
//           const res = await axios.get('http://localhost:5000/api/user');

//           console.log('✅ Token valid, user role:', res.data.role);
//           setRole(res.data.role);
//           setIsAuthenticated(true);
//         } catch (err) {
//           console.error('❌ Token verification failed:', err.response?.data || err.message);
//           localStorage.removeItem('token');
//           localStorage.removeItem('role');
//           setToken(null);
//           setRole(null);
//           setIsAuthenticated(false);
//         }
//       }
//       setLoading(false);
//     };

//     loadUser();
//   }, [token]);

//   const login = (token, role) => {
//     localStorage.setItem('token', token);
//     localStorage.setItem('role', role);
//     setToken(token);
//     setRole(role);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     setToken(null);
//     setRole(null);
//     setIsAuthenticated(false);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Router>
//       <div className="App">
//         <Navbar isAuthenticated={isAuthenticated} logout={logout} role={role} />
//         <div className="container">
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 isAuthenticated ? (
//                   role === 'student' ? (
//                     <Navigate to="/student-dashboard" />
//                   ) : role === 'admin' ? (
//                     <Navigate to="/admin-dashboard" />
//                   ) : (
//                     <Navigate to="/superadmin-dashboard" />
//                   )
//                 ) : (
//                   <Navigate to="/login" />
//                 )
//               }
//             />
//             <Route path="/register" element={<Register login={login} />} />
//             <Route path="/login" element={<Login login={login} />} />
//             <Route path="/forget-password" element={<ForgetPassword />} />
//             <Route path="/reset-password/:token" element={<ResetPassword />} />

//             <Route
//               path="/student-dashboard"
//               element={
//                 <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="student">
//                   <StudentDashboard />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/admin-dashboard"
//               element={
//                 <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="admin">
//                   <AdminDashboard />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/superadmin-dashboard"
//               element={
//                 <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="superadmin">
//                   <SuperadminDashboard />
//                 </PrivateRoute>
//               }
//             />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;










// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './components/Layout/Navbar';
// import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import ForgotPassword from './components/Auth/ForgotPassword';
// import ResetPassword from './components/Auth/ResetPassword';
// import StudentDashboard from './components/Dashboard/StudentDashboard';
// import AdminDashboard from './components/Dashboard/AdminDashboard';
// import PrivateRoute from './components/Layout/PrivateRoute';
// import { useAuth } from './context/AuthContext';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   const { isAuthenticated, userRole } = useAuth();
  
//   return (
//     <Router>
//       <Navbar />
//       <div className="container">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//           <Route 
//             path="/dashboard" 
//             element={
//               <PrivateRoute>
//                 {userRole === 'student' ? <StudentDashboard /> : <AdminDashboard />}
//               </PrivateRoute>
//             } 
//           />
//           <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;























// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import SuperAdminDashboard from './components/Dashboard/SuperAdmin';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';

// Components
import PrivateRoute from './components/Layout/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          
          {/* Private Routes */}
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="student" element={<StudentDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="superadmin" element={<SuperAdminDashboard />} />
          </Route>
          
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;