
import React from 'react';
import { Course } from '../types';
import CourseCard from './CourseCard';

interface CourseListProps {
  courses: Course[];
  totalCourses: number;
  wishlist: Set<string>;
  onToggleWishlist: (courseId: string) => void;
}

const CourseList: React.FC<CourseListProps> = ({ courses, totalCourses, wishlist, onToggleWishlist }) => {
  return (
    <div>
      <div className="mb-4">
        <p className="text-gray-600">
          Showing <span className="font-bold text-neutral-dark">{courses.length}</span> of <span className="font-bold text-neutral-dark">{totalCourses}</span> courses
        </p>
      </div>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              isWishlisted={wishlist.has(course.id)}
              onToggleWishlist={() => onToggleWishlist(course.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-neutral-dark">No Courses Found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default CourseList;
