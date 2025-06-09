import React from 'react';

const Select = ({ label, id, value, onChange, options, className, ...props }) => {
    return (
        <div>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <select
                id={id}
                value={value}
                onChange={onChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${className || ''}`}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;