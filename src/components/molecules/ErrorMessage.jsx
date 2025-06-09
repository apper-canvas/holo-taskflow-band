import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="text-center">
                <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
                <p className="text-gray-600 mb-4">{message}</p>
                <Button onClick={onRetry} variant="primary">
                    Try Again
                </Button>
            </div>
        </div>
    );
};

export default ErrorMessage;