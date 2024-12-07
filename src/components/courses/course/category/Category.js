import React from 'react';
import { Plus, Trash } from "lucide-react";
import Assignments from './assignment/Assignments';

function Category({ 
  catName, 
  category, 
  collapsedCategories,
  handleCourseChange,
  handleAssignmentChange,
  toggleCategoryCollapse,
  index,
  course,
  getNextAssignmentName,
  newAssignments,
  setNewAssignments,
  resetNewAssignment
}) {
  return (
    <div key={catName} className="space-y-2">
      {/* Category Row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleCategoryCollapse(catName)}
            className="text-gray-500 hover:text-gray-700"
            tabIndex="-1"
          >
            <svg
              className={`h-4 w-4 transform transition-transform ${collapsedCategories[catName] ? '' : 'rotate-90'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <input
            className="w-32 px-2 py-1 rounded-md border border-gray-300 text-sm font-medium focus:outline-none"
            value={catName}
            onChange={(e) => {
              const newCategories = { ...course.categories };
              const categoryData = newCategories[catName];
              delete newCategories[catName];
              newCategories[e.target.value.toLowerCase()] = categoryData;
              handleCourseChange(index, {
                target: {
                  name: 'categories',
                  value: newCategories
                }
              });
            }}
            tabIndex="-1"
            onClick={(e) => e.target.select()}
          />
        </div>
        <button
          type="button"
          onClick={() => {
            const newCategories = { ...course.categories };
            delete newCategories[catName];
            handleCourseChange(index, {
              target: {
                name: 'categories',
                value: newCategories
              }
            });
          }}
          className="p-1 text-red-500 hover:text-red-600"
          tabIndex="-1"
        >
          <Trash className="h-4 w-4" />
        </button>
      </div>

      {/* Second Line - Grades and Weight */}
      <div className="flex items-center justify-between gap-4 ml-6">
        <div className="flex items-center gap-2">
          <input
            className="w-14 px-2 py-1 rounded-md border border-gray-300 focus:outline-none"
            type="number"
            placeholder="Earned"
            name="earned"
            value={category.earned}
            onChange={(e) => handleCourseChange(index, e, catName)}
            min="0"
            max={category.total}
          />
          <span className="text-gray-500">/</span>
          <input
            className="w-14 px-2 py-1 rounded-md border border-gray-300 focus:outline-none"
            type="number"
            placeholder="Total"
            name="total"
            value={category.total}
            onChange={(e) => handleCourseChange(index, e, catName)}
            min="0"
            tabIndex="-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            className="w-12 px-2 py-1 rounded-md border border-gray-300 focus:outline-none"
            type="number"
            name="weight"
            value={category.weight}
            onChange={(e) => handleCourseChange(index, e, catName)}
            min="0"
            max="100"
            tabIndex="-1"
          />
          <span className="text-sm text-gray-500">%</span>
        </div>
      </div>

      {/* Assignments section */}
      <Assignments
        category={category}
        catName={catName}
        handleAssignmentChange={handleAssignmentChange}
        handleCourseChange={handleCourseChange}
        index={index}
        course={course}
        getNextAssignmentName={getNextAssignmentName}
        newAssignments={newAssignments}
        setNewAssignments={setNewAssignments}
        resetNewAssignment={resetNewAssignment}
        collapsedCategories={collapsedCategories}
      />
    </div>
  );
}

export default Category;
