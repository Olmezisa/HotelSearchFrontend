import React from 'react';

const NoResultsFound = () => {
  return (
    <div className="text-center py-16 px-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-700">Sonuç Bulunamadı</h2>
      <p className="text-gray-500 mt-2">Lütfen arama kriterlerinizi değiştirip tekrar deneyin.</p>
    </div>
  );
};

export default NoResultsFound;