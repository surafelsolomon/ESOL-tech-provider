// app/resources/faqs/page.js
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const faqItems = [
    {
        question: "What industries do you specialize in?",
        answer: "We serve manufacturing, healthcare, logistics, and retail sectors...",
        category: "General"
    },
    {
        question: "How long does ERP implementation take?",
        answer: "Typical implementations range from 3-6 months depending...",
        category: "ERP Solutions"
    }
];

export default function FAQs() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="resources-container">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="resources-hero">
                    <h1>Frequently Asked Questions</h1>
                    <p>Find answers to common queries about our services and solutions</p>
                </div>

                <div className="faq-search">
                    <input
                        type="text"
                        placeholder="Search FAQs..."
                        className="search-input"
                    />
                </div>

                <div className="faq-list">
                    {faqItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="faq-item"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div
                                className="faq-question"
                                onClick={() => toggleFAQ(index)}
                            >
                                <h3>{item.question}</h3>
                                <span className="toggle-icon">
                                    {activeIndex === index ? '−' : '+'}
                                </span>
                            </div>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        className="faq-answer"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <p>{item.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}