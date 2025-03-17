'use client';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('success');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        emailjs.send(
            process.env.EMAILJS_SERVICE_ID,
            process.env.EMAILJS_TEMPLATE_ID,
            formData,
            process.env.EMAILJS_USER_ID
        )
            .then((response) => {
                console.log('Email sent:', response);
                setPopupMessage('Your message has been sent successfully!');
                setPopupType('success');
                setShowPopup(true);
                // Clear form after successful submission
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            })
            .catch((error) => {
                console.error('Email sending failed:', error);
                setPopupMessage('There was an error sending your message. Please try again.');
                setPopupType('error');
                setShowPopup(true);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="contact-container">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="contact-content"
            >
                <div className="contact-header">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Contact Us
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Get in touch with our team for any inquiries or support needs
                    </motion.p>
                </div>

                <div className="contact-form-container">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="contact-form-wrapper"
                    >
                        <h2>Send Us a Message</h2>
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    required
                                    placeholder="Enter subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows="5"
                                    placeholder="Enter your message"
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="submit-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>
                </div>

                <div className="contact-info">
                    <div className="contact-card">
                        <div className="contact-icon">
                            <FaMapMarkerAlt />
                        </div>
                        <div className="contact-details">
                            <h3>Our Location</h3>
                            <p>123 Tech Boulevard, Innovation City</p>
                        </div>
                    </div>

                    <div className="contact-card">
                        <div className="contact-icon">
                            <FaPhone />
                        </div>
                        <div className="contact-details">
                            <h3>Phone Support</h3>
                            <p>+1 (555) 123-4567</p>
                        </div>
                    </div>

                    <div className="contact-card">
                        <div className="contact-icon">
                            <FaEnvelope />
                        </div>
                        <div className="contact-details">
                            <h3>Email Support</h3>
                            <p>support@esoltechprovider.com</p>
                        </div>
                    </div>
                </div>

                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`popup ${popupType}`}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="popup-content"
                        >
                            <h3>{popupMessage}</h3>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="popup-close"
                            >
                                OK
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}