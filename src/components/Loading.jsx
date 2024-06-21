import React from 'react';

const LoadingComp = () => {
  return (
    <div className="flex justify-center items-center p-2">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
    </div>
  );
};
export default LoadingComp