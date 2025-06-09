import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';
import ApperIcon from './ApperIcon';

function TaskList({ tasks, onComplete, onEdit, onDelete, categories }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-16"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <ApperIcon name="CheckSquare" className="w-16 h-16 text-gray-300 mx-auto" />
        </motion.div>
        <h3 className="mt-4 text-xl font-semibold text-gray-900 font-heading">All caught up!</h3>
        <p className="mt-2 text-gray-500 max-w-md mx-auto">
          You have no tasks in this view. Time to add some new goals or take a well-deserved break.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg font-medium cursor-pointer"
        >
          <ApperIcon name="Plus" size={16} />
          <span>Add Your First Task</span>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-3"
    >
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            variants={item}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 0.9,
              x: task.completed ? 100 : -100,
              transition: { duration: 0.3 }
            }}
            whileHover={{ y: -2, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <TaskCard
              task={task}
              onComplete={onComplete}
              onEdit={onEdit}
              onDelete={onDelete}
              categories={categories}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default TaskList;