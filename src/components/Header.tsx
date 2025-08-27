import React from 'react';
import { Car, BarChart3, MapPin, Calendar } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-white bg-opacity-20 rounded-full">
            <Car className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">EV Population Analytics Dashboard</h1>
            <p className="text-blue-100 text-lg mt-2">
              Comprehensive analysis of Electric Vehicle adoption and distribution
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center space-x-2 text-blue-100">
            <BarChart3 className="h-5 w-5" />
            <span className="text-sm">Real-time Analytics</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-100">
            <MapPin className="h-5 w-5" />
            <span className="text-sm">Geographic Distribution</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-100">
            <Calendar className="h-5 w-5" />
            <span className="text-sm">Historical Trends</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;