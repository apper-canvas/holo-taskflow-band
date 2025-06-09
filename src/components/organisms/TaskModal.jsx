import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import FormField from '@/components/molecules/FormField';
import PrioritySelector from '@/components/molecules/PrioritySelector';
import Button from '@/components/atoms/Button';

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
    } else {
        setFormData({
            title: '',
            description: '',
            priority: 'medium',
            category: categories[0]?.name || 'General',
            dueDate: ''
        });
    }
    setErrors({}); // Clear errors when task changes
  }, [task, categories]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today's date to start of day
      
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
              <Button 
                onClick={onClose} 
                variant="ghost" 
                className="p-1 text-gray-400 hover:text-gray-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ApperIcon name="X" size={20} />
              </Button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <FormField
              id="title"
              label="Task Title *"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              placeholder="Enter task title..."
              autoFocus
            />

            <FormField
              id="description"
              type="textarea"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add more details..."
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <PrioritySelector
                selectedPriority={formData.priority}
                onChange={(value) => handleChange('priority', value)}
              />
            </div>

            <FormField
              id="category"
              type="select"
              label="Category"
              value={formData.category}
              onChange={handleChange}
              options={categories.map(cat => ({ value: cat.name, label: cat.name }))}
            />

            <FormField
              id="dueDate"
              type="date"
              label="Due Date"
              value={formData.dueDate}
              onChange={handleChange}
              error={errors.dueDate}
              min={format(new Date(), 'yyyy-MM-dd')}
            />

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button type="button" onClick={onClose} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="flex-1">
                {task ? 'Update Task' : 'Create Task'}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
}

export default TaskModal;