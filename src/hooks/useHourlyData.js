import { useState } from 'react';
import Papa from 'papaparse';
import _ from 'lodash';
import { defaultHourlyDistribution } from '../utils/constants';

export const useHourlyData = () => {
  const [hourlyData, setHourlyData] = useState(defaultHourlyDistribution);
  const [hourlyHeatmap, setHourlyHeatmap] = useState(Array(24).fill(0));
  const [totalOrders, setTotalOrders] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setError('Proszę wybrać plik CSV');
      return;
    }

    setIsLoading(true);
    setError('');

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          if (results.errors.length > 0) {
            console.error('CSV parsing errors:', results.errors);
            setError('Błąd podczas przetwarzania pliku CSV');
            return;
          }

          // Filtruj tylko opłacone zamówienia
          const paidOrders = results.data.filter(row => {
            const isPaid = row.status === 'paid';
            const date = new Date(row.createdAt);
            const isValidDate = !isNaN(date.getTime());
            return isPaid && isValidDate;
          });

          if (paidOrders.length === 0) {
            setError('Brak opłaconych zamówień w pliku');
            return;
          }

          // Grupuj zamówienia według godziny
          const hourlyPaidCounts = _.countBy(paidOrders, (order) => {
            const date = new Date(order.createdAt);
            return date.getHours();
          });

          // Przygotuj tablicę z liczbą zamówień dla każdej godziny
          const heatmapData = Array(24).fill(0).map((_, hour) => hourlyPaidCounts[hour] || 0);

          const totalPurchases = heatmapData.reduce((sum, count) => sum + count, 0);

          // Oblicz rozkład procentowy
          const distribution = heatmapData.map((count, hour) => ({
            hour,
            percentage: (count / totalPurchases) * 100
          }));

          setHourlyData(distribution);
          setHourlyHeatmap(heatmapData);
          setTotalOrders(totalPurchases);
          setError('');
        } catch (err) {
          console.error('Error processing data:', err);
          setError('Wystąpił błąd podczas przetwarzania danych');
        } finally {
          setIsLoading(false);
        }
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
        setError('Błąd podczas odczytu pliku CSV');
        setIsLoading(false);
      }
    });
  };

  const resetToDefault = () => {
    setHourlyData(defaultHourlyDistribution);
    setHourlyHeatmap(Array(24).fill(0));
    setTotalOrders(0);
    setError('');
  };

  return { 
    hourlyData, 
    hourlyHeatmap,
    totalOrders, 
    handleFileUpload, 
    resetToDefault,
    error,
    isLoading 
  };
};