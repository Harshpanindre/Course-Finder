
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import CourseList from './components/CourseList';
import CategoryNav from './components/CategoryNav';
import { courses } from './data/courses';
import { Course, Filters } from './types';
import { FilterIcon, XIcon } from './components/IconComponents';

const initialFilters: Filters = {
  price: [],
  popularity: 'highest-rated',
  platforms: [],
  difficulty: [],
  duration: [],
  companies: [],
  showWishlisted: false,
  jobRoles: [],
};

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleWishlist = (courseId: string) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(courseId)) {
        newWishlist.delete(courseId);
      } else {
        newWishlist.add(courseId);
      }
      return newWishlist;
    });
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };
  
  const clearFilters = () => {
    setFilters(initialFilters);
    setSelectedCategory(null);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    const { price, platforms, difficulty, duration, companies, showWishlisted, jobRoles } = filters;
    if (price.length > 0) count++;
    if (platforms.length > 0) count++;
    if (difficulty.length > 0) count++;
    if (duration.length > 0) count++;
    if (companies.length > 0) count++;
    if (showWishlisted) count++;
    if (jobRoles.length > 0) count++;
    return count;
  }, [filters]);


  useEffect(() => {
    if (isFilterVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFilterVisible]);

  const filteredCourses = useMemo(() => {
    let processedCourses: Course[] = [...courses];

    if(selectedCategory) {
        processedCourses = processedCourses.filter(course => course.categories.includes(selectedCategory));
    }
    
    if (filters.showWishlisted) {
      processedCourses = processedCourses.filter(course => wishlist.has(course.id));
    }
    
    processedCourses = processedCourses.filter((course) => {
      const query = searchQuery.toLowerCase();
      const matchesQuery =
        query === '' ||
        course.title.toLowerCase().includes(query) ||
        course.provider.toLowerCase().includes(query) ||
        (course.company && course.company.toLowerCase().includes(query)) ||
        course.subjects.some(subject => subject.toLowerCase().includes(query));

      const matchesPrice = filters.price.length === 0 || filters.price.includes(course.price);
      const matchesPlatform = filters.platforms.length === 0 || filters.platforms.includes(course.provider);
      const matchesDifficulty = filters.difficulty.length === 0 || filters.difficulty.includes(course.difficulty);
      const matchesDuration = filters.duration.length === 0 || filters.duration.includes(course.duration);
      const matchesCompany = filters.companies.length === 0 || (course.company && filters.companies.includes(course.company));
      const matchesJobRoles = filters.jobRoles.length === 0 || filters.jobRoles.some(role => course.jobRoles.includes(role));
      
      return matchesQuery && matchesPrice && matchesPlatform && matchesDifficulty && matchesDuration && matchesCompany && matchesJobRoles;
    });

    if (filters.popularity === 'highest-rated') {
      processedCourses.sort((a, b) => b.rating - a.rating);
    } else if (filters.popularity === 'most-enrolled') {
      processedCourses.sort((a, b) => b.enrollment - a.enrollment);
    }

    return processedCourses;
  }, [searchQuery, filters, wishlist, selectedCategory]);

  return (
    <div className="min-h-screen bg-neutral-light">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        
        <CategoryNav selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Mobile Filter Panel (Off-canvas) */}
          {isFilterVisible && (
            <div className="lg:hidden" role="dialog" aria-modal="true">
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity" 
                onClick={() => setIsFilterVisible(false)}
                aria-hidden="true"
              ></div>
              <div 
                className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-neutral-light p-4 overflow-y-auto z-50 shadow-xl"
              >
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-neutral-dark">Filters</h2>
                  <button 
                    onClick={() => setIsFilterVisible(false)}
                    className="p-1 rounded-md text-gray-600 hover:bg-gray-200"
                    aria-label="Close filters"
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>
                <FilterPanel filters={filters} onFilterChange={handleFilterChange} activeFilterCount={activeFilterCount} onClearFilters={clearFilters} />
              </div>
            </div>
          )}

          {/* Desktop Filter Panel (Sidebar) */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
               <FilterPanel filters={filters} onFilterChange={handleFilterChange} activeFilterCount={activeFilterCount} onClearFilters={clearFilters} />
            </div>
          </aside>
          
          <div className="lg:col-span-3">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setIsFilterVisible(true)}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-800 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
                aria-controls="filter-panel"
                aria-expanded={isFilterVisible}
              >
                <FilterIcon className="h-5 w-5 mr-2 text-gray-500" />
                Filter & Sort {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
            </div>
            
            <CourseList courses={filteredCourses} totalCourses={courses.length} wishlist={wishlist} onToggleWishlist={toggleWishlist} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
