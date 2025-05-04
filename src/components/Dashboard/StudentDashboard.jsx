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
    return (
      <div className="loading-container d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <h3 className="text-muted">Loading courses...</h3>
        </div>
      </div>
    );
  }
  
  return (
    <div className="student-dashboard bg-light min-vh-100">
      <Navbar />
      <div className="container py-5">
        <div className="dashboard-content bg-white rounded-lg shadow p-4 p-md-5">
          <div className="text-center mb-5">
            <div className="mb-3">
              <h1 className="display-5 fw-bold text-dark mb-0">Student Dashboard</h1>
            </div>
            <div className="border-bottom pb-2 mb-4"></div>
          </div>
          
          <div className="user-info bg-light p-4 rounded-lg border-start border-5 border-primary mb-5">
            <h2 className="fw-bold text-dark mb-4">Welcome, {user?.name}</h2>
            <div className="row">
              <div className="col-md-6">
                <p className="mb-3">
                  <i className="bi bi-envelope text-primary me-2"></i>
                  <span className="fw-semibold">Email:</span> <span className="ms-2">{user?.email}</span>
                </p>
              </div>
              <div className="col-md-6">
                <p className="mb-3">
                  <i className="bi bi-person-badge text-primary me-2"></i>
                  <span className="fw-semibold">Role:</span> <span className="ms-2">Student</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="courses-section mb-4">
            <div className="mb-4">
              <h3 className="fw-bold fs-2 mb-0">Your Enrolled Courses</h3>
            </div>
            
            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-circle me-2"></i>
                {error}
              </div>
            )}
            
            {courses.length === 0 ? (
              <div className="text-center py-5 bg-light rounded-lg">
                <img 
                  src="/api/placeholder/300/200" 
                  alt="No courses" 
                  className="img-fluid mb-4" 
                  style={{ maxWidth: '300px' }}
                />
                <p className="text-muted fs-5">You are not enrolled in any courses yet.</p>
              </div>
            ) : (
              <div className="row g-4">
                {courses.map(course => (
                  <div key={course._id} className="col-md-6 col-lg-4">
                    <div className="course-card card h-100 shadow-sm border-0">
                    <img 
  src={`https://picsum.photos/seed/${course._id}/400/220`} 
  className="card-img-top img-fluid" 
  alt={course.name}
/>

                      <div className="card-body d-flex flex-column">
                        <h4 className="card-title fw-bold">{course.name}</h4>
                        <p className="card-text text-muted flex-grow-1">{course.description}</p>
                        <div className="mt-3">
                          <button className="btn btn-primary w-100">
                            View Course
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;