'use client';

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div>
      <div className="parallax"></div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ textAlign: 'center', padding: '2rem' }}
      >
        <h1>Welcome to Esol Tech Provider</h1>
        <p>Your technology solutions partner.</p>
      </motion.div>
    </div>
  );
}
