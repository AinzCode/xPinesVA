'use client'

import React from 'react';
import Loader from './Loader';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...', 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-12',
    md: 'h-20', 
    lg: 'h-32'
  };

  return (
    <div className={`text-center py-12 ${className}`}>
      <div className={`${sizeClasses[size]} flex items-center justify-center`}>
        <Loader />
      </div>
      {message && <p className="text-gray-600 mt-4">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
