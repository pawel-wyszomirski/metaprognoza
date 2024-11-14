import React from 'react';

const ForecastStats = ({ totalOrders, hasHeatmapData }) => {
  return (
    <div className="mt-4 text-sm text-gray-500">
      <p>Rozkład bazuje na {totalOrders} historycznych zamówieniach</p>
      <p>Ciemniejszy kolor oznacza większą {hasHeatmapData ? 'liczbę zamówień' : 'przewidywaną sprzedaż'} w danej godzinie</p>
      <p>Liczby pokazują przewidywaną ilość zamówień dla każdej godziny</p>
      {hasHeatmapData && (
        <p>Liczby w nawiasach pokazują rzeczywistą liczbę zamówień z pliku CSV</p>
      )}
    </div>
  );
};

export default ForecastStats;