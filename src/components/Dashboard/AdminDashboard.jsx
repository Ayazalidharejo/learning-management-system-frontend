import React, { useState, useEffect, useContext } from 'react';
import { userService, courseService } from '../apis/Index';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../Layout/Navbar';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [courseForm, setCourseForm] = useState({ name: '', description: '' });
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
      const updatedCourses = await courseService.getCourses();
      setCourses(updatedCourses);
    } catch (err) {
      setError('Failed to unenroll student');
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await userService.deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      setError('Failed to delete user');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading dashboard...</div>;

  return (



//     <div className="admin-dashboard bg-light min-vh-100">
//   <Navbar />
//   <div className="container py-5">
//     <div className="card shadow-lg border-0 mb-5">
//       <div className="card-header bg-dark text-white p-4">
//         <h1 className="text-center mb-0 fw-bold">Admin Dashboard</h1>
//       </div>
      
//       <div className="card-body p-4">
//         <div className="bg-light p-4 rounded-3 mb-4 shadow-sm border-start border-5 border-dark">
//           <h4 className="text-dark fw-bold">Welcome, {user?.name}</h4>
//           <div className="d-flex gap-4 mt-2">
//             <p className="mb-0"><i className="bi bi-envelope-fill me-2"></i>Email: {user?.email}</p>
//             <p className="mb-0"><i className="bi bi-person-badge-fill me-2"></i>Role: <span className="badge bg-dark">Admin</span></p>
//           </div>
//         </div>

//         {error && <div className="alert alert-danger p-3 shadow-sm">{error}</div>}

//         <div className="row g-4">
//           <div className="col-md-6">
//             <div className="card shadow-sm border-0 h-100">
//               <div className="card-header bg-gradient bg-primary bg-opacity-75 text-white">
//                 <h5 className="mb-0"><i className="bi bi-plus-circle me-2"></i>Create New Course</h5>
//               </div>
//               <div className="card-body">
//                 <form onSubmit={handleCreateCourse}>
//                   <div className="mb-3">
//                     <label className="form-label fw-bold">Course Name</label>
//                     <input
//                       type="text"
//                       className="form-control form-control-lg"
//                       value={courseForm.name}
//                       onChange={e => setCourseForm({ ...courseForm, name: e.target.value })}
//                       placeholder="Enter course name"
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label fw-bold">Description</label>
//                     <textarea
//                       className="form-control"
//                       rows="4"
//                       value={courseForm.description}
//                       onChange={e => setCourseForm({ ...courseForm, description: e.target.value })}
//                       placeholder="Enter course description"
//                     />
//                   </div>
//                   <button type="submit" className="btn btn-primary btn-lg w-100">
//                     <i className="bi bi-plus-lg me-2"></i>Create Course
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-6">
//             <div className="card shadow-sm border-0 h-100">
//               <div className="card-header bg-gradient bg-success bg-opacity-75 text-white">
//                 <h5 className="mb-0"><i className="bi bi-person-plus me-2"></i>Enroll Student</h5>
//               </div>
//               <div className="card-body">
//                 <form onSubmit={handleEnrollStudent}>
//                   <div className="mb-3">
//                     <label className="form-label fw-bold">Select Student</label>
//                     <select
//                       className="form-select form-select-lg"
//                       value={selectedStudent}
//                       onChange={e => setSelectedStudent(e.target.value)}
//                       required
//                     >
//                       <option value="">-- Select Student --</option>
//                       {users.filter(user => user.role === 'student').map(student => (
//                         <option key={student._id} value={student._id}>
//                           {student.name} ({student.email})
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label fw-bold">Select Course</label>
//                     <select
//                       className="form-select form-select-lg"
//                       value={selectedCourse}
//                       onChange={e => setSelectedCourse(e.target.value)}
//                       required
//                     >
//                       <option value="">-- Select Course --</option>
//                       {courses.map(course => (
//                         <option key={course._id} value={course._id}>
//                           {course.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <button type="submit" className="btn btn-success btn-lg w-100">
//                     <i className="bi bi-check-circle me-2"></i>Enroll Student
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-5">
//           <div className="card shadow-sm border-0">
//             <div className="card-header bg-gradient bg-info bg-opacity-75 text-white d-flex justify-content-between align-items-center">
//               <h5 className="mb-0"><i className="bi bi-journals me-2"></i>Manage Courses</h5>
//               <span className="badge bg-white text-info fs-6">{courses.length} Courses</span>
//             </div>
//             <div className="card-body p-4">
//               {courses.length === 0 ? (
//                 <div className="alert alert-info text-center py-4">
//                   <i className="bi bi-info-circle fs-1 d-block mb-3"></i>
//                   <p className="mb-0">No courses available</p>
//                 </div>
//               ) : (
//                 <div className="row g-4">
//                   {courses.map(course => (
//                     <div className="col-md-6 mb-3" key={course._id}>
//                       <div className="card h-100 shadow-sm border-0 hover-shadow">
//                         <div className="card-header bg-dark bg-opacity-10 py-3">
//                           <h5 className="card-title text-dark mb-0 fw-bold">{course.name}</h5>
//                         </div>
//                         <div className="card-body">
//                           <p className="card-text text-muted">{course.description || 'No description provided'}</p>
//                           <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
//                             <h6 className="fw-bold mb-0">
//                               <i className="bi bi-people-fill me-2"></i>
//                               Enrolled Students
//                             </h6>
//                             <span className="badge bg-dark rounded-pill">{course.students?.length || 0}</span>
//                           </div>
//                           {course.students?.length > 0 ? (
//                             <ul className="list-group list-group-flush mt-3">
//                               {course.students.map(student => (
//                                 <li key={student._id} className="list-group-item d-flex justify-content-between align-items-center border-0 bg-light mb-2 rounded py-3">
//                                   <div>
//                                     <i className="bi bi-person-circle me-2 text-dark"></i>
//                                     {student.name}
//                                     <small className="text-muted d-block">{student.email}</small>
//                                   </div>
//                                   <button
//                                     className="btn btn-danger btn-sm"
//                                     onClick={() => handleUnenrollStudent(course._id, student._id)}
//                                   >
//                                     <i className="bi bi-person-x me-1"></i>Unenroll
//                                   </button>
//                                 </li>
//                               ))}
//                             </ul>
//                           ) : (
//                             <div className="alert alert-light text-center mt-3 mb-0">
//                               <i className="bi bi-emoji-neutral me-2"></i>No students enrolled
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="mt-5">
//           <div className="card shadow-sm border-0">
//             <div className="card-header bg-gradient bg-secondary bg-opacity-75 text-white d-flex justify-content-between align-items-center">
//               <h5 className="mb-0"><i className="bi bi-people me-2"></i>Manage Users</h5>
//               <span className="badge bg-white text-secondary fs-6">{users.length} Users</span>
//             </div>
//             <div className="card-body p-0">
//               {users.length === 0 ? (
//                 <div className="alert alert-info m-4 text-center">
//                   <i className="bi bi-exclamation-circle fs-1 d-block mb-3"></i>
//                   <p className="mb-0">No users found</p>
//                 </div>
//               ) : (
//                 <div className="table-responsive">
//                   <table className="table table-hover table-bordered mb-0">
//                     <thead className="table-dark">
//                       <tr>
//                         <th scope="col" className="px-4 py-3">Name</th>
//                         <th scope="col" className="px-4 py-3">Email</th>
//                         <th scope="col" className="px-4 py-3">Role</th>
//                         <th scope="col" className="px-4 py-3 text-center">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {users.map(u => (
//                         <tr key={u._id}>
//                           <td className="px-4 py-3 align-middle">
//                             <div className="d-flex align-items-center">
//                               <span className="bg-dark bg-opacity-10 text-dark rounded-circle d-inline-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
//                                 {u.name.charAt(0).toUpperCase()}
//                               </span>
//                               <span className="fw-bold">{u.name}</span>
//                             </div>
//                           </td>
//                           <td className="px-4 py-3 align-middle">{u.email}</td>
//                           <td className="px-4 py-3 align-middle">
//                             <span className={`badge ${
//                               u.role === 'superadmin' ? 'bg-danger' : 
//                               u.role === 'admin' ? 'bg-warning' : 
//                               'bg-info'
//                             }`}>
//                               {u.role}
//                             </span>
//                           </td>
//                           <td className="px-4 py-3 align-middle text-center">
//                             {u.role !== 'admin' && u.role !== 'superadmin' && (
//                               <button
//                                 className="btn btn-outline-danger btn-sm"
//                                 onClick={() => handleDeleteUser(u._id)}
//                               >
//                                 <i className="bi bi-trash me-1"></i>Delete
//                               </button>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>


<div className="admin-dashboard bg-light min-vh-100">
  <Navbar />
  <div className="container-fluid container-lg py-3 py-md-4 py-lg-5">
    <div className="card shadow-lg border-0 mb-4 mb-lg-5">
      <div className="card-header bg-dark text-white p-3 p-md-4">
        <h1 className="text-center mb-0 fw-bold fs-3 fs-md-2 fs-lg-1">Admin Dashboard</h1>
      </div>
      
      <div className="card-body p-3 p-md-4">
        <div className="bg-light p-3 p-md-4 rounded-3 mb-4 shadow-sm border-start border-5 border-dark">
          <h4 className="text-dark fw-bold">Welcome, {user?.name}</h4>
          <div className="d-flex flex-column flex-md-row gap-2 gap-md-4 mt-2">
            <p className="mb-1 mb-md-0"><i className="bi bi-envelope-fill me-2"></i>Email: {user?.email}</p>
            <p className="mb-0"><i className="bi bi-person-badge-fill me-2"></i>Role: <span className="badge bg-dark">Admin</span></p>
          </div>
        </div>

        {error && <div className="alert alert-danger p-3 shadow-sm">{error}</div>}

        <div className="row g-3 g-md-4">
          <div className="col-12 col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-header bg-gradient bg-primary bg-opacity-75 text-white">
                <h5 className="mb-0 fs-6 fs-md-5"><i className="bi bi-plus-circle me-2"></i>Create New Course</h5>
              </div>
              <div className="card-body p-3">
                <form onSubmit={handleCreateCourse}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Course Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={courseForm.name}
                      onChange={e => setCourseForm({ ...courseForm, name: e.target.value })}
                      placeholder="Enter course name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={courseForm.description}
                      onChange={e => setCourseForm({ ...courseForm, description: e.target.value })}
                      placeholder="Enter course description"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    <i className="bi bi-plus-lg me-2"></i>Create Course
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-header bg-gradient bg-success bg-opacity-75 text-white">
                <h5 className="mb-0 fs-6 fs-md-5"><i className="bi bi-person-plus me-2"></i>Enroll Student</h5>
              </div>
              <div className="card-body p-3">
                <form onSubmit={handleEnrollStudent}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Select Student</label>
                    <select
                      className="form-select"
                      value={selectedStudent}
                      onChange={e => setSelectedStudent(e.target.value)}
                      required
                    >
                      <option value="">-- Select Student --</option>
                      {users.filter(user => user.role === 'student').map(student => (
                        <option key={student._id} value={student._id}>
                          {student.name} ({student.email})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Select Course</label>
                    <select
                      className="form-select"
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
                  <button type="submit" className="btn btn-success w-100">
                    <i className="bi bi-check-circle me-2"></i>Enroll Student
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 mt-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-gradient bg-info bg-opacity-75 text-white d-flex justify-content-between align-items-center flex-wrap gap-2">
              <h5 className="mb-0 fs-6 fs-md-5"><i className="bi bi-journals me-2"></i>Manage Courses</h5>
              <span className="badge bg-white text-info fs-6">{courses.length} Courses</span>
            </div>
            <div className="card-body p-3 p-md-4">
              {courses.length === 0 ? (
                <div className="alert alert-info text-center py-4">
                  <i className="bi bi-info-circle fs-1 d-block mb-3"></i>
                  <p className="mb-0">No courses available</p>
                </div>
              ) : (
                <div className="row g-3 g-lg-4">
                  {courses.map(course => (
                    <div className="col-12 col-md-6" key={course._id}>
                      <div className="card h-100 shadow-sm border-0 hover-shadow">
                        <div className="card-header bg-dark bg-opacity-10 py-3">
                          <h5 className="card-title text-dark mb-0 fw-bold fs-6 fs-md-5">{course.name}</h5>
                        </div>
                        <div className="card-body p-3">
                          <p className="card-text text-muted small">{course.description || 'No description provided'}</p>
                          <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
                            <h6 className="fw-bold mb-0 fs-6">
                              <i className="bi bi-people-fill me-2"></i>
                              Enrolled Students
                            </h6>
                            <span className="badge bg-dark rounded-pill">{course.students?.length || 0}</span>
                          </div>
                          {course.students?.length > 0 ? (
                            <ul className="list-group list-group-flush mt-3">
                              {course.students.map(student => (
                                <li key={student._id} className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center border-0 bg-light mb-2 rounded p-2 p-sm-3">
                                  <div className="mb-2 mb-sm-0">
                                    <i className="bi bi-person-circle me-2 text-dark"></i>
                                    {student.name}
                                    <small className="text-muted d-block">{student.email}</small>
                                  </div>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleUnenrollStudent(course._id, student._id)}
                                  >
                                    <i className="bi bi-person-x me-1"></i>Unenroll
                                  </button>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="alert alert-light text-center mt-3 mb-0">
                              <i className="bi bi-emoji-neutral me-2"></i>No students enrolled
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 mt-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-gradient bg-secondary bg-opacity-75 text-white d-flex justify-content-between align-items-center flex-wrap gap-2">
              <h5 className="mb-0 fs-6 fs-md-5"><i className="bi bi-people me-2"></i>Manage Users</h5>
              <span className="badge bg-white text-secondary fs-6">{users.length} Users</span>
            </div>
            <div className="card-body p-0">
              {users.length === 0 ? (
                <div className="alert alert-info m-3 m-md-4 text-center">
                  <i className="bi bi-exclamation-circle fs-1 d-block mb-3"></i>
                  <p className="mb-0">No users found</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-bordered mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col" className="px-2 px-md-4 py-2 py-md-3">Name</th>
                        <th scope="col" className="px-2 px-md-4 py-2 py-md-3">Email</th>
                        <th scope="col" className="px-2 px-md-4 py-2 py-md-3">Role</th>
                        <th scope="col" className="px-2 px-md-4 py-2 py-md-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u._id}>
                          <td className="px-2 px-md-4 py-2 py-md-3 align-middle">
                            <div className="d-flex align-items-center">
                              <span className="bg-dark bg-opacity-10 text-dark rounded-circle d-inline-flex align-items-center justify-content-center me-2 me-md-3" style={{ width: '32px', height: '32px', minWidth: '32px' }}>
                                {u.name.charAt(0).toUpperCase()}
                              </span>
                              <span className="fw-bold text-truncate">{u.name}</span>
                            </div>
                          </td>
                          <td className="px-2 px-md-4 py-2 py-md-3 align-middle text-truncate">{u.email}</td>
                          <td className="px-2 px-md-4 py-2 py-md-3 align-middle">
                            <span className={`badge ${
                              u.role === 'superadmin' ? 'bg-danger' : 
                              u.role === 'admin' ? 'bg-warning' : 
                              'bg-info'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-2 px-md-4 py-2 py-md-3 align-middle text-center">
                            {u.role !== 'admin' && u.role !== 'superadmin' && (
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleDeleteUser(u._id)}
                              >
                                <i className="bi bi-trash me-1 d-none d-sm-inline"></i>Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default AdminDashboard;
