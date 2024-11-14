import React, { useState } from 'react';
import HourlyForecast from './components/HourlyForecast';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <HourlyForecast />
    </div>
  );
}

export default App;