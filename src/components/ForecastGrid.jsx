import React from 'react';
import HourlyCell from './HourlyCell';
import { calculateForecasts } from '../utils/forecastUtils';

const ForecastGrid = ({ hourlyData, hourlyHeatmap, dailyForecast }) => {
  const forecasts = calculateForecasts(hourlyData, dailyForecast);
  const maxForecast = Math.max(...forecasts);
  const maxHeatmap = Math.max(...hourlyHeatmap);

  return (
    <div className="grid grid-cols-6 gap-2">
      {hourlyData.map((data, index) => (
        <HourlyCell
          key={data.hour}
          data={data}
          forecast={forecasts[index]}
          maxForecast={maxForecast}
          heatmapValue={hourlyHeatmap[index]}
          maxHeatmap={maxHeatmap}
        />
      ))}
    </div>
  );
};

export default ForecastGrid;