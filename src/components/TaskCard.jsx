import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ApperIcon from './ApperIcon';

function TaskCard({ task, onComplete, onEdit, onDelete, categories }) {
  const category = categories.find(c => c.name === task.category);
  const priorityConfig = {
    high: { color: 'text-error', bg: 'bg-error/10', icon: 'AlertCircle' },
    medium: { color: 'text-warning', bg: 'bg-warning/10', icon: 'Clock' },
    low: { color: 'text-success', bg: 'bg-success/10', icon: 'Minus' }
  };

  const priority = priorityConfig[task.priority] || priorityConfig.medium;
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all hover:shadow-md ${
        task.completed ? 'opacity-75' : ''
      } ${isOverdue ? 'border-l-4 border-l-error' : ''}`}
      whileHover={{ scale: 1.02 }}
      layout
    >
      <div className="flex items-start space-x-4">
        {/* Checkbox */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onComplete(task.id)}
          className="mt-1"
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => {}}
            className="task-checkbox"
          />
        </motion.button>

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
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onEdit(task)}
                className="p-1 text-gray-400 hover:text-primary transition-colors"
              >
                <ApperIcon name="Edit2" size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(task.id)}
                className="p-1 text-gray-400 hover:text-error transition-colors"
              >
                <ApperIcon name="Trash2" size={16} />
              </motion.button>
            </div>
          </div>

          {/* Meta Information */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-3">
              {/* Priority Badge */}
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${priority.bg} ${priority.color}`}>
                <ApperIcon name={priority.icon} size={12} />
                <span className="capitalize">{task.priority}</span>
              </div>

              {/* Category Badge */}
              {category && (
                <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span>{category.name}</span>
                </div>
              )}
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