import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { taskService, categoryService } from '../services';
import TaskHeader from './TaskHeader';
import CategorySidebar from './CategorySidebar';
import TaskList from './TaskList';
import TaskModal from './TaskModal';

function MainFeature() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showCompleted, setShowCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message || 'Failed to load data');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      setShowModal(false);
      setEditingTask(null);
      toast.success('Task created successfully');
    } catch (err) {
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const updatedTask = await taskService.update(id, taskData);
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
      setShowModal(false);
      setEditingTask(null);
      toast.success('Task updated successfully');
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      const task = tasks.find(t => t.id === id);
      const updatedTask = await taskService.update(id, {
        completed: !task.completed,
        completedAt: !task.completed ? Date.now() : null
      });
      
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
      
      if (!task.completed) {
        toast.success('Task completed! 🎉');
      } else {
        toast.info('Task marked as incomplete');
      }
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success('Task deleted successfully');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (task.archived) return false;
    if (!showCompleted && task.completed) return false;
    if (selectedCategory !== 'all' && task.category !== selectedCategory) return false;
    if (selectedPriority !== 'all' && task.priority !== selectedPriority) return false;
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !task.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const completedTasksCount = tasks.filter(task => task.completed && !task.archived).length;
  const totalTasksCount = tasks.filter(task => !task.archived).length;
  const completionPercentage = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  if (loading) {
    return (
      <div className="h-screen flex">
        <div className="w-64 bg-surface border-r border-gray-200 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-16 bg-gray-200 rounded-lg"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadData}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden max-w-full">
      <CategorySidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
        showCompleted={showCompleted}
        onShowCompletedChange={setShowCompleted}
        tasks={tasks}
      />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TaskHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onQuickAdd={handleCreateTask}
          onAddTask={() => {
            setEditingTask(null);
            setShowModal(true);
          }}
          completionPercentage={completionPercentage}
          completedCount={completedTasksCount}
          totalCount={totalTasksCount}
        />

        <div className="flex-1 overflow-y-auto p-6">
          <TaskList
            tasks={filteredTasks}
            onComplete={handleCompleteTask}
            onEdit={(task) => {
              setEditingTask(task);
              setShowModal(true);
            }}
            onDelete={handleDeleteTask}
            categories={categories}
          />
        </div>
      </div>

      {showModal && (
        <TaskModal
          task={editingTask}
          categories={categories}
          onSave={editingTask ? 
            (data) => handleUpdateTask(editingTask.id, data) : 
            handleCreateTask
          }
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}

export default MainFeature;