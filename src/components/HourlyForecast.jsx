import React, { useState } from 'react';
import ForecastHeader from './ForecastHeader';
import ForecastGrid from './ForecastGrid';
import ForecastStats from './ForecastStats';
import { useHourlyData } from '../hooks/useHourlyData';

const HourlyForecast = () => {
  const [dailyForecast, setDailyForecast] = useState(100);
  const { 
    hourlyData, 
    hourlyHeatmap,
    totalOrders, 
    handleFileUpload, 
    resetToDefault,
    error,
    isLoading 
  } = useHourlyData();

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <ForecastHeader 
        dailyForecast={dailyForecast}
        setDailyForecast={setDailyForecast}
        onFileUpload={handleFileUpload}
        onReset={resetToDefault}
        error={error}
        isLoading={isLoading}
      />
      <ForecastGrid 
        hourlyData={hourlyData}
        hourlyHeatmap={hourlyHeatmap}
        dailyForecast={dailyForecast}
      />
      {totalOrders > 0 && (
        <ForecastStats 
          totalOrders={totalOrders} 
          hasHeatmapData={hourlyHeatmap.some(count => count > 0)}
        />
      )}
    </div>
  );
};

export default HourlyForecast;