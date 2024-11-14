export const formatHour = (hour) => `${hour}:00`;

export const getColor = (forecast, maxForecast, heatmapValue, maxHeatmap) => {
  if (forecast === 0) {
    return 'rgb(230, 240, 255)';
  }
  
  // Jeśli mamy dane heatmapy, używamy ich do kolorowania
  if (maxHeatmap > 0) {
    const ratio = heatmapValue / maxHeatmap;
    const intensity = Math.round(255 * (1 - ratio));
    return `rgb(${intensity}, ${intensity + 40}, 255)`;
  }
  
  // W przeciwnym razie używamy prognozy
  const ratio = forecast / maxForecast;
  const r = Math.round(200 * (1 - ratio));
  const g = Math.round(220 * (1 - ratio));
  const b = Math.round(255 - (100 * ratio));
  
  return `rgb(${r}, ${g}, ${b})`;
};

export const calculateForecasts = (hourlyData, dailyForecast) => {
  // Oblicz dokładne wartości (z miejscami po przecinku)
  const exactForecasts = hourlyData.map(data => (data.percentage * dailyForecast) / 100);
  
  // Zaokrąglij w dół wszystkie wartości
  const floorForecasts = exactForecasts.map(Math.floor);
  
  // Oblicz sumę zaokrąglonych wartości
  const currentSum = floorForecasts.reduce((sum, val) => sum + val, 0);
  
  // Oblicz ile jednostek brakuje do docelowej sumy
  const remaining = dailyForecast - currentSum;
  
  // Oblicz części dziesiętne i posortuj je malejąco
  const decimals = exactForecasts.map((exact, index) => ({
    index,
    decimal: exact - Math.floor(exact)
  })).sort((a, b) => b.decimal - a.decimal);
  
  // Dodaj brakujące jednostki do największych części dziesiętnych
  const result = [...floorForecasts];
  for (let i = 0; i < remaining; i++) {
    const index = decimals[i % decimals.length].index;
    result[index]++;
  }
  
  return result;
};