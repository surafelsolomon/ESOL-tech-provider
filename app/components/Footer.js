// app/components/Footer.js
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaTwitter, FaLinkedin, FaGithub, FaArrowUp } from 'react-icons/fa';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="footer">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="footer-content"
            >
                <div className="footer-grid">
                    <div className="footer-section">
                        <h3>Esol Tech Provider</h3>
                        <p className="tagline">Innovating Tomorrow's Solutions Today</p>
                        <div className="social-links">
                            <motion.a whileHover={{ scale: 1.1 }} href="#">
                                <FaTwitter className="social-icon" />
                            </motion.a>
                            <motion.a whileHover={{ scale: 1.1 }} href="#">
                                <FaLinkedin className="social-icon" />
                            </motion.a>
                            <motion.a whileHover={{ scale: 1.1 }} href="#">
                                <FaGithub className="social-icon" />
                            </motion.a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link href="/about-us">About Us</Link></li>
                            <li><Link href="/services">Services</Link></li>
                            <li><Link href="/resources">Resources</Link></li>
                            <li><Link href="/contact-us">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Stay Updated</h4>
                        <form className="newsletter-form">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="newsletter-input"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="newsletter-button"
                            >
                                Subscribe
                            </motion.button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Esol Tech Provider. All rights reserved.</p>
                    <motion.button
                        onClick={scrollToTop}
                        className="back-to-top"
                        whileHover={{ scale: 1.1 }}
                    >
                        <FaArrowUp />
                    </motion.button>
                </div>
            </motion.div>
        </footer>
    );
}