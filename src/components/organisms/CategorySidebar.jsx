import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import SidebarLink from '@/components/molecules/SidebarLink';

function CategorySidebar({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  selectedPriority,
  onPriorityChange,
  showCompleted,
  onShowCompletedChange,
  tasks 
}) {
  const getCategoryCount = (categoryName) => {
    if (categoryName === 'all') {
      return tasks.filter(task => !task.archived && !task.completed).length;
    }
    return tasks.filter(task => 
      task.category === categoryName && !task.archived && !task.completed
    ).length;
  };

  const priorities = [
    { value: 'all', label: 'All Priorities', icon: 'List' },
    { value: 'high', label: 'High Priority', icon: 'AlertCircle', color: 'text-error' },
    { value: 'medium', label: 'Medium Priority', icon: 'Clock', color: 'text-warning' },
    { value: 'low', label: 'Low Priority', icon: 'Minus', color: 'text-success' }
  ];

  return (
    <div className="w-64 bg-surface border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 font-heading">Categories</h2>
        
        <div className="space-y-1 mb-6">
          <SidebarLink
            label="All Tasks"
            icon="Grid3X3"
            count={getCategoryCount('all')}
            onClick={() => onCategoryChange('all')}
            isActive={selectedCategory === 'all'}
            activeColorClass="bg-primary text-white shadow-sm"
          />

          {categories.map((category) => (
            <SidebarLink
              key={category.id}
              label={category.name}
              icon={<div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />}
              count={getCategoryCount(category.name)}
              onClick={() => onCategoryChange(category.name)}
              isActive={selectedCategory === category.name}
              activeColorClass="bg-primary text-white shadow-sm"
            />
          ))}
        </div>

        <h3 className="text-md font-semibold text-gray-900 mb-3 font-heading">Priority</h3>
        <div className="space-y-1 mb-6">
          {priorities.map((priority) => (
            <SidebarLink
              key={priority.value}
              label={priority.label}
              icon={priority.icon}
              onClick={() => onPriorityChange(priority.value)}
              isActive={selectedPriority === priority.value}
              activeColorClass="bg-secondary text-white shadow-sm"
              inactiveColorClass={priority.color}
            />
          ))}
        </div>

        <h3 className="text-md font-semibold text-gray-900 mb-3 font-heading">View Options</h3>
        <SidebarLink
          label={showCompleted ? 'Hide Completed' : 'Show Completed'}
          icon={showCompleted ? "EyeOff" : "Eye"}
          onClick={() => onShowCompletedChange(!showCompleted)}
          isActive={showCompleted}
          activeColorClass="bg-success text-white shadow-sm"
          inactiveColorClass="text-gray-500"
        />
      </div>
    </div>
  );
}

export default CategorySidebar;