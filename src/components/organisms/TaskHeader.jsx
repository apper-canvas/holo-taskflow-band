import React, { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ProgressBarRing from '@/components/atoms/ProgressBarRing';

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

  return (
    <header className="flex-shrink-0 bg-white border-b border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-primary font-heading">TaskFlow</h1>
          
          <ProgressBarRing percentage={completionPercentage} />
          
          <div className="text-sm text-gray-600">
            <span className="font-medium text-primary">{completedCount}</span> of{' '}
            <span className="font-medium">{totalCount}</span> tasks completed
          </div>
        </div>

        <Button onClick={onAddTask}>
          <ApperIcon name="Plus" size={16} />
          <span>Add Task</span>
        </Button>
      </div>

      <div className="flex space-x-4">
        {/* Search */}
        <div className="relative flex-1">
          <ApperIcon name="Search" className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>

        {/* Quick Add */}
        <form onSubmit={handleQuickAddSubmit} className="flex-1">
          <div className="relative">
            <ApperIcon name="Zap" className="absolute left-3 top-3 w-4 h-4 text-accent" />
            <Input
              type="text"
              placeholder="Quick add task..."
              value={quickAddText}
              onChange={(e) => setQuickAddText(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </form>
      </div>
    </header>
  );
}

export default TaskHeader;