// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { getAllCourses } from '../../services/courseService';
// // import { getAllUsers } from '../../services/userService';
// // import CourseCard from '../Course/CourseCard';
// // import UserCard from '../User/UserCard';

// // const AdminDashboard = () => {
// //   const [courses, setCourses] = useState([]);
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [activeTab, setActiveTab] = useState('courses');

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const [coursesData, usersData] = await Promise.all([
// //           getAllCourses(),
// //           getAllUsers()
// //         ]);
        
// //         setCourses(coursesData);
// //         setUsers(usersData);
// //       } catch (error) {
// //         console.error('Error fetching dashboard data:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   if (loading) {
// //     return <div className="loading">Loading dashboard data...</div>;
// //   }

// //   return (
// //     <div className="admin-dashboard">
// //       <div className="dashboard-header">
// //         <h1>Admin Dashboard</h1>
// //         <div className="dashboard-actions">
// //           <Link to="/courses/create" className="btn btn-primary">
// //             Create Course
// //           </Link>
// //         </div>
// //       </div>

// //       <div className="dashboard-tabs">
// //         <button 
// //           className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
// //           onClick={() => setActiveTab('courses')}
// //         >
// //           Courses ({courses.length})
// //         </button>
// //         <button 
// //           className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
// //           onClick={() => setActiveTab('users')}
// //         >
// //           Users ({users.length})
// //         </button>
// //       </div>

// //       <div className="dashboard-content">
// //         {activeTab === 'courses' ? (
// //           <div className="courses-grid">
// //             {courses.length > 0 ? (
// //               courses.map(course => (
// //                 <CourseCard 
// //                   key={course._id} 
// //                   course={course} 
// //                   isAdmin={true} 
// //                   refreshCourses={() => getAllCourses().then(data => setCourses(data))}
// //                 />
// //               ))
// //             ) : (
// //               <p>No courses available. Create your first course!</p>
// //             )}
// //           </div>
// //         ) : (
// //           <div className="users-grid">
// //             {users.length > 0 ? (
// //               users.map(user => (
// //                 <UserCard 
// //                   key={user._id} 
// //                   user={user} 
// //                   refreshUsers={() => getAllUsers().then(data => setUsers(data))}
// //                 />
// //               ))
// //             ) : (
// //               <p>No users found.</p>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;






// import React, { useState, useEffect } from 'react';
// import api from '../../serviceses/api';

// const AdminDashboard = () => {
//   const [courses, setCourses] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [newCourse, setNewCourse] = useState({ name: '', description: '' });
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [selectedUser, setSelectedUser] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [coursesRes, usersRes] = await Promise.all([
//           api.get('/courses'),
//           api.get('/users')
//         ]);
//         setCourses(coursesRes.data);
//         setUsers(usersRes.data.filter(user => user.role === 'student'));
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load data');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCreateCourse = async (e) => {
//     e.preventDefault();
//     if (!newCourse.name) return;

//     try {
//       const res = await api.post('/courses', newCourse);
//       setCourses([...courses, res.data]);
//       setNewCourse({ name: '', description: '' });
//     } catch (err) {
//       setError('Failed to create course');
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await api.delete(`/users/${userId}`);
//         setUsers(users.filter(user => user._id !== userId));
//       } catch (err) {
//         setError('Failed to delete user');
//       }
//     }
//   };

//   const handleEnrollStudent = async (e) => {
//     e.preventDefault();
//     if (!selectedCourse || !selectedUser) return;

//     try {
//       await api.post(`/courses/${selectedCourse}/enroll/${selectedUser}`);
//       const [coursesRes, usersRes] = await Promise.all([
//         api.get('/courses'),
//         api.get('/users')
//       ]);
//       setCourses(coursesRes.data);
//       setUsers(usersRes.data.filter(user => user.role === 'student'));
//     } catch (err) {
//       setError('Failed to enroll student');
//     }
//   };

//   const handleUnenrollStudent = async (courseId, userId) => {
//     try {
//       await api.post(`/courses/${courseId}/unenroll/${userId}`);
//       const coursesRes = await api.get('/courses');
//       setCourses(coursesRes.data);
//     } catch (err) {
//       setError('Failed to unenroll student');
//     }
//   };

//   if (loading) return <div className="text-center mt-5">Loading data...</div>;
//   if (error) return <div className="alert alert-danger text-center mt-4">Error: {error}</div>;

//   return (
//     <div className="container py-4">
//       <h2 className="mb-4 text-center">Admin Dashboard</h2>

//       {/* Create Course Form */}
//       <div className="card mb-4">
//         <div className="card-header">Create New Course</div>
//         <div className="card-body">
//           <form onSubmit={handleCreateCourse}>
//             <div className="mb-3">
//               <label className="form-label">Course Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={newCourse.name}
//                 onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Description</label>
//               <textarea
//                 className="form-control"
//                 value={newCourse.description}
//                 onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
//               />
//             </div>
//             <button type="submit" className="btn btn-primary">Create Course</button>
//           </form>
//         </div>
//       </div>

//       {/* Enroll Student Form */}
//       <div className="card mb-4">
//         <div className="card-header">Enroll Student</div>
//         <div className="card-body">
//           <form onSubmit={handleEnrollStudent}>
//             <div className="mb-3">
//               <label className="form-label">Course</label>
//               <select
//                 className="form-select"
//                 value={selectedCourse}
//                 onChange={(e) => setSelectedCourse(e.target.value)}
//                 required
//               >
//                 <option value="">Select a course</option>
//                 {courses.map(course => (
//                   <option key={course._id} value={course._id}>{course.name}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Student</label>
//               <select
//                 className="form-select"
//                 value={selectedUser}
//                 onChange={(e) => setSelectedUser(e.target.value)}
//                 required
//               >
//                 <option value="">Select a student</option>
//                 {users.map(user => (
//                   <option key={user._id} value={user._id}>{user.name} ({user.email})</option>
//                 ))}
//               </select>
//             </div>
//             <button type="submit" className="btn btn-success">Enroll Student</button>
//           </form>
//         </div>
//       </div>

//       {/* Courses List */}
//       <div className="mb-4">
//         <h3>All Courses</h3>
//         {courses.length === 0 ? (
//           <p>No courses available.</p>
//         ) : (
//           courses.map(course => (
//             <div key={course._id} className="card mb-3">
//               <div className="card-body">
//                 <h5 className="card-title">{course.name}</h5>
//                 <p className="card-text">{course.description}</p>
//                 <h6>Enrolled Students:</h6>
//                 {course.students?.length > 0 ? (
//                   <ul className="list-group list-group-flush">
//                     {course.students.map(student => (
//                       <li key={student._id} className="list-group-item d-flex justify-content-between align-items-center">
//                         {student.name} ({student.email})
//                         <button
//                           className="btn btn-sm btn-danger"
//                           onClick={() => handleUnenrollStudent(course._id, student._id)}
//                         >
//                           Unenroll
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>No students enrolled</p>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Users List */}
//       <div className="mb-4">
//         <h3>All Students</h3>
//         {users.length === 0 ? (
//           <p>No students registered.</p>
//         ) : (
//           <div className="table-responsive">
//             <table className="table table-bordered table-striped">
//               <thead className="table-light">
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map(user => (
//                   <tr key={user._id}>
//                     <td>{user.name}</td>
//                     <td>{user.email}</td>
//                     <td>
//                       <button
//                         className="btn btn-sm btn-outline-danger"
//                         onClick={() => handleDeleteUser(user._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;








// src/pages/AdminDashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { userService, courseService } from '../apis/Index';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../Layout/Navbar';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Course form state
  const [courseForm, setCourseForm] = useState({
    name: '',
    description: ''
  });
  
  // Selected student and course for enrollment
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedUsers, fetchedCourses] = await Promise.all([
          userService.getAllUsers(),
          courseService.getCourses()
        ]);
        
        // Filter out non-student users for enrollment dropdown
        setUsers(fetchedUsers);
        setCourses(fetchedCourses);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    
    if (!courseForm.name) {
      setError('Course name is required');
      return;
    }
    
    try {
      const newCourse = await courseService.createCourse(courseForm);
      setCourses([...courses, newCourse]);
      setCourseForm({ name: '', description: '' });
    } catch (err) {
      setError('Failed to create course');
      console.error(err);
    }
  };
  
  const handleEnrollStudent = async (e) => {
    e.preventDefault();
    
    if (!selectedStudent || !selectedCourse) {
      setError('Please select both a student and a course');
      return;
    }
    
    try {
      await courseService.enrollStudent(selectedCourse, selectedStudent);
      
      // Refresh course list to show updated enrollment
      const updatedCourses = await courseService.getCourses();
      setCourses(updatedCourses);
      
      setSelectedStudent('');
      setSelectedCourse('');
    } catch (err) {
      setError('Failed to enroll student');
      console.error(err);
    }
  };
  
  const handleUnenrollStudent = async (courseId, userId) => {
    try {
      await courseService.unenrollStudent(courseId, userId);
      
      // Refresh course list to show updated enrollment
      const updatedCourses = await courseService.getCourses();
      setCourses(updatedCourses);
    } catch (err) {
      setError('Failed to unenroll student');
      console.error(err);
    }
  };
  
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    
    try {
      await userService.deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      setError('Failed to delete user');
      console.error(err);
    }
  };
  
  if (loading) {
    return <div>Loading dashboard...</div>;
  }
  
  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="dashboard-content">
        <h1>Admin Dashboard</h1>
        <div className="user-info">
          <h2>Welcome, {user?.name}</h2>
          <p>Email: {user?.email}</p>
          <p>Role: Admin</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="admin-sections">
          <div className="section">
            <h3>Create New Course</h3>
            <form onSubmit={handleCreateCourse}>
              <div className="form-group">
                <label>Course Name</label>
                <input
                  type="text"
                  value={courseForm.name}
                  onChange={e => setCourseForm({...courseForm, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={courseForm.description}
                  onChange={e => setCourseForm({...courseForm, description: e.target.value})}
                />
              </div>
              
              <button type="submit">Create Course</button>
            </form>
          </div>
          
          <div className="section">
            <h3>Enroll Student</h3>
            <form onSubmit={handleEnrollStudent}>
              <div className="form-group">
                <label>Select Student</label>
                <select
                  value={selectedStudent}
                  onChange={e => setSelectedStudent(e.target.value)}
                  required
                >
                  <option value="">-- Select Student --</option>
                  {users
                    .filter(user => user.role === 'student')
                    .map(student => (
                      <option key={student._id} value={student._id}>
                        {student.name} ({student.email})
                      </option>
                    ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Select Course</label>
                <select
                  value={selectedCourse}
                  onChange={e => setSelectedCourse(e.target.value)}
                  required
                >
                  <option value="">-- Select Course --</option>
                  {courses.map(course => (
                    <option key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <button type="submit">Enroll</button>
            </form>
          </div>
        </div>
        
        <div className="section">
          <h3>Manage Courses</h3>
          {courses.length === 0 ? (
            <p>No courses available</p>
          ) : (
            <div className="courses-list">
              {courses.map(course => (
                <div key={course._id} className="course-detail-card">
                  <h4>{course.name}</h4>
                  <p>{course.description}</p>
                  
                  <div className="enrolled-students">
                    <h5>Enrolled Students ({course.students?.length || 0})</h5>
                    {course.students?.length > 0 ? (
                      <ul>
                 // src/pages/AdminDashboard.js (continued)
                        {course.students.map(student => (
                          <li key={student._id}>
                            {student.name} ({student.email})
                            <button
                              onClick={() => handleUnenrollStudent(course._id, student._id)}
                              className="small-button"
                            >
                              Unenroll
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No students enrolled</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="section">
          <h3>Manage Users</h3>
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      {u.role !== 'admin' && u.role !== 'superadmin' && (
                        <button 
                          onClick={() => handleDeleteUser(u._id)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;