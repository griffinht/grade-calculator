import React from 'react';
import { Trash } from "lucide-react";

function Assignment({ 
  assignment, 
  assignmentIndex, 
  catName, 
  handleAssignmentChange,
  handleDeleteAssignment
}) {
  return (
    <div className="flex items-center gap-4 p-2 bg-gray-100/50 rounded-lg">
      <input
        className="w-[100px] px-2 py-1 rounded-md border border-gray-300 text-sm"
        value={assignment.name}
        onChange={(e) => handleAssignmentChange(catName, assignmentIndex, 'name', e.target.value)}
        placeholder={`${catName} ${assignmentIndex + 1}`}
      />
      <div className="flex items-center gap-2">
        <input
          className="w-16 px-2 py-1 rounded-md border border-gray-300 text-sm"
          type="number"
          value={assignment.earned}
          onChange={(e) => handleAssignmentChange(catName, assignmentIndex, 'earned', e.target.value)}
          min="0"
          max={assignment.total}
        />
        <span className="text-gray-500">/</span>
        <input
          className="w-16 px-2 py-1 rounded-md border border-gray-300 text-sm"
          type="number"
          value={assignment.total}
          onChange={(e) => handleAssignmentChange(catName, assignmentIndex, 'total', e.target.value)}
          min="0"
          tabIndex="-1"
        />
      </div>
      <button
        type="button"
        onClick={() => handleDeleteAssignment(catName, assignmentIndex)}
        className="text-red-500 hover:text-red-600"
        tabIndex="-1"
      >
        <Trash className="h-4 w-4" />
      </button>
    </div>
  );
}

export default Assignment;
