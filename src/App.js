import React, { useState, useEffect, useCallback } from 'react';
import Import from './components/Import';
import CumulativeGpa from './components/cumulativeGpa/CumulativeGpa';
import Courses from './components/courses/Courses';

function App() {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('courses');
    return saved ? JSON.parse(saved) : [{
      name: '',
      credits: '3',
      target: '',
      categories: {},
      included: true
    }];
  });

  const [previousGpa, setPreviousGpa] = useState(() => {
    const saved = localStorage.getItem('previousGpa');
    return saved ? JSON.parse(saved) : { gpa: '', credits: '' };
  });

  const [gpa, setGpa] = useState(null);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('previousGpa', JSON.stringify(previousGpa));
  }, [previousGpa]);

  const calculateGpa = useCallback((courses) => {
    let totalPoints = 0;
    let totalCredits = 0;

    if (previousGpa.gpa && previousGpa.credits) {
      const prevGpa = parseFloat(previousGpa.gpa);
      const prevCredits = parseFloat(previousGpa.credits);
      totalPoints += prevGpa * prevCredits;
      totalCredits += prevCredits;
    }

    for (const course of courses) {
      if (!course.included) continue;
      
      const credits = parseFloat(course.credits) || 0;
      const target = parseFloat(course.target);
      
      if (!target || !credits) continue;
      
      let points = 0;
      
      if (target >= 97) points = 4.333;      // A+
      else if (target >= 93) points = 4.0;   // A
      else if (target >= 90) points = 3.667; // A-
      else if (target >= 87) points = 3.333; // B+
      else if (target >= 83) points = 3.0;   // B
      else if (target >= 80) points = 2.667; // B-
      else if (target >= 77) points = 2.333; // C+
      else if (target >= 73) points = 2.0;   // C
      else if (target >= 70) points = 1.667; // C-
      else if (target >= 67) points = 1.333; // D+
      else if (target >= 63) points = 1.0;   // D
      else if (target >= 60) points = 0.667; // D-
      else points = 0.0;                     // F

      totalPoints += points * credits;
      totalCredits += credits;
    }

    return totalCredits === 0 ? 0 : totalPoints / totalCredits;
  }, [previousGpa]);

  useEffect(() => {
    const calculatedGpa = calculateGpa(courses);
    setGpa(calculatedGpa);
  }, [courses, calculateGpa]);

  const handleCourseChange = (index, event, category = null) => {
    const newCourses = [...courses];
    if (category) {
      if (event.target.name === 'weight') {
        newCourses[index].categories[category].weight = parseFloat(event.target.value) || 0;
      } else {
        newCourses[index].categories[category][event.target.name] = event.target.value;
      }
    } else if (event.target.name === 'categories') {
      newCourses[index].categories = event.target.value;
    } else {
      newCourses[index][event.target.name] = event.target.value;
    }
    setCourses(newCourses);
  };

  const handleAddCourse = () => {
    setCourses([...courses, { 
      name: '', 
      credits: '3', 
      target: '', 
      categories: {},
      included: true 
    }]);
  };

  const handleRemoveCourse = (index) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all saved data?')) {
      localStorage.removeItem('courses');
      localStorage.removeItem('previousGpa');
      setCourses([{
        name: '',
        credits: '3',
        target: '',
        categories: {},
        included: true
      }]);
      setPreviousGpa({ gpa: '', credits: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <div className="space-y-8">
              <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                GPA Calculator
              </h1>

              <CumulativeGpa 
                gpa={gpa}
                previousGpa={previousGpa}
                setPreviousGpa={setPreviousGpa}
              />

              <Import setCourses={setCourses} />

              <Courses
                courses={courses}
                handleCourseChange={handleCourseChange}
                handleRemoveCourse={handleRemoveCourse}
                handleAddCourse={handleAddCourse}
                handleClearData={handleClearData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
