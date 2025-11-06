'use client';

import { useState, useRef, useEffect } from 'react';
import { WorkCategoryId, WORK_CATEGORY_OPTIONS, WorkCategory } from '@/utils/workCategoryData';

interface WorkCategorySelectorProps {
  value: WorkCategoryId;
  onChange: (categoryId: WorkCategoryId) => void;
}

export default function WorkCategorySelector({ value, onChange }: WorkCategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCategory = WORK_CATEGORY_OPTIONS.find((cat) => cat.id === value) || WORK_CATEGORY_OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (category: WorkCategory) => {
    onChange(category.id);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-theme-primary mb-2">
        หมวดงาน
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border-2 border-theme-gray-medium rounded-lg px-4 py-3 flex items-center justify-between hover:border-gray-800 transition-colors focus:outline-none focus:border-gray-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{selectedCategory.icon}</span>
          <div className="text-left">
            <p className="font-semibold text-theme-primary">{selectedCategory.name}</p>
            <p className="text-xs text-theme-secondary">{selectedCategory.description}</p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-theme-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-theme-gray-medium rounded-lg shadow-xl max-h-96 overflow-y-auto">
          {WORK_CATEGORY_OPTIONS.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleSelect(category)}
              className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors border-b border-theme-gray-light last:border-b-0 ${
                category.id === value ? 'bg-gray-50' : ''
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <div className="text-left flex-1">
                <p className="font-semibold text-theme-primary text-sm">{category.name}</p>
                <p className="text-xs text-theme-secondary">{category.description}</p>
              </div>
              {category.id === value && (
                <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
