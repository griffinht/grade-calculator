import React from 'react';
import { Plus } from "lucide-react";
import Assignment from './Assignment';

function Assignments({
  category,
  catName,
  handleAssignmentChange,
  handleCourseChange,
  index,
  course,
  getNextAssignmentName,
  newAssignments,
  setNewAssignments,
  resetNewAssignment,
  collapsedCategories
}) {
  const nameInputRef = React.useRef(null);

  const addNewAssignment = (catName) => {
    const newAssignment = newAssignments[catName];
    
    if (!newAssignment?.name) {
      alert('Please enter an assignment name');
      return;
    }

    const newCategories = { ...course.categories };
    newCategories[catName].assignments = [
      ...(category.assignments || []),
      {
        name: newAssignment.name,
        earned: parseFloat(newAssignment.earned) || 0,
        total: parseFloat(newAssignment.total) || 100
      }
    ];

    // Update category totals
    const totalEarned = newCategories[catName].assignments.reduce((sum, a) => sum + (parseFloat(a.earned) || 0), 0);
    const totalPossible = newCategories[catName].assignments.reduce((sum, a) => sum + (parseFloat(a.total) || 0), 0);
    newCategories[catName].earned = totalEarned;
    newCategories[catName].total = totalPossible;

    handleCourseChange(index, {
      target: {
        name: 'categories',
        value: newCategories
      }
    });

    console.log('New Assignment Added:', newAssignment);
    resetNewAssignment(catName);

    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  };

  const handleDeleteAssignment = (catName, assignmentIndex) => {
    const newCategories = { ...course.categories };
    newCategories[catName].assignments = category.assignments.filter((_, i) => i !== assignmentIndex);
    
    // Update category totals
    const remaining = newCategories[catName].assignments;
    const totalEarned = remaining.reduce((sum, a) => sum + (parseFloat(a.earned) || 0), 0);
    const totalPossible = remaining.reduce((sum, a) => sum + (parseFloat(a.total) || 0), 0);
    newCategories[catName].earned = totalEarned;
    newCategories[catName].total = totalPossible;

    handleCourseChange(index, {
      target: {
        name: 'categories',
        value: newCategories
      }
    });
  };

  return (
    <div className={`ml-8 space-y-2 ${collapsedCategories[catName] ? 'hidden' : ''}`}>
      {/* Existing Assignments */}
      {category.assignments?.map((assignment, assignmentIndex) => (
        <Assignment
          key={assignmentIndex}
          assignment={assignment}
          assignmentIndex={assignmentIndex}
          catName={catName}
          handleAssignmentChange={handleAssignmentChange}
          handleDeleteAssignment={handleDeleteAssignment}
        />
      ))}
      
      {/* Modified New Assignment Row */}
      <form 
        className="flex items-center gap-4 p-2 bg-gray-100/50 rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-100"
        onSubmit={(e) => {
          e.preventDefault();
          addNewAssignment(catName);
        }}
      >
        <input
          ref={nameInputRef}
          className="w-[100px] px-2 py-1 rounded-md border border-gray-300 text-sm"
          placeholder={getNextAssignmentName(catName, category)}
          value={newAssignments[catName]?.name || ''}
          onChange={(e) => setNewAssignments(prev => ({
            ...prev,
            [catName]: { ...(prev[catName] || {}), name: e.target.value }
          }))}
        />
        <div className="flex items-center gap-2">
          <input
            className="w-16 px-2 py-1 rounded-md border border-gray-300 text-sm"
            type="number"
            placeholder="95"
            value={newAssignments[catName]?.earned || ''}
            onChange={(e) => setNewAssignments(prev => ({
              ...prev,
              [catName]: { ...(prev[catName] || {}), earned: e.target.value }
            }))}
            min="0"
            max={newAssignments[catName]?.total}
          />
          <span className="text-gray-400">/</span>
          <input
            className="w-16 px-2 py-1 rounded-md border border-gray-300 text-sm"
            type="number"
            placeholder="100"
            value={newAssignments[catName]?.total || '100'}
            onChange={(e) => setNewAssignments(prev => ({
              ...prev,
              [catName]: { ...(prev[catName] || {}), total: e.target.value }
            }))}
            min="0"
          />
        </div>
        <button
          type="submit"
          className="text-green-500 hover:text-green-600"
        >
          <Plus className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

export default Assignments;
