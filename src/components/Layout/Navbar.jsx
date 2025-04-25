// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Navbar = () => {
//   const { isAuthenticated, userRole, user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//       <div className="container">
//         <Link className="navbar-brand" to="/">Course Management System</Link>
        
//         <div className="collapse navbar-collapse justify-content-end">
//           <ul className="navbar-nav">
//             {isAuthenticated ? (
//               <>
//                 <li className="nav-item d-flex align-items-center text-white me-3">
//                   Welcome, {user?.name} ({userRole})
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/dashboard">Dashboard</Link>
//                 </li>
//                 <li className="nav-item">
//                   <button className="btn btn-outline-light ms-2" onClick={handleLogout}>
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/login">Login</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/register">Register</Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





// src/components/Navbar.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { logout, userRole } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <nav className="navbar">
      <div className="logo">Learning Management System</div>
      
      <div className="nav-links">
        {userRole === 'student' && (
          <button onClick={() => navigate('/dashboard/student')}>My Courses</button>
        )}
        
        {(userRole === 'admin' || userRole === 'superadmin') && (
          <>
            <button onClick={() => navigate(`/dashboard/${userRole}`)}>Dashboard</button>
          </>
        )}
        
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;