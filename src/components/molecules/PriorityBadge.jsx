import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const PriorityBadge = ({ priority }) => {
    const priorityConfig = {
        high: { color: 'text-error', bg: 'bg-error/10', icon: 'AlertCircle' },
        medium: { color: 'text-warning', bg: 'bg-warning/10', icon: 'Clock' },
        low: { color: 'text-success', bg: 'bg-success/10', icon: 'Minus' }
    };

    const config = priorityConfig[priority] || priorityConfig.medium;

    return (
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
            <ApperIcon name={config.icon} size={12} />
            <span className="capitalize">{priority}</span>
        </div>
    );
};

export default PriorityBadge;