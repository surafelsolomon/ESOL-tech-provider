'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function OtherServices() {
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
                    <h1>Technology Consulting Services</h1>
                    <p>Strategic guidance for digital transformation</p>
                </div>

                <div className="consulting-areas">
                    <h2>Our Expertise</h2>
                    <div className="area-grid">
                        <div className="area-card">
                            <h3>Cloud Migration</h3>
                            <ul>
                                <li>AWS/Azure/GCP integration</li>
                                <li>Cost optimization</li>
                                <li>Security architecture</li>
                            </ul>
                        </div>
                        <div className="area-card">
                            <h3>Cybersecurity</h3>
                            <ul>
                                <li>Risk assessments</li>
                                <li>Compliance audits</li>
                                <li>Incident response</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="methodology">
                    <h2>Implementation Framework</h2>
                    <div className="phase-timeline">
                        <div className="phase">
                            <div className="phase-marker"></div>
                            <h3>Discovery & Planning</h3>
                            <p>Requirements analysis and roadmap development</p>
                        </div>
                        <div className="phase">
                            <div className="phase-marker"></div>
                            <h3>Execution & Integration</h3>
                            <p>Agile implementation with continuous feedback</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}