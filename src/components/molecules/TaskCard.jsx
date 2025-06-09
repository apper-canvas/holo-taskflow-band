import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Checkbox from '@/components/atoms/Checkbox';
import CategoryBadge from '@/components/molecules/CategoryBadge';
import PriorityBadge from '@/components/molecules/PriorityBadge';
import Button from '@/components/atoms/Button';

const TaskCard = ({ task, onComplete, onEdit, onDelete, categories }) => {
  const category = categories.find(c => c.name === task.category);
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all hover:shadow-md ${
        task.completed ? 'opacity-75' : ''
      } ${isOverdue ? 'border-l-4 border-l-error' : ''}`}
      whileHover={{ scale: 1.01 }}
      layout
    >
      <div className="flex items-start space-x-4">
        {/* Checkbox */}
        <Button onClick={() => onComplete(task.id)} className="mt-1 p-0 bg-transparent shadow-none hover:shadow-none" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Checkbox
            checked={task.completed}
            onChange={() => {}} // onChange is handled by button click
          />
        </Button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold text-gray-900 break-words ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`mt-1 text-sm text-gray-600 break-words ${
                  task.completed ? 'line-through' : ''
                }`}>
                  {task.description}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 ml-4">
              <Button 
                onClick={() => onEdit(task)} 
                variant="ghost" 
                className="p-1 text-gray-400 hover:text-primary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ApperIcon name="Edit2" size={16} />
              </Button>
              <Button 
                onClick={() => onDelete(task.id)} 
                variant="ghost" 
                className="p-1 text-gray-400 hover:text-error"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ApperIcon name="Trash2" size={16} />
              </Button>
            </div>
          </div>

          {/* Meta Information */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-3">
              <PriorityBadge priority={task.priority} />
              <CategoryBadge category={category} />
            </div>

            {/* Due Date */}
            {task.dueDate && (
              <div className={`flex items-center space-x-1 text-xs ${
                isOverdue ? 'text-error font-medium' : 'text-gray-500'
              }`}>
                <ApperIcon 
                  name={isOverdue ? "AlertTriangle" : "Calendar"} 
                  size={12} 
                />
                <span>
                  {isOverdue ? 'Overdue: ' : ''}
                  {format(new Date(task.dueDate), 'MMM d')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskCard;