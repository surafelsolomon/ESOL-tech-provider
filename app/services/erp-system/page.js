'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ERPSYSTEM() {
    return (
        <div className="service-detail">
            {/* Add this back button section */}
            <div className="back-button-container">
                <Link href="/services" className="back-button">
                    ← Back to Services
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="service-hero">
                    <h1>Enterprise Resource Planning Solutions</h1>
                    <p>Streamline operations with our comprehensive ERP system</p>
                    <Image
                        src="/images/services/erp-dashboard.jpg"
                        alt="ERP Dashboard"
                        width={1200}
                        height={600}
                        className="hero-image"
                    />
                </div>

                <div className="feature-grid">
                    <div className="feature-card">
                        <h2>Core Modules</h2>
                        <div className="feature-list">
                            <div className="feature-item">
                                <span>📈</span>
                                <div>
                                    <h3>Financial Management</h3>
                                    <p>Real-time accounting, budgeting, and financial reporting</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span>📦</span>
                                <div>
                                    <h3>Inventory Control</h3>
                                    <p>Automated stock tracking and demand forecasting</p>
                                </div>
                            </div>
                            {/* Add more features */}
                        </div>
                    </div>

                    <div className="implementation-steps">
                        <h2>Implementation Process</h2>
                        <div className="step">
                            <div className="step-number">1</div>
                            <div className="step-content">
                                <h3>Needs Assessment</h3>
                                <p>Comprehensive analysis of business processes</p>
                            </div>
                        </div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <div className="step-content">
                                <h3>System Customization</h3>
                                <p>Tailored workflows and module configuration</p>
                            </div>
                        </div>
                        {/* Add more steps */}
                    </div>
                </div>

                <div className="benefits-section">
                    <h2>Key Benefits</h2>
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <h3>Operational Efficiency</h3>
                            <p>30% reduction in manual processes</p>
                        </div>
                        <div className="benefit-card">
                            <h3>Real-time Analytics</h3>
                            <p>Interactive dashboards with live data</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}