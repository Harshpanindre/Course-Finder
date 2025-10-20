
import React, { useState } from 'react';
import { Course, Price } from '../types';
import { StarIcon, UsersIcon, HeartIcon, XIcon } from './IconComponents';

interface CourseCardProps {
  course: Course;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isWishlisted, onToggleWishlist }) => {
  const [showSummary, setShowSummary] = useState(false);

  const getPriceColor = (price: Price) => {
    switch (price) {
      case Price.Free:
        return 'bg-green-100 text-green-800';
      case Price.Paid:
        return 'bg-blue-100 text-blue-800';
      case Price.Subscription:
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start">
          <p className="text-sm font-semibold text-brand-blue uppercase tracking-wide pr-10">
            {course.provider} {course.company && `• ${course.company}`}
          </p>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${getPriceColor(course.price)}`}>
            {course.price}
          </span>
        </div>
        <h3 className="text-xl font-bold text-neutral-dark mt-2 mb-3">{course.title}</h3>
        <div className="flex items-center text-gray-600 space-x-4 text-sm">
          <div className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
            <span className="font-semibold">{course.rating > 0 ? course.rating.toFixed(1) : 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <UsersIcon className="h-5 w-5 text-gray-500 mr-1" />
            <span>{course.enrollment > 0 ? `${course.enrollment.toLocaleString()}+ enrolled` : 'New'}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">{course.difficulty}</span>
            <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">{course.duration}</span>
        </div>
      </div>
      
      <button
        onClick={onToggleWishlist}
        className="absolute top-3 right-3 p-2 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white transition-colors z-10"
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <HeartIcon className={`h-5 w-5 stroke-2 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-500 fill-none'}`} />
      </button>

      <div className="bg-gray-50 px-6 py-4 flex items-center space-x-2 sm:space-x-4">
        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center block bg-brand-blue text-white font-bold py-3 px-2 sm:px-4 rounded-lg hover:bg-brand-blue-dark transition-colors duration-300 text-sm"
        >
          Go to Course
        </a>
        <button
          onClick={() => setShowSummary(true)}
          className="flex-1 text-center block bg-gray-200 text-gray-800 font-bold py-3 px-2 sm:px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm"
          aria-haspopup="dialog"
        >
          View Summary
        </button>
      </div>

      {showSummary && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-40"
            onClick={() => setShowSummary(false)}
            aria-hidden="true"
          ></div>
          <div role="dialog" aria-modal="true" aria-labelledby={`summary-title-${course.id}`} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg p-6 max-w-lg w-full shadow-2xl animate-fade-in-up">
              <div className="flex justify-between items-start mb-4">
                <h4 id={`summary-title-${course.id}`} className="text-xl font-bold text-neutral-dark pr-8">{course.title}</h4>
                <button 
                  onClick={() => setShowSummary(false)}
                  className="-mt-2 -mr-2 p-2 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                  aria-label="Close summary"
                >
                  <XIcon className="h-6 w-6" />
                </button>
              </div>
              <p className="text-sm text-gray-700 max-h-60 overflow-y-auto pr-2">
                {course.summary}
              </p>
              <div className="mt-6 flex justify-end space-x-4">
                <button 
                  onClick={() => setShowSummary(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium text-white bg-brand-blue rounded-lg hover:bg-brand-blue-dark"
                >
                  Go to Course
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseCard;
