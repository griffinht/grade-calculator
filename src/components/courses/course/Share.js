import React from 'react';
import { Share2 } from 'lucide-react';

function Share({ course }) {
  const handleShareCourse = () => {
    const courseData = btoa(JSON.stringify(course));
    const shareUrl = `${window.location.origin}?course=${courseData}`;
    
    if (navigator.share) {
      navigator.share({
        title: `${course.name || 'Course'} Details`,
        text: `Check out my course details for ${course.name || 'this course'}`,
        url: shareUrl
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareUrl)
        .then(() => alert('Share link copied to clipboard!'))
        .catch(console.error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShareCourse}
      className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-md"
      title="Share course"
      tabIndex="-1"
    >
      <Share2 className="h-4 w-4" />
    </button>
  );
}

export default Share; 