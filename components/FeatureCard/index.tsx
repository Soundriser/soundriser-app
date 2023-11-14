import React from 'react';

const FeatureCard = ({ title, description, isNew, isWorkInProgress }:any) => {
  const cardClasses = `bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transform ${isWorkInProgress ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${isNew ? 'border-l-4 border-[#F99940]' : 'border-l-4 border-gray-300'}`;

  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
        {isWorkInProgress ? (
          <>
            {title} <span className="text-sm text-red-500 block mt-2">Coming soon in 2024</span>
          </>
        ) : (
          title
        )}
      </h2>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default FeatureCard;
