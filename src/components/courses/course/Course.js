import React, { useState, useEffect } from 'react';
import { Plus, Trash } from "lucide-react";
import Share from './Share';
import Category from './category/Category';
import Categories from './category/Categories';

const getLetterGrade = (percentage) => {
  if (!percentage) return '';
  if (percentage >= 97) return 'A+';
  if (percentage >= 93) return 'A';
  if (percentage >= 90) return 'A-';
  if (percentage >= 87) return 'B+';
  if (percentage >= 83) return 'B';
  if (percentage >= 80) return 'B-';
  if (percentage >= 77) return 'C+';
  if (percentage >= 73) return 'C';
  if (percentage >= 70) return 'C-';
  if (percentage >= 67) return 'D+';
  if (percentage >= 63) return 'D';
  if (percentage >= 60) return 'D-';
  return 'F';
};

function Course({ course, index, handleCourseChange, handleRemoveCourse }) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem(`course-${index}-collapsed`);
    return saved ? JSON.parse(saved) : false;
  });
  const [collapsedCategories, setCollapsedCategories] = useState(() => {
    const saved = localStorage.getItem(`course-${index}-categories-collapsed`);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(`course-${index}-collapsed`, JSON.stringify(isCollapsed));
  }, [isCollapsed, index]);

  useEffect(() => {
    localStorage.setItem(`course-${index}-categories-collapsed`, JSON.stringify(collapsedCategories));
  }, [collapsedCategories, index]);

  const calculateCurrentGrade = () => {
    let totalEarned = 0;
    let totalPossibleWeight = 0;

    Object.values(course.categories).forEach(category => {
      const earned = parseFloat(category.earned) || 0;
      const total = parseFloat(category.total) || 0;
      const weight = parseFloat(category.weight) || 0;

      if (total > 0) {
        totalEarned += (earned / total) * weight;
        totalPossibleWeight += weight;
      }
    });

    return totalPossibleWeight === 0 ? null : (totalEarned / totalPossibleWeight * 100);
  };

  const calculateNeededScore = () => {
    const target = parseFloat(course.target);
    if (!target) return null;

    const categories = course.categories;
    let earnedPoints = 0;
    let remainingWeight = 0;
    let undecidedCategories = [];

    // Calculate points already earned and track undecided categories
    Object.entries(categories).forEach(([name, cat]) => {
      const earned = parseFloat(cat.earned);
      const total = parseFloat(cat.total);
      const weight = parseFloat(cat.weight) || 0;
      
      if (!isNaN(earned) && !isNaN(total) && total > 0) {
        earnedPoints += (earned / total) * weight;
      } else {
        remainingWeight += weight;
        undecidedCategories.push(name);
      }
    });

    // Calculate needed percentage in remaining categories
    const neededPoints = target - earnedPoints;
    const neededPercentage = (neededPoints / remainingWeight) * 100;

    return {
      percentage: isFinite(neededPercentage) ? neededPercentage : null,
      undecidedCategories
    };
  };

  return (
    <div className={`space-y-4 p-4 border rounded-lg ${!course.included ? 'opacity-50' : ''}`}>
      {/* Top Row - Just Course Name and Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <input
            type="checkbox"
            checked={course.included}
            onChange={(e) => handleCourseChange(index, {
              target: { name: 'included', value: e.target.checked }
            })}
            className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          />
          <input
            className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Course Name"
            name="name"
            value={course.name}
            onChange={(e) => handleCourseChange(index, e)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Share course={course} />
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Are you sure you want to remove this course?')) {
                handleRemoveCourse(index);
              }
            }}
            className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-md"
            tabIndex="-1"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Second Row - Grade Target, Credits, and Minimize */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 whitespace-nowrap">Grade Target:</span>
          <input
            className="w-16 px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="95"
            name="target"
            type="number"
            min="0"
            max="100"
            value={course.target}
            onChange={(e) => handleCourseChange(index, e)}
          />
          {course.target && (
            <span className={`text-sm font-medium ${
              getLetterGrade(parseFloat(course.target)).startsWith('A') ? 'text-green-600' :
              getLetterGrade(parseFloat(course.target)).startsWith('B') ? 'text-blue-600' :
              getLetterGrade(parseFloat(course.target)).startsWith('C') ? 'text-yellow-600' :
              getLetterGrade(parseFloat(course.target)).startsWith('D') ? 'text-orange-600' :
              'text-red-600'
            }`}>
              ({getLetterGrade(parseFloat(course.target))})
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 whitespace-nowrap">Credits:</span>
          <input
            className="w-12 px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="number"
            placeholder="3"
            name="credits"
            value={course.credits}
            onChange={(e) => handleCourseChange(index, e)}
            min="0"
            max="6"
            required
          />
        </div>

        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500 hover:text-gray-700"
          tabIndex="-1"
        >
          <svg
            className={`h-5 w-5 transform transition-transform ${isCollapsed ? '' : 'rotate-90'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {isCollapsed && Object.keys(course.categories).length > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-600 ml-auto">
            <span>Current Grade:</span>
            <span className="font-medium">
              {calculateCurrentGrade()?.toFixed(1) || '-'}%
            </span>
            {calculateNeededScore()?.percentage > 100 && (
              <span className="text-red-500">⚠️</span>
            )}
          </div>
        )}
      </div>

      {/* Categories section */}
      <div className={`space-y-2 transition-all duration-200 ${isCollapsed ? 'hidden' : ''}`}>
        <Categories
          course={course}
          index={index}
          handleCourseChange={handleCourseChange}
          collapsedCategories={collapsedCategories}
          setCollapsedCategories={setCollapsedCategories}
        />

        {/* Summary Rows */}
        {Object.keys(course.categories).length > 0 && (
          <>
            <div className="flex items-center justify-between gap-4 p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 capitalize min-w-[100px]">
                  Total Grade
                </span>
                <div className="flex items-center gap-2">
                  <input
                    className="w-20 px-2 py-1 rounded-md border border-gray-300 bg-gray-100"
                    type="number"
                    value={calculateCurrentGrade()?.toFixed(1) || ''}
                    disabled
                  />
                  <span className="text-gray-500">/</span>
                  <input
                    className="w-20 px-2 py-1 rounded-md border border-gray-300 bg-gray-100"
                    type="number"
                    value={course.target || 100}
                    disabled
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Weight:</span>
                <input
                  className={`w-16 px-2 py-1 rounded-md border ${
                    Object.values(course.categories).reduce((sum, cat) => sum + (parseFloat(cat.weight) || 0), 0) !== 100
                    ? 'border-amber-300 bg-amber-50'
                    : 'border-gray-300 bg-gray-100'
                  }`}
                  type="number"
                  value={Object.values(course.categories).reduce((sum, cat) => sum + (parseFloat(cat.weight) || 0), 0)}
                  disabled
                />
                <span className="text-sm text-gray-500">%</span>
              </div>
            </div>
            
            {calculateNeededScore() !== null && (
              <div className="p-2 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  {calculateNeededScore().undecidedCategories.length === 1 ? (
                    <>
                      To achieve {course.target}% in this course, you need to score{' '}
                      {calculateNeededScore().percentage > 100 ? (
                        <span className="font-medium text-red-600">
                          over 100% ({calculateNeededScore().percentage.toFixed(1)}%)
                        </span>
                      ) : (
                        <span className="font-medium text-blue-600">
                          at least {calculateNeededScore().percentage.toFixed(1)}%
                        </span>
                      )}{' '}
                      on your {calculateNeededScore().undecidedCategories[0]}.
                    </>
                  ) : calculateNeededScore().undecidedCategories.length === 2 ? (
                    <>
                      To achieve {course.target}% in this course, you need to score{' '}
                      {calculateNeededScore().percentage > 100 ? (
                        <span className="font-medium text-red-600">
                          over 100% ({calculateNeededScore().percentage.toFixed(1)}%)
                        </span>
                      ) : (
                        <span className="font-medium text-blue-600">
                          at least {calculateNeededScore().percentage.toFixed(1)}%
                        </span>
                      )}{' '}
                      on your {calculateNeededScore().undecidedCategories[0]} and {calculateNeededScore().undecidedCategories[1]}.
                    </>
                  ) : (
                    <>
                      To achieve {course.target}% in this course, you need to score{' '}
                      {calculateNeededScore().percentage > 100 ? (
                        <span className="font-medium text-red-600">
                          over 100% ({calculateNeededScore().percentage.toFixed(1)}%)
                        </span>
                      ) : (
                        <>
                          at least{' '}
                          <span className="font-medium text-blue-600">
                            {calculateNeededScore().percentage.toFixed(1)}%
                          </span>
                        </>
                      )}{' '}
                      on remaining work.
                    </>
                  )}
                  {calculateNeededScore().percentage > 100 && (
                    <span className="block mt-1 text-red-600 text-xs">
                      ⚠️ This target grade is not possible with current scores
                    </span>
                  )}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Course; 