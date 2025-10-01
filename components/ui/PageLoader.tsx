'use client'

import React from 'react';
import Loader from './Loader';

interface PageLoaderProps {
  message?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="h-20 flex items-center justify-center mb-4">
          <Loader />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Pines VA</h2>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default PageLoader;