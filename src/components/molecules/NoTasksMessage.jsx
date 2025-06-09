import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const NoTasksMessage = ({ onAddTask }) => {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-16"
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
            >
                <ApperIcon name="CheckSquare" className="w-16 h-16 text-gray-300 mx-auto" />
            </motion.div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900 font-heading">All caught up!</h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
                You have no tasks in this view. Time to add some new goals or take a well-deserved break.
            </p>
            <Button onClick={onAddTask} className="mt-6">
                <ApperIcon name="Plus" size={16} />
                <span>Add Your First Task</span>
            </Button>
        </motion.div>
    );
};

export default NoTasksMessage;