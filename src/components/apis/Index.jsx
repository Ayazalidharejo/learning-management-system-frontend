// src/api/index.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// User service
export const userService = {
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Course service
export const courseService = {
  getCourses: async () => {
    try {
      const response = await axios.get(`${API_URL}/courses`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  createCourse: async (courseData) => {
    try {
      const response = await axios.post(`${API_URL}/courses`, courseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  enrollStudent: async (courseId, userId) => {
    try {
      const response = await axios.post(`${API_URL}/courses/${courseId}/enroll/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  unenrollStudent: async (courseId, userId) => {
    try {
      const response = await axios.post(`${API_URL}/courses/${courseId}/unenroll/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};