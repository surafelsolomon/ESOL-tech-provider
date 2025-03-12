'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import PricingCard from '../components/PricingCard';
import {
    FaCreditCard,
    FaPaypal,
    FaEthereum,
    FaGoogleWallet,
    FaCcVisa,
    FaCcMastercard
} from 'react-icons/fa';

const PricingPage = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // ERP Pricing Data
    const erpPlans = [
        {
            plan: "Cloud Standard",
            price: "6,000 ETB",
            duration: "month",
            features: [
                "1 Module Included",
                "Up to 5 Users",
                "Single Company",
                "Basic Support",
                "Financial Module"
            ],
            popular: false
        },
        // Add more ERP plans...
    ];

    // 3D Virtualization Pricing Data
    const virtualizationPlans = [
        {
            plan: "Professional Tier",
            price: "19,999 ETB",
            features: [
                "5-20 Active Spaces",
                "360° Camera Support",
                "Advanced Analytics",
                "Custom Watermarks",
                "Priority Support"
            ],
            popular: true
        },
        // Add more 3D plans...
    ];

    // Animation configurations
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="pricing-page">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pricing-hero"
            >
                <h1>Flexible Pricing Plans</h1>
                <p>Choose the perfect solution for your business needs</p>
            </motion.section>

            {/* ERP Pricing Section */}
            <motion.section
                ref={ref}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.2 }
                    }
                }}
                className="pricing-section"
            >
                <h2>ERP Solutions</h2>
                <div className="pricing-grid">
                    {erpPlans.map((plan, index) => (
                        <PricingCard
                            key={`erp-${index}`}
                            motionConfig={{
                                variants: cardVariants,
                                transition: { duration: 0.5, delay: index * 0.2 }
                            }}
                            {...plan}
                        />
                    ))}
                </div>
            </motion.section>

            {/* 3D Virtualization Section */}
            <motion.section
                className="pricing-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
            >
                <h2>3D Virtualization</h2>
                <div className="pricing-grid">
                    {virtualizationPlans.map((plan, index) => (
                        <PricingCard
                            key={`3d-${index}`}
                            motionConfig={{
                                initial: { scale: 0.9 },
                                whileInView: { scale: 1 },
                                viewport: { once: true }
                            }}
                            {...plan}
                        />
                    ))}
                </div>
            </motion.section>

            {/* Payment Methods Section */}
            <motion.section
                className="payment-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <h2>Supported Payment Methods</h2>
                <div className="payment-grid">
                    {[FaCreditCard, FaPaypal, FaEthereum, FaGoogleWallet, FaCcVisa, FaCcMastercard].map((Icon, index) => (
                        <motion.div
                            key={`payment-${index}`}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="payment-method"
                        >
                            <Icon className="payment-icon" />
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
};

export default PricingPage;