import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

function TaskHeader({ 
  searchQuery, 
  onSearchChange, 
  onQuickAdd, 
  onAddTask, 
  completionPercentage,
  completedCount,
  totalCount 
}) {
  const [quickAddText, setQuickAddText] = useState('');

  const handleQuickAddSubmit = (e) => {
    e.preventDefault();
    if (quickAddText.trim()) {
      onQuickAdd(quickAddText);
      setQuickAddText('');
    }
  };

  const circumference = 2 * Math.PI * 20;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <header className="flex-shrink-0 bg-white border-b border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-primary font-heading">TaskFlow</h1>
          
          {/* Progress Ring */}
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r="20"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="text-gray-200"
              />
              <motion.circle
                cx="22"
                cy="22"
                r="20"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                className="text-primary"
                style={{
                  strokeDasharray,
                  strokeDashoffset
                }}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-gray-700">
                {completionPercentage}%
              </span>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <span className="font-medium text-primary">{completedCount}</span> of{' '}
            <span className="font-medium">{totalCount}</span> tasks completed
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddTask}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg font-medium shadow hover:shadow-lg transition-all"
        >
          <ApperIcon name="Plus" size={16} />
          <span>Add Task</span>
        </motion.button>
      </div>

      <div className="flex space-x-4">
        {/* Search */}
        <div className="relative flex-1">
          <ApperIcon name="Search" className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Quick Add */}
        <form onSubmit={handleQuickAddSubmit} className="flex-1">
          <div className="relative">
            <ApperIcon name="Zap" className="absolute left-3 top-3 w-4 h-4 text-accent" />
            <input
              type="text"
              placeholder="Quick add task..."
              value={quickAddText}
              onChange={(e) => setQuickAddText(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
            />
          </div>
        </form>
      </div>
    </header>
  );
}

export default TaskHeader;