import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'default' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    default: 'h-8 w-8',
    large: 'h-12 w-12',
  };

  return (
    <div className="flex justify-center items-center py-12">
      <Loader2 className={`${sizeClasses[size]} text-primary-600 animate-spin`} />
    </div>
  );
};

export default LoadingSpinner;