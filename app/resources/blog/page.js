// app/resources/blog/page.js
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const blogPosts = [
    {
        id: 1,
        title: "Digital Transformation in Manufacturing",
        excerpt: "Explore how Industry 4.0 is revolutionizing production lines...",
        date: "March 15, 2024",
        category: "Industry Insights",
        image: "/images/blog/manufacturing-tech.jpg",
        readTime: "5 min"
    },
    {
        id: 2,
        title: "Cloud Security Best Practices",
        excerpt: "Essential strategies for maintaining secure cloud environments...",
        date: "March 12, 2024",
        category: "Cybersecurity",
        image: "/images/blog/cloud-security.jpg",
        readTime: "4 min"
    }
];

export default function Blog() {
    return (
        <div className="resources-container">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="resources-hero">
                    <h1>Tech Insights Blog</h1>
                    <p>Stay updated with the latest industry trends and expert analysis</p>
                </div>

                <div className="blog-grid">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            className="blog-card"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="blog-image">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    width={600}
                                    height={400}
                                    className="responsive-image"
                                />
                            </div>
                            <div className="blog-content">
                                <span className="category">{post.category}</span>
                                <h2>{post.title}</h2>
                                <p className="excerpt">{post.excerpt}</p>
                                <div className="meta">
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span>{post.readTime} read</span>
                                </div>
                                <Link href={`/resources/blog/${post.id}`} className="read-more">
                                    Read Article →
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}