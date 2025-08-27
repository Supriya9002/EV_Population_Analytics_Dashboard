import React from 'react';

interface FilterControlsProps {
  selectedYear: string;
  selectedMake: string;
  selectedEvType: string;
  availableYears: number[];
  availableMakes: string[];
  onYearChange: (year: string) => void;
  onMakeChange: (make: string) => void;
  onEvTypeChange: (evType: string) => void;
  onReset: () => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  selectedYear,
  selectedMake,
  selectedEvType,
  availableYears,
  availableMakes,
  onYearChange,
  onMakeChange,
  onEvTypeChange,
  onReset
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter Data</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:flex-1 lg:max-w-2xl">
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Model Year
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => onYearChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Years</option>
              {availableYears.sort((a, b) => b - a).map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
              Make
            </label>
            <select
              id="make"
              value={selectedMake}
              onChange={(e) => onMakeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Makes</option>
              {availableMakes.sort().map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="evType" className="block text-sm font-medium text-gray-700 mb-1">
              EV Type
            </label>
            <select
              id="evType"
              value={selectedEvType}
              onChange={(e) => onEvTypeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="BEV">Battery Electric (BEV)</option>
              <option value="PHEV">Plug-in Hybrid (PHEV)</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={onReset}
              className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-medium transition-colors duration-200"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;