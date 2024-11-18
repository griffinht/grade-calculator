import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

function Import({ setCourses }) {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedCourse = params.get('course');
    
    if (sharedCourse) {
      try {
        const courseData = JSON.parse(atob(sharedCourse));
        
        setCourses(prevCourses => [...prevCourses, courseData]);
        
        setNotification(`Imported "${courseData.name}" to your courses`);
        
        window.history.replaceState({}, '', window.location.pathname);
      } catch (error) {
        console.error('Failed to load shared course:', error);
        setNotification('Failed to import course. Invalid share link.');
      }
    }
  }, [setCourses]);

  if (!notification) return null;

  return (
    <div className="mb-4 bg-blue-50 rounded-lg shadow-sm animate-slideDown">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="text-blue-700">{notification}</p>
          <button
            onClick={() => setNotification(null)}
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            <span className="sr-only">Dismiss</span>
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Import;