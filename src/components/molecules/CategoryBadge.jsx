import React from 'react';

const CategoryBadge = ({ category }) => {
    if (!category) return null;

    return (
        <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: category.color }}
            />
            <span>{category.name}</span>
        </div>
    );
};

export default CategoryBadge;