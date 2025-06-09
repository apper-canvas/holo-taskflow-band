import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className, variant = 'primary', ...props }) => {
    let baseClasses = "px-4 py-2 rounded-lg font-medium shadow hover:shadow-lg transition-all flex items-center justify-center space-x-2";
    let variantClasses = '';

    switch (variant) {
        case 'primary':
            variantClasses = 'bg-primary text-white';
            break;
        case 'secondary':
            variantClasses = 'bg-secondary text-white';
            break;
        case 'outline':
            variantClasses = 'border border-gray-300 text-gray-700 hover:bg-gray-50';
            break;
        case 'ghost':
            variantClasses = 'text-gray-700 hover:bg-gray-100';
            break;
        case 'danger':
            variantClasses = 'bg-error text-white';
            break;
        case 'success':
            variantClasses = 'bg-success text-white';
            break;
        default:
            variantClasses = 'bg-primary text-white';
    }

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`${baseClasses} ${variantClasses} ${className || ''}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;