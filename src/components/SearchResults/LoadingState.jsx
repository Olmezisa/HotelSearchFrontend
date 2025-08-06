import React from 'react';
import { Spinner } from '../common/Spinner';

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 bg-white rounded-xl shadow-md">
      <Spinner />
      <p className="mt-4 text-xl font-semibold text-gray-700">Yükleniyor...</p>
    </div>
  );
};

export default LoadingState;