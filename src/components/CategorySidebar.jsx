import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

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
          <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            onClick={() => onCategoryChange('all')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all ${
              selectedCategory === 'all' 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-gray-700 hover:bg-white hover:shadow-sm'
            }`}
          >
            <div className="flex items-center space-x-3">
              <ApperIcon name="Grid3X3" size={16} />
              <span className="font-medium">All Tasks</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              selectedCategory === 'all' 
                ? 'bg-white/20 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {getCategoryCount('all')}
            </span>
          </motion.button>

          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02, x: 4 }}
              onClick={() => onCategoryChange(category.name)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all ${
                selectedCategory === category.name
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-700 hover:bg-white hover:shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="font-medium">{category.name}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                selectedCategory === category.name
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {getCategoryCount(category.name)}
              </span>
            </motion.button>
          ))}
        </div>

        <h3 className="text-md font-semibold text-gray-900 mb-3 font-heading">Priority</h3>
        <div className="space-y-1 mb-6">
          {priorities.map((priority) => (
            <motion.button
              key={priority.value}
              whileHover={{ scale: 1.02, x: 4 }}
              onClick={() => onPriorityChange(priority.value)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all ${
                selectedPriority === priority.value
                  ? 'bg-secondary text-white shadow-sm'
                  : 'text-gray-700 hover:bg-white hover:shadow-sm'
              }`}
            >
              <ApperIcon 
                name={priority.icon} 
                size={16} 
                className={selectedPriority === priority.value ? 'text-white' : priority.color || 'text-gray-500'}
              />
              <span className="font-medium">{priority.label}</span>
            </motion.button>
          ))}
        </div>

        <h3 className="text-md font-semibold text-gray-900 mb-3 font-heading">View Options</h3>
        <motion.button
          whileHover={{ scale: 1.02, x: 4 }}
          onClick={() => onShowCompletedChange(!showCompleted)}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all ${
            showCompleted
              ? 'bg-success text-white shadow-sm'
              : 'text-gray-700 hover:bg-white hover:shadow-sm'
          }`}
        >
          <ApperIcon 
            name={showCompleted ? "EyeOff" : "Eye"} 
            size={16} 
            className={showCompleted ? 'text-white' : 'text-gray-500'}
          />
          <span className="font-medium">
            {showCompleted ? 'Hide Completed' : 'Show Completed'}
          </span>
        </motion.button>
      </div>
    </div>
  );
}

export default CategorySidebar;