import React from 'react';

const TextArea = ({ label, id, value, onChange, rows = 3, className, error, ...props }) => {
    return (
        <div>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                rows={rows}
                className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none ${className || ''} ${
                    error ? 'border-error focus:ring-error/20' : 'border-gray-300'
                }`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-error">{error}</p>
            )}
        </div>
    );
};

export default TextArea;