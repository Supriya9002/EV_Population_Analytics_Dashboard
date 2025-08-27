import React, { useState, useMemo } from 'react';
import { Car, Factory, MapPin, Zap, Battery, Plug } from 'lucide-react';

import Header from './components/Header';
import MetricCard from './components/MetricCard';
import BarChart from './components/Charts/BarChart';
import PieChart from './components/Charts/PieChart';
import LineChart from './components/Charts/LineChart';
import DataTable from './components/DataTable';
import FilterControls from './components/FilterControls';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

import { useEVData } from './hooks/useEVData';
import { EVRecord } from './utils/csvParser';

function App() {
  const { data: evData, analytics: baseAnalytics, loading, error } = useEVData();
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedEvType, setSelectedEvType] = useState<string>('');

  // Avoid conditional returns before hooks to keep hook order stable

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    return evData.filter((vehicle) => {
      if (selectedYear && vehicle.modelYear.toString() !== selectedYear) return false;
      if (selectedMake && vehicle.make !== selectedMake) return false;
      if (selectedEvType && vehicle.evType !== selectedEvType) return false;
      return true;
    });
  }, [selectedYear, selectedMake, selectedEvType, evData]);

  // Get analytics for filtered data
  const analytics = useMemo(() => {
    const totalVehicles = filteredData.length;
    
    const makeDistribution = filteredData.reduce((acc, record) => {
      acc[record.make] = (acc[record.make] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const yearDistribution = filteredData.reduce((acc, record) => {
      acc[record.modelYear] = (acc[record.modelYear] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    
    const evTypeDistribution = filteredData.reduce((acc, record) => {
      acc[record.evType] = (acc[record.evType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const countyDistribution = filteredData.reduce((acc, record) => {
      acc[record.county] = (acc[record.county] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const averageRange = totalVehicles > 0 
      ? filteredData.reduce((sum, record) => sum + record.electricRange, 0) / totalVehicles
      : 0;
    
    const topMakes = Object.entries(makeDistribution)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
      
    const topCounties = Object.entries(countyDistribution)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
    
    return {
      totalVehicles,
      makeDistribution,
      yearDistribution,
      evTypeDistribution,
      countyDistribution,
      averageRange: Math.round(averageRange),
      topMakes,
      topCounties,
      uniqueMakes: Object.keys(makeDistribution).length,
      bevCount: evTypeDistribution['BEV'] || 0,
      phevCount: evTypeDistribution['PHEV'] || 0,
      bevPercentage: totalVehicles > 0 ? Math.round((evTypeDistribution['BEV'] || 0) / totalVehicles * 100) : 0,
      phevPercentage: totalVehicles > 0 ? Math.round((evTypeDistribution['PHEV'] || 0) / totalVehicles * 100) : 0
    };
  }, [filteredData]);

  // Get unique values for filter options
  const availableYears = [...new Set(evData.map(v => v.modelYear))].filter(y => Number.isFinite(y) && y > 0);
  const availableMakes = [...new Set(evData.map(v => v.make))];

  const handleReset = () => {
    setSelectedYear('');
    setSelectedMake('');
    setSelectedEvType('');
  };

  // Chart data preparation
  const makeChartData = {
    labels: analytics.topMakes.map(([make]) => make),
    datasets: [
      {
        label: 'Number of Vehicles',
        data: analytics.topMakes.map(([, count]) => count),
        backgroundColor: [
          '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444',
          '#14B8A6', '#F97316', '#84CC16', '#EC4899', '#6366F1'
        ],
        borderColor: [
          '#2563EB', '#059669', '#7C3AED', '#D97706', '#DC2626',
          '#0D9488', '#EA580C', '#65A30D', '#DB2777', '#4F46E5'
        ],
        borderWidth: 1,
      },
    ],
  };

  const yearChartData = {
    labels: Object.keys(analytics.yearDistribution)
      .map(y => parseInt(y))
      .filter(y => Number.isFinite(y))
      .sort((a, b) => a - b)
      .map(y => y.toString()),
    datasets: [
      {
        label: 'EV Registrations',
        data: Object.keys(analytics.yearDistribution)
          .map(y => parseInt(y))
          .filter(y => Number.isFinite(y))
          .sort((a, b) => a - b)
          .map(year => analytics.yearDistribution[year]),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const evTypeChartData = {
    labels: Object.keys(analytics.evTypeDistribution),
    datasets: [
      {
        data: Object.values(analytics.evTypeDistribution),
        backgroundColor: ['#10B981', '#3B82F6'],
        borderColor: ['#059669', '#2563EB'],
        borderWidth: 2,
      },
    ],
  };

  const countyChartData = {
    labels: analytics.topCounties.map(([county]) => county),
    datasets: [
      {
        label: 'Number of Vehicles',
        data: analytics.topCounties.map(([, count]) => count),
        backgroundColor: '#8B5CF6',
        borderColor: '#7C3AED',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => window.location.reload()} />
        ) : !evData || evData.length === 0 ? (
          <ErrorMessage message="No EV data available" />
        ) : (
          <>
            <FilterControls
              selectedYear={selectedYear}
              selectedMake={selectedMake}
              selectedEvType={selectedEvType}
              availableYears={availableYears}
              availableMakes={availableMakes}
              onYearChange={setSelectedYear}
              onMakeChange={setSelectedMake}
              onEvTypeChange={setSelectedEvType}
              onReset={handleReset}
            />

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Total EV Vehicles"
                value={analytics.totalVehicles}
                subtitle="Registered vehicles"
                icon={<Car className="h-6 w-6 text-blue-600" />}
                trend={{ value: 15, isPositive: true }}
              />
              <MetricCard
                title="Unique Manufacturers"
                value={analytics.uniqueMakes}
                subtitle="Different brands"
                icon={<Factory className="h-6 w-6 text-green-600" />}
              />
              <MetricCard
                title="Average Range"
                value={`${analytics.averageRange}`}
                subtitle="miles per charge"
                icon={<Zap className="h-6 w-6 text-yellow-600" />}
              />
              <MetricCard
                title="BEV vs PHEV"
                value={`${analytics.bevPercentage}%`}
                subtitle={`${analytics.bevCount} BEV, ${analytics.phevCount} PHEV`}
                icon={<Battery className="h-6 w-6 text-purple-600" />}
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <BarChart
                title="Top EV Manufacturers"
                data={makeChartData}
                height={400}
              />
              <LineChart
                title="EV Adoption by Year"
                data={yearChartData}
                height={400}
              />
              <PieChart
                title="EV Type Distribution"
                data={evTypeChartData}
                height={400}
              />
              <BarChart
                title="Top Counties by EV Count"
                data={countyChartData}
                height={400}
              />
            </div>

            {/* Data Table */}
            <DataTable
              data={filteredData}
              title="EV Population Data"
              maxRows={15}
            />

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Plug className="h-5 w-5" />
                  <span className="text-sm">
                    Data source: Electric Vehicle Population Dataset
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </footer>
          </>
        )}
      </main>
    </div>
  );
}

export default App;