// src/pages/SuperAdminDashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { userService, courseService } from '../apis/Index';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../Layout/Navbar';

const SuperAdminDashboard = () => {
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
    <div className="superadmin-dashboard">
      <Navbar />
      <div className="dashboard-content">
        <h1>Super Admin Dashboard</h1>
        <div className="user-info">
          <h2>Welcome, {user?.name}</h2>
          <p>Email: {user?.email}</p>
          <p>Role: Super Admin</p>
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
                      {/* Super Admin can delete any user, including admins */}
                      {u._id !== user._id && (
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

export default SuperAdminDashboard;