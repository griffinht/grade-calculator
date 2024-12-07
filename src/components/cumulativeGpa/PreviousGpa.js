import React from 'react';

export const SEMESTER_DATA = {
  freshman: {
    fall: { credits: 15, order: 1 },
    spring: { credits: 30, order: 2 }
  },
  sophomore: {
    fall: { credits: 45, order: 3 },
    spring: { credits: 60, order: 4 }
  },
  junior: {
    fall: { credits: 75, order: 5 },
    spring: { credits: 90, order: 6 }
  },
  senior: {
    fall: { credits: 105, order: 7 },
    spring: { credits: 120, order: 8 }
  }
};

function PreviousGpa({ previousGpa, setPreviousGpa }) {
  return (
    <details className="mt-4 text-sm text-gray-600 group">
      <summary className="cursor-pointer hover:text-gray-800">
        Include previous semesters
      </summary>
      <div className="mt-3 space-y-4">
        <p className="text-center text-gray-600">I'm currently in my...</p>
        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <select
            className="px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={previousGpa.year || ''}
            name="year"
            onChange={(e) => {
              const year = e.target.value;
              if (year && previousGpa.semester) {
                const typicalCredits = SEMESTER_DATA[year][previousGpa.semester].credits;
                setPreviousGpa(prev => ({
                  ...prev,
                  year,
                  credits: typicalCredits.toString()
                }));
              } else {
                setPreviousGpa(prev => ({ ...prev, year }));
              }
            }}
          >
            <option value="">Select Year</option>
            <option value="freshman">Freshman Year</option>
            <option value="sophomore">Sophomore Year</option>
            <option value="junior">Junior Year</option>
            <option value="senior">Senior Year</option>
          </select>
          <select
            className="px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={previousGpa.semester || ''}
            name="semester"
            onChange={(e) => {
              const semester = e.target.value;
              if (previousGpa.year && semester) {
                const typicalCredits = SEMESTER_DATA[previousGpa.year][semester].credits;
                setPreviousGpa(prev => ({
                  ...prev,
                  semester,
                  credits: typicalCredits.toString()
                }));
              } else {
                setPreviousGpa(prev => ({ ...prev, semester }));
              }
            }}
          >
            <option value="">Select Semester</option>
            <option value="fall">Fall Semester</option>
            <option value="spring">Spring Semester</option>
          </select>
        </div>
        
        {previousGpa.year && previousGpa.semester && (
          <div className="space-y-3">
            <p className="text-center text-gray-600">
              With approximately {previousGpa.credits} credits completed
            </p>
            <div className="flex justify-center">
              <input
                className="w-32 px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="number"
                placeholder="Previous GPA"
                name="gpa"
                value={previousGpa.gpa}
                onChange={(e) => setPreviousGpa(prev => ({ ...prev, gpa: e.target.value }))}
                min="0"
                max="4.333"
                step="0.001"
              />
            </div>
          </div>
        )}
      </div>
    </details>
  );
}

export default PreviousGpa; 