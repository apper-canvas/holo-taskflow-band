import React from 'react';
import { motion } from 'framer-motion';

const ProgressBarRing = ({ percentage, size = 44, strokeWidth = 3, className }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative`} style={{ width: size, height: size }}>
      <svg className={`w-full h-full transform -rotate-90`} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className="text-primary"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference, // Initial value for animation
          }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold text-gray-700">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBarRing;