'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Services() {
    const services = [
        {
            title: "ERP Solutions",
            icon: "📊",
            description: "Comprehensive enterprise resource planning solutions tailored to your business needs",
            features: [
                "Finance & Accounting",
                "Inventory Management",
                "HR & Payroll",
                "Sales & CRM",
                "Custom Reporting"
            ],
            path: "/services/erp-system"
        },
        {
            title: "3D Virtualization",
            icon: "🖥️",
            description: "Immersive virtual tours and product visualization solutions",
            features: [
                "Virtual Property Tours",
                "Product Configurators",
                "Interactive Walkthroughs",
                "VR Compatibility",
                "Analytics Dashboard"
            ],
            path: "/services/3d-virtualization"
        },
        {
            title: "Tech Consulting",
            icon: "💡",
            description: "Strategic technology advisory and implementation services",
            features: [
                "Digital Transformation",
                "System Integration",
                "Cloud Migration",
                "IT Infrastructure",
                "Security Audits"
            ],
            path: "/services/other-services"
        }
    ];

    return (
        <div className="services-page">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="services-hero">
                    <h1>Our Technology Solutions</h1>
                    <p>Driving digital transformation through innovative solutions</p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="service-card"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="service-icon">{service.icon}</div>
                            <h2>{service.title}</h2>
                            <p className="service-description">{service.description}</p>

                            <div className="service-features">
                                {service.features.map((feature, fIndex) => (
                                    <div key={fIndex} className="feature-item">
                                        <span>✔</span> {feature}
                                    </div>
                                ))}
                            </div>

                            <Link href={service.path} className="learn-more">
                                Explore Solution →
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="technology-stack">
                    <h2>Supported Technologies</h2>
                    <div className="tech-logos">
                        <Image
                            src="/images/services/aws.png"
                            alt="AWS"
                            width={80}
                            height={80}
                        />
                        <Image
                            src="/images/services/react.png"
                            alt="React"
                            width={80}
                            height={80}
                        />
                        <Image
                            src="/images/services/nodejs.png"
                            alt="Node.js"
                            width={80}
                            height={80}
                        />
                        <Image
                            src="/images/services/azure.png"
                            alt="Azure"
                            width={80}
                            height={80}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}