// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';


// const Navbar = () => {
//   const { logout, userRole, user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const navigateToDashboard = () => {
//     if (userRole === 'student') {
//       navigate('/dashboard/student');
//     } else {
//       navigate(`/dashboard/${userRole}`);
//     }
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">
//           LMS
//         </Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon" />
//         </button>

//         <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
//           <ul className="navbar-nav align-items-center">
//             {user && (
//               <li className="nav-item me-3 text-white">
//                 Welcome, {user.name} <small>({userRole})</small>
//               </li>
//             )}

//             <li className="nav-item">
//               <button className="btn btn-light me-2" onClick={navigateToDashboard}>
//                 Dashboard
//               </button>
//             </li>

//             <li className="nav-item">
//               <button className="btn btn-outline-light" onClick={handleLogout}>
//                 Logout
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Navbar = () => {
  const { logout, userRole, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigateToDashboard = () => {
    if (userRole === 'student') {
      navigate('/dashboard/student');
    } else {
      navigate(`/dashboard/${userRole}`);
    }
    // Close mobile menu after navigation
    setIsNavCollapsed(true);
  };

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          LMS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user && (
              <li className="nav-item py-2 py-lg-0">
                <span className="nav-link text-white">
                  Welcome, {user.name} <small>({userRole})</small>
                </span>
              </li>
            )}
            <li className="nav-item py-2 py-lg-0">
              <button 
                className="btn btn-light w-100" 
                onClick={navigateToDashboard}
              >
                Dashboard
              </button>
            </li>
            <li className="nav-item mt-2 mt-lg-0 ms-lg-2 py-2 py-lg-0">
              <button 
                className="btn btn-outline-light w-100" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;