import React from 'react';
import { Plus } from "lucide-react";
import Course from './courses/Course';

function Courses({ courses, handleCourseChange, handleRemoveCourse, handleAddCourse, handleClearData }) {
  return (
    <div className="space-y-4">
      {courses.map((course, index) => (
        <Course
          key={index}
          course={course}
          index={index}
          handleCourseChange={handleCourseChange}
          handleRemoveCourse={handleRemoveCourse}
        />
      ))}

      <div className="flex justify-center">
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
          onClick={handleAddCourse}
        >
          <Plus className="h-4 w-4" />
          Add Course
        </button>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleClearData}
          className="text-sm text-gray-400 hover:text-red-500"
        >
          Clear saved data
        </button>
      </div>
    </div>
  );
}

export default Courses;
