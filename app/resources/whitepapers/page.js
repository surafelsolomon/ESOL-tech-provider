// app/resources/whitepapers/page.js
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const whitepapers = [
    {
        id: 1,
        title: "ERP Implementation Guide",
        description: "Comprehensive guide to successful ERP system deployment",
        downloadLink: "/whitepapers/erp-guide.pdf",
        pages: 42,
        published: "February 2024"
    },
    {
        id: 2,
        title: "Cybersecurity Framework",
        description: "Enterprise security best practices and compliance",
        downloadLink: "/whitepapers/security-framework.pdf",
        pages: 36,
        published: "January 2024"
    }
];

export default function Whitepapers() {
    return (
        <div className="resources-container">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="resources-hero">
                    <h1>Technical Whitepapers</h1>
                    <p>In-depth technical guides and industry research documents</p>
                </div>

                <div className="whitepapers-grid">
                    {whitepapers.map((paper, index) => (
                        <motion.div
                            key={paper.id}
                            className="whitepaper-card"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="whitepaper-content">
                                <h2>{paper.title}</h2>
                                <p className="description">{paper.description}</p>
                                <div className="meta">
                                    <span>{paper.pages} pages</span>
                                    <span>•</span>
                                    <span>Published {paper.published}</span>
                                </div>
                                <Link
                                    href={paper.downloadLink}
                                    className="download-button"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Download PDF
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}