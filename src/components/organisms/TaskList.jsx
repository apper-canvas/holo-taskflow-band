import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from '@/components/molecules/TaskCard';
import NoTasksMessage from '@/components/molecules/NoTasksMessage';

function TaskList({ tasks, onComplete, onEdit, onDelete, categories, onAddTask }) {
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
    return <NoTasksMessage onAddTask={onAddTask} />;
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
              x: task.completed ? 100 : -100, // Direction depends on completion
              transition: { duration: 0.3 }
            }}
            whileHover={{ y: -2 }}
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