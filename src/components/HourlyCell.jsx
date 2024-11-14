import React from 'react';
import { formatHour, getColor } from '../utils/forecastUtils';

const HourlyCell = ({ data, forecast, maxForecast, heatmapValue, maxHeatmap }) => {
  const backgroundColor = getColor(forecast, maxForecast, heatmapValue, maxHeatmap);
  const textColor = forecast === 0 || forecast / maxForecast <= 0.5 ? 'black' : 'white';

  return (
    <div
      className="relative p-4 rounded-lg transition-colors duration-200"
      style={{
        backgroundColor,
        color: textColor
      }}
    >
      <div className="text-xs font-medium">{formatHour(data.hour)}</div>
      <div className="text-lg font-bold">
        {forecast}
      </div>
      <div className="text-xs">
        {data.percentage.toFixed(1)}%
      </div>
      {heatmapValue > 0 && (
        <div className="text-xs mt-1">
          ({heatmapValue})
        </div>
      )}
    </div>
  );
};

export default React.memo(HourlyCell);