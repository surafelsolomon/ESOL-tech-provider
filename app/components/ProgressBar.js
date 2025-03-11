'use client';
import { motion } from 'framer-motion';

export const ProgressBar = ({ percentage }) => {
    return (
        <div className="progress-bar-container">
            <motion.div
                className="progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
            />
            <span className="progress-percentage">{percentage}%</span>
        </div>
    );
};