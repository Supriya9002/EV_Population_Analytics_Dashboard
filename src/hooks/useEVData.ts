import { useState, useEffect } from 'react';
import { EVRecord, parseCSVData, getAnalytics } from '../utils/csvParser';

export const useEVData = () => {
  const [data, setData] = useState<EVRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Try to load from public folder first
        const response = await fetch('/ev-data.csv');
        
        if (!response.ok) {
          throw new Error('Failed to load CSV file');
        }
        
        const csvText = await response.text();
        const parsedData = parseCSVData(csvText);
        
        setData(parsedData);
        setError(null);
      } catch (err) {
        console.error('Error loading EV data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
        
        // Fallback to sample data if CSV fails to load
        const { evData } = await import('../data/evData');
        setData(evData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const analytics = data.length > 0 ? getAnalytics(data) : null;

  return {
    data,
    analytics,
    loading,
    error
  };
};