import React, { useState } from 'react';
import { Plus } from "lucide-react";
import Category from './Category';

function Categories({ 
  course, 
  index, 
  handleCourseChange, 
  collapsedCategories, 
  setCollapsedCategories 
}) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryWeight, setNewCategoryWeight] = useState('');
  const [newAssignments, setNewAssignments] = useState({});

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const weight = parseFloat(newCategoryWeight) || 0;
    handleCourseChange(index, {
      target: {
        name: 'categories',
        value: {
          ...course.categories,
          [newCategoryName.toLowerCase()]: {
            weight,
            earned: '',
            total: 100,
            assignments: []
          }
        }
      }
    });
    
    setNewCategoryName('');
    setNewCategoryWeight('');
  };

  const handleAssignmentChange = (categoryName, assignmentIndex, field, value) => {
    const newCategories = { ...course.categories };
    const category = newCategories[categoryName];
    
    category.assignments[assignmentIndex][field] = value;

    // Update the category's earned/total
    const totalEarned = category.assignments.reduce((sum, a) => sum + (parseFloat(a.earned) || 0), 0);
    const totalPossible = category.assignments.reduce((sum, a) => sum + (parseFloat(a.total) || 0), 0);
    category.earned = totalEarned;
    category.total = totalPossible;

    handleCourseChange(index, {
      target: {
        name: 'categories',
        value: newCategories
      }
    });
  };

  const toggleCategoryCollapse = (catName) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [catName]: !prev[catName]
    }));
  };

  const getNextAssignmentName = (categoryName, category) => {
    const existingNumbers = category.assignments?.map(a => {
      const match = a.name.match(/\d+$/);
      return match ? parseInt(match[0]) : 0;
    }) || [];
    
    const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
    return `${categoryName} ${nextNumber}`;
  };

  const resetNewAssignment = (categoryName) => {
    setNewAssignments(prev => ({
      ...prev,
      [categoryName]: {
        name: '',
        earned: '',
        total: '100'
      }
    }));
  };

  return (
    <div className="space-y-2">
      {/* Existing Categories */}
      {Object.entries(course.categories).map(([catName, category]) => (
        <Category
          key={catName}
          catName={catName}
          category={category}
          collapsedCategories={collapsedCategories}
          handleCourseChange={handleCourseChange}
          handleAssignmentChange={handleAssignmentChange}
          toggleCategoryCollapse={toggleCategoryCollapse}
          index={index}
          course={course}
          getNextAssignmentName={getNextAssignmentName}
          newAssignments={newAssignments}
          setNewAssignments={setNewAssignments}
          resetNewAssignment={resetNewAssignment}
        />
      ))}
      
      {/* New Category Row */}
      <div className="flex items-center justify-between gap-4 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 border-2 border-dashed border-gray-300">
        <div className="flex items-center gap-2">
          <input
            className="w-[100px] px-2 py-1 rounded-md border border-gray-300 text-sm font-medium"
            type="text"
            placeholder="exams"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (newCategoryName.trim()) {
                  handleAddCategory();
                  // Focus on the category name input of the next new category
                  e.target.focus();
                }
              }
            }}
          />
          <div className="flex items-center gap-2">
            <input
              className="w-20 px-2 py-1 rounded-md border border-gray-300 bg-gray-50"
              type="number"
              placeholder="95"
              disabled
            />
            <span className="text-gray-400">/</span>
            <input
              className="w-20 px-2 py-1 rounded-md border border-gray-300 bg-gray-50"
              type="number"
              placeholder="100"
              disabled
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Weight:</span>
          <input
            className="w-16 px-2 py-1 rounded-md border border-gray-300"
            type="number"
            placeholder="15"
            value={newCategoryWeight}
            onChange={(e) => setNewCategoryWeight(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (newCategoryName.trim()) {
                  handleAddCategory();
                  // Focus back on the category name input
                  const categoryNameInput = e.target.closest('.rounded-lg').querySelector('input[type="text"]');
                  categoryNameInput?.focus();
                }
              }
            }}
            min="0"
            max="100"
          />
          <span className="text-sm text-gray-400">%</span>
          <button
            type="button"
            onClick={() => {
              if (newCategoryName.trim()) {
                handleAddCategory();
                // Focus back on the category name input
                const categoryNameInput = document.querySelector('.border-dashed input[type="text"]');
                categoryNameInput?.focus();
              }
            }}
            className="p-1 text-green-500 hover:text-green-600"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Categories;
