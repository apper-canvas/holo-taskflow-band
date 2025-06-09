import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConfettiAnimation = ({ positions }) => {
    return (
        <AnimatePresence>
            {positions.map(pos => (
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
    );
};

export default ConfettiAnimation;