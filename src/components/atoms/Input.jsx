import React from 'react';

const Input = ({ label, id, type = 'text', value, onChange, className, error, ...props }) => {
    return (
        <div>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className={`w-full px-3 py-2 border rounded-lg outline-none transition-all ${
                    error 
                        ? 'border-error focus:ring-2 focus:ring-error/20' 
                        : 'border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary'
                } ${className || ''}`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-error">{error}</p>
            )}
        </div>
    );
};

export default Input;