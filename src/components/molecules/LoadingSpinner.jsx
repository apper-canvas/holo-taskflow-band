import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="h-screen flex">
            <div className="w-64 bg-surface border-r border-gray-200 p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>
            <div className="flex-1 p-6">
                <div className="animate-pulse space-y-6">
                    <div className="h-16 bg-gray-200 rounded-lg"></div>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;