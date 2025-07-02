
import React from 'react';
import { Category } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryFilterValue: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex space-x-2">
          {categories.map((category: Category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.filterValue)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                activeCategory === category.filterValue
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
