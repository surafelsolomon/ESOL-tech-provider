'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamically load Map component to avoid SSR issues
const Map = dynamic(
    () => import('@/app/components/Map'),
    { ssr: false }
);

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will respond shortly.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="contact-content"
            >
                <h1>Contact Us</h1>
                <p>Get in touch with us</p>

                <div className="contact-grid">
                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows="5"
                                required
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            Send Message
                        </button>
                    </form>

                    {/* Address Section */}
                    <div className="address-section">
                        <h2>Our Office</h2>
                        <p>123 Tech Boulevard</p>
                        <p>Innovation City, IC 45678</p>
                        <p>Email: info@esoltech.com</p>
                        <p>Phone: (555) 123-4567</p>

                        <div className="map-container">
                            <Map />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}