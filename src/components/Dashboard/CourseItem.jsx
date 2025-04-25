import React from 'react';

const CourseItem = ({ course }) => {
  return (
    <div>
      <h3>{course.name}</h3>
      <p>{course.description}</p>
    </div>
  );
};

export default CourseItem;