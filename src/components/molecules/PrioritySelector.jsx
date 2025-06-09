import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import { motion } from 'framer-motion';

const PrioritySelector = ({ selectedPriority, onChange }) => {
    const priorityOptions = [
        { value: 'low', label: 'Low Priority', icon: 'Minus', color: 'text-success' },
        { value: 'medium', label: 'Medium Priority', icon: 'Clock', color: 'text-warning' },
        { value: 'high', label: 'High Priority', icon: 'AlertCircle', color: 'text-error' }
    ];

    return (
        <div className="grid grid-cols-3 gap-2">
            {priorityOptions.map((option) => (
                <motion.button
                    key={option.value}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onChange(option.value)}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                        selectedPriority === option.value
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                >
                    <ApperIcon 
                        name={option.icon} 
                        size={16} 
                        className={selectedPriority === option.value ? 'text-primary' : option.color}
                    />
                    <span className="text-sm font-medium">
                        {option.label.split(' ')[0]}
                    </span>
                </motion.button>
            ))}
        </div>
    );
};

export default PrioritySelector;