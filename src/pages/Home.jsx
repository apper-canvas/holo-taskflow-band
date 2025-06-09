import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { taskService, categoryService } from '../services';
import TaskHeader from '../components/TaskHeader';
import CategorySidebar from '../components/CategorySidebar';
import TaskList from '../components/TaskList';
import TaskModal from '../components/TaskModal';
import ApperIcon from '../components/ApperIcon';

function Home() {
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
  const [confettiPositions, setConfettiPositions] = useState([]);

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
        // Trigger confetti animation
        const positions = Array.from({ length: 12 }, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: i * 0.1
        }));
        setConfettiPositions(positions);
        
        setTimeout(() => setConfettiPositions([]), 1000);
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

  const handleQuickAdd = (title) => {
    if (title.trim()) {
      handleCreateTask({
        title: title.trim(),
        description: '',
        priority: 'medium',
        category: selectedCategory === 'all' ? categories[0]?.name || 'General' : selectedCategory,
        dueDate: null
      });
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
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
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
      {/* Confetti Animation */}
      <AnimatePresence>
        {confettiPositions.map(pos => (
          <motion.div
            key={pos.id}
            initial={{ scale: 0, rotate: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 1.2, 0],
              rotate: [0, 180, 360],
              opacity: [1, 0.8, 0],
              x: [pos.x + '%', (pos.x + 20) + '%'],
              y: [pos.y + '%', (pos.y + 30) + '%']
            }}
            transition={{ 
              duration: 0.6, 
              delay: pos.delay,
              ease: "easeOut"
            }}
            className="fixed w-2 h-2 bg-accent rounded-full pointer-events-none z-50"
            style={{ left: pos.x + '%', top: pos.y + '%' }}
          />
        ))}
      </AnimatePresence>

      {/* Category Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TaskHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onQuickAdd={handleQuickAdd}
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

      {/* Task Modal */}
      <AnimatePresence>
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
      </AnimatePresence>
    </div>
  );
}

export default Home;