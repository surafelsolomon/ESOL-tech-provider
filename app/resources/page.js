// app/resources/page.js
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Resources() {
    const resourceCategories = [
        {
            title: "Tech Blog",
            description: "Latest industry insights and technical articles",
            path: "/resources/blog",
            icon: "/images/resources/blog-icon.svg",
            color: "var(--primary-color)"
        },
        {
            title: "Whitepapers",
            description: "In-depth technical guides and research documents",
            path: "/resources/whitepapers",
            icon: "/images/resources/whitepaper-icon.svg",
            color: "#2ecc71"
        },
        {
            title: "FAQs",
            description: "Answers to common questions about our services",
            path: "/resources/faqs",
            icon: "/images/resources/faq-icon.svg",
            color: "#e67e22"
        },
        {
            title: "Webinars",
            description: "Live and recorded expert sessions",
            path: "/resources/webinars",
            icon: "/images/resources/webinar-icon.svg",
            color: "#9b59b6"
        }
    ];

    return (
        <div className="resources-hub">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="hub-hero">
                    <h1>Knowledge Center</h1>
                    <p>Explore our technical resources and educational materials</p>
                </div>

                <div className="resource-grid">
                    {resourceCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Link href={category.path} className="resource-card">
                                <div
                                    className="card-header"
                                    style={{ backgroundColor: category.color }}
                                >
                                    <Image
                                        src={category.icon}
                                        alt={category.title}
                                        width={80}
                                        height={80}
                                        className="category-icon"
                                    />
                                </div>
                                <div className="card-body">
                                    <h2>{category.title}</h2>
                                    <p>{category.description}</p>
                                    <span className="explore-link">
                                        Explore →
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
