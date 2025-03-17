'use client';
import { motion } from 'framer-motion';
import { FiCheck, FiZap, FiStar } from 'react-icons/fi';

const PricingCard = ({ plan, isPopular, features, price, duration, motionConfig, newPlan }) => {
    return (
        <motion.div
            {...motionConfig}
            className={`pricing-card ${isPopular ? 'popular' : ''} ${newPlan ? 'new-plan' : ''}`}
        >
            {isPopular && (
                <div className="popular-badge">
                    <FiStar className="icon" />
                    <span>Most Popular</span>
                </div>
            )}
            {newPlan && (
                <div className="new-badge">
                    <span>NEW</span>
                </div>
            )}

            <div className="plan-header">
                <h3>{plan}</h3>
                <div className="price-container">
                    <span className="price">{price}</span>
                    {duration && <span className="duration">/{duration}</span>}
                </div>
                {isPopular && <FiZap className="zap-icon" />}
            </div>

            <ul className="features-list">
                {features.map((feature, index) => (
                    <li key={index}>
                        <FiCheck className="check-icon" />
                        {feature}
                    </li>
                ))}
            </ul>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cta-button"
            >
                Get Started
            </motion.button>
        </motion.div>
    );
};

export default PricingCard;