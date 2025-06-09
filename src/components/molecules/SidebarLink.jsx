import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const SidebarLink = ({ 
    icon, 
    label, 
    count, 
    onClick, 
    isActive, 
    color, 
    activeColorClass, 
    inactiveColorClass 
}) => {
    const buttonClasses = `w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all ${
        isActive 
            ? activeColorClass 
            : 'text-gray-700 hover:bg-white hover:shadow-sm'
    }`;
    
    const countClasses = `text-xs px-2 py-1 rounded-full ${
        isActive 
            ? 'bg-white/20 text-white' 
            : 'bg-gray-100 text-gray-600'
    }`;

    return (
        <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            onClick={onClick}
            className={buttonClasses}
        >
            <div className="flex items-center space-x-3">
                {icon && typeof icon === 'string' ? (
                    <ApperIcon name={icon} size={16} className={isActive ? 'text-white' : inactiveColorClass || 'text-gray-500'} />
                ) : (
                    icon 
                )}
                <span className="font-medium">{label}</span>
            </div>
            {typeof count === 'number' && (
                <span className={countClasses}>
                    {count}
                </span>
            )}
        </motion.button>
    );
};

export default SidebarLink;