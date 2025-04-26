// import React from 'react';

// const DashboardStats = ({ courses, users }) => {
//   // Calculate statistics
//   const totalStudents = users?.filter(user => user.role === 'student').length || 0;
//   const totalAdmins = users?.filter(user => user.role === 'admin' || user.role === 'superadmin').length || 0;
//   const totalCourses = courses?.length || 0;
  
//   // Find course with most students
//   let mostPopularCourse = { name: 'None', students: [] };
//   if (courses && courses.length > 0) {
//     mostPopularCourse = courses.reduce(
//       (prev, current) => 
//         (current.students?.length > prev.students?.length) ? current : prev,
//       courses[0]
//     );
//   }

//   return (
//     <div className="dashboard-stats">
//       <div className="stats-grid">
//         <div className="stat-card">
//           <div className="stat-value">{totalCourses}</div>
//           <div className="stat-label">Courses</div>
//         </div>
        
//         <div className="stat-card">
//           <div className="stat-value">{totalStudents}</div>
//           <div className="stat-label">Students</div>
//         </div>
        
//         <div className="stat-card">
//           <div className="stat-value">{totalAdmins}</div>
//           <div className="stat-label">Admins</div>
//         </div>
        
//         <div className="stat-card">
//           <div className="stat-label">Most Popular Course</div>
//           <div className="stat-title">{mostPopularCourse.name}</div>
//           <div className="stat-subtitle">
//             {mostPopularCourse.students?.length || 0} students
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardStats;