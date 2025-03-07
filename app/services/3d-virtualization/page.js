'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ThreeDVirtualization() {
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
                    <h1>3D Virtualization Solutions</h1>
                    <p>Immersive experiences for real estate and product visualization</p>
                    <div className="vr-showcase">
                        <Image
                            src="/images/services/vr-showcase.jpg"
                            alt="VR Experience"
                            width={1200}
                            height={600}
                            className="hero-image"
                        />
                    </div>
                </div>

                <div className="feature-grid">
                    <div className="feature-card">
                        <h2>Core Features</h2>
                        <div className="feature-list">
                            <div className="feature-item">
                                <span>🏠</span>
                                <div>
                                    <h3>Virtual Property Tours</h3>
                                    <p>360° interactive walkthroughs with measurement tools</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span>🛋️</span>
                                <div>
                                    <h3>Product Configurators</h3>
                                    <p>Real-time customization and AR previews</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tech-specs">
                        <h2>Technical Capabilities</h2>
                        <div className="spec-grid">
                            <div className="spec-card">
                                <h3>4K Resolution</h3>
                                <p>Crystal-clear visual fidelity</p>
                            </div>
                            <div className="spec-card">
                                <h3>Cross-Platform</h3>
                                <p>Web, mobile, and VR compatibility</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}