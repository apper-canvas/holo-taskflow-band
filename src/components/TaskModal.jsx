import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ApperIcon from './ApperIcon';

function TaskModal({ task, categories, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: categories[0]?.name || 'General',
    dueDate: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        category: task.category || categories[0]?.name || 'General',
        dueDate: task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : ''
      });
    }
  }, [task, categories]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const taskData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).getTime() : null
    };

    onSave(taskData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const priorityOptions = [
    { value: 'low', label: 'Low Priority', icon: 'Minus', color: 'text-success' },
    { value: 'medium', label: 'Medium Priority', icon: 'Clock', color: 'text-warning' },
    { value: 'high', label: 'High Priority', icon: 'AlertCircle', color: 'text-error' }
  ];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 font-heading">
                {task ? 'Edit Task' : 'Create New Task'}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ApperIcon name="X" size={20} />
              </motion.button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg outline-none transition-all ${
                  errors.title 
                    ? 'border-error focus:ring-2 focus:ring-error/20' 
                    : 'border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary'
                }`}
                placeholder="Enter task title..."
                autoFocus
              />
              {errors.title && (
                <p className="mt-1 text-sm text-error">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                placeholder="Add more details..."
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <div className="grid grid-cols-3 gap-2">
                {priorityOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleChange('priority', option.value)}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                      formData.priority === option.value
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <ApperIcon 
                      name={option.icon} 
                      size={16} 
                      className={formData.priority === option.value ? 'text-primary' : option.color}
                    />
                    <span className="text-sm font-medium">
                      {option.label.split(' ')[0]}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                min={format(new Date(), 'yyyy-MM-dd')}
                className={`w-full px-3 py-2 border rounded-lg outline-none transition-all ${
                  errors.dueDate 
                    ? 'border-error focus:ring-2 focus:ring-error/20' 
                    : 'border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary'
                }`}
              />
              {errors.dueDate && (
                <p className="mt-1 text-sm text-error">{errors.dueDate}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium shadow hover:shadow-lg transition-all"
              >
                {task ? 'Update Task' : 'Create Task'}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
}

export default TaskModal;