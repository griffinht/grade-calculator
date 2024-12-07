import React from 'react';
import PreviousGpa from './PreviousGpa';

function CumulativeGpa({ gpa, previousGpa, setPreviousGpa }) {
  return (
    <div className="space-y-4">
      {gpa !== null && (
        <div className="w-full bg-gray-50 p-6 rounded-xl text-center">
          <p className="text-sm text-gray-600 mb-1">
            Your Cumulative GPA
          </p>
          <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            {gpa.toFixed(3)}
          </p>
          
          <div className="mt-8">
            <PreviousGpa 
              previousGpa={previousGpa}
              setPreviousGpa={setPreviousGpa}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CumulativeGpa;
