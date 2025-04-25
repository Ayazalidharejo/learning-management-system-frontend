// import React, { useState, useEffect } from 'react';
// import api from '../../serviceses/api';
// import CourseItem from './CourseItem';

// const StudentDashboard = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await api.get('/courses');
//         setCourses(res.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load courses');
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   if (loading) return <div className="text-center mt-5">Loading courses...</div>;
//   if (error) return <div className="alert alert-danger text-center mt-4">Error: {error}</div>;

//   return (
//     <div className="container py-4">
//       <div className="text-center mb-4">
//         <h2>Student Dashboard</h2>
//         <h4 className="text-muted">My Courses</h4>
//       </div>

//       {courses.length === 0 ? (
//         <div className="alert alert-info text-center">
//           You are not enrolled in any courses yet.
//         </div>
//       ) : (
//         <div className="row">
//           {courses.map(course => (
//             <div className="col-md-6 col-lg-4 mb-4" key={course._id}>
//               <div className="card h-100 shadow-sm">
//                 <div className="card-body d-flex flex-column">
//                   <h5 className="card-title">{course.name}</h5>
//                   <p className="card-text">{course.description || "No description available."}</p>
//                   {/* If CourseItem has additional UI, use <CourseItem course={course} /> instead */}
//                   {/* Example usage, replace card content with <CourseItem /> if you want custom layout */}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentDashboard;






// src/pages/StudentDashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { courseService } from '../apis/Index';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../Layout/Navbar';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user, logout } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await courseService.getCourses();
        setCourses(fetchedCourses);
      } catch (err) {
        setError('Failed to load your courses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);
  
  if (loading) {
    return <div>Loading courses...</div>;
  }
  
  return (
    <div className="student-dashboard">
      <Navbar />
      <div className="dashboard-content">
        <h1>Student Dashboard</h1>
        <div className="user-info">
          <h2>Welcome, {user?.name}</h2>
          <p>Email: {user?.email}</p>
          <p>Role: Student</p>
        </div>
        
        <div className="courses-section">
          <h3>Your Enrolled Courses</h3>
          
          {error && <div className="error-message">{error}</div>}
          
          {courses.length === 0 ? (
            <p>You are not enrolled in any courses yet.</p>
          ) : (
            <div className="courses-list">
              {courses.map(course => (
                <div key={course._id} className="course-card">
                  <h4>{course.name}</h4>
                  <p>{course.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;