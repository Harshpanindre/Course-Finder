
import React from 'react';
import { allCategories } from '../data/courses';

interface CategoryNavProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ selectedCategory, onSelectCategory }) => {
  const categories = ['All Courses', ...allCategories];

  return (
    <nav className="bg-white shadow-sm mb-8 rounded-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto py-3">
          {categories.map((category) => {
            const isAllCourses = category === 'All Courses';
            const isActive = (isAllCourses && selectedCategory === null) || selectedCategory === category;
            
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(isAllCourses ? null : category)}
                className={`px-3 py-2 font-medium text-sm rounded-md whitespace-nowrap transition-colors duration-200 ${
                  isActive
                    ? 'bg-brand-blue text-white shadow'
                    : 'text-gray-600 hover:bg-gray-200 hover:text-neutral-dark'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
