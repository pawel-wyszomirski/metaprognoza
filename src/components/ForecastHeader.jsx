import React, { useRef } from 'react';

const ForecastHeader = ({ 
  dailyForecast, 
  setDailyForecast, 
  onFileUpload,
  onReset,
  error,
  isLoading 
}) => {
  const fileInputRef = useRef(null);

  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onReset();
  };

  const handleFileUpload = (e) => {
    onFileUpload(e);
  };

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">MetaPrognoza</h1>
      <p className="text-gray-600 mb-4">Inteligentne prognozowanie sprzedaży godzinowej</p>
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Prognozowana dzienna sprzedaż:
              <input
                type="number"
                value={dailyForecast}
                onChange={(e) => setDailyForecast(Math.max(0, parseInt(e.target.value) || 0))}
                className="ml-2 p-1 border rounded"
                min="0"
              />
            </label>
          </div>
          <div className="flex items-end gap-2">
            <label className="block text-sm font-medium">
              Wczytaj dane CSV:
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="ml-2"
                disabled={isLoading}
              />
            </label>
            <button
              onClick={handleReset}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              disabled={isLoading}
            >
              Reset
            </button>
          </div>
        </div>
        {isLoading && (
          <div className="text-blue-600">
            Przetwarzanie pliku...
          </div>
        )}
        {error && (
          <div className="text-red-600">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForecastHeader;