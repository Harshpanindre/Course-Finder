
import React, { useState } from 'react';
import { Filters, Difficulty, Price, Duration } from '../types';
import { allPlatforms, allCompanies, allJobRoles } from '../data/courses';
import { ChevronDownIcon } from './IconComponents';

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (newFilters: Filters) => void;
  activeFilterCount: number;
  onClearFilters: () => void;
}

const FilterSection: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="py-4 border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-semibold text-neutral-dark"
      >
        <span>{title}</span>
        <ChevronDownIcon className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="mt-4 space-y-2">{children}</div>}
    </div>
  );
};

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange, activeFilterCount, onClearFilters }) => {
  
  const handleCheckboxChange = <T,>(category: keyof Filters, value: T) => {
    const currentValues = filters[category] as T[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    onFilterChange({ ...filters, [category]: newValues });
  };

  const handleRadioChange = (category: keyof Filters, value: string) => {
    onFilterChange({ ...filters, [category]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-neutral-dark">Filter & Sort</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark hover:underline"
          >
            Clear all ({activeFilterCount})
          </button>
        )}
      </div>
      
      <FilterSection title="Popularity">
        <div className="flex flex-col space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="popularity"
              value="highest-rated"
              checked={filters.popularity === 'highest-rated'}
              onChange={() => handleRadioChange('popularity', 'highest-rated')}
              className="h-4 w-4 text-brand-blue focus:ring-brand-blue border-gray-300"
            />
            <span className="text-gray-700">Highest Rated</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="popularity"
              value="most-enrolled"
              checked={filters.popularity === 'most-enrolled'}
              onChange={() => handleRadioChange('popularity', 'most-enrolled')}
              className="h-4 w-4 text-brand-blue focus:ring-brand-blue border-gray-300"
            />
            <span className="text-gray-700">Most Enrolled</span>
          </label>
        </div>
      </FilterSection>

      <FilterSection title="My Wishlist">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.showWishlisted}
            onChange={() => onFilterChange({ ...filters, showWishlisted: !filters.showWishlisted })}
            className="h-4 w-4 rounded text-brand-blue focus:ring-brand-blue border-gray-300"
          />
          <span className="text-gray-700">Show My Wishlist</span>
        </label>
      </FilterSection>

       <FilterSection title="Job Role">
        <div className="max-h-48 overflow-y-auto pr-2">
          {allJobRoles.map((role) => (
            <label key={role} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.jobRoles.includes(role)}
                onChange={() => handleCheckboxChange('jobRoles', role)}
                className="h-4 w-4 rounded text-brand-blue focus:ring-brand-blue border-gray-300"
              />
              <span className="text-gray-700">{role}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price">
        {Object.values(Price).map((price) => (
          <label key={price} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.price.includes(price)}
              onChange={() => handleCheckboxChange('price', price)}
              className="h-4 w-4 rounded text-brand-blue focus:ring-brand-blue border-gray-300"
            />
            <span className="text-gray-700">{price}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Difficulty">
        {Object.values(Difficulty).map((level) => (
          <label key={level} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.difficulty.includes(level)}
              onChange={() => handleCheckboxChange('difficulty', level)}
              className="h-4 w-4 rounded text-brand-blue focus:ring-brand-blue border-gray-300"
            />
            <span className="text-gray-700">{level}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Duration">
        {Object.values(Duration).map((duration) => (
          <label key={duration} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.duration.includes(duration)}
              onChange={() => handleCheckboxChange('duration', duration)}
              className="h-4 w-4 rounded text-brand-blue focus:ring-brand-blue border-gray-300"
            />
            <span className="text-gray-700">{duration}</span>
          </label>
        ))}
      </FilterSection>
      
      <FilterSection title="Platform/Provider" defaultOpen={false}>
        <div className="max-h-48 overflow-y-auto pr-2">
          {allPlatforms.map((platform) => (
            <label key={platform} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.platforms.includes(platform)}
                onChange={() => handleCheckboxChange('platforms', platform)}
                className="h-4 w-4 rounded text-brand-blue focus:ring-brand-blue border-gray-300"
              />
              <span className="text-gray-700">{platform}</span>
            </label>
          ))}
        </div>
      </FilterSection>

       <FilterSection title="Company" defaultOpen={false}>
        <div className="max-h-48 overflow-y-auto pr-2">
          {allCompanies.map((company) => (
            <label key={company} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.companies.includes(company)}
                onChange={() => handleCheckboxChange('companies', company)}
                className="h-4 w-4 rounded text-brand-blue focus:ring-brand-blue border-gray-300"
              />
              <span className="text-gray-700">{company}</span>
            </label>
          ))}
        </div>
      </FilterSection>

    </div>
  );
};

export default FilterPanel;
