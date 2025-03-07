// app/resources/webinars/page.js
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const webinars = [
    {
        id: 1,
        title: "Cloud Migration Strategies",
        date: "March 25, 2024",
        time: "2:00 PM EST",
        speaker: "Jane Smith, Cloud Architect",
        description: "Learn best practices for seamless cloud transitions",
        status: "upcoming"
    },
    {
        id: 2,
        title: "Cybersecurity in 2024",
        date: "March 18, 2024",
        time: "11:00 AM EST",
        speaker: "John Doe, Security Expert",
        description: "Review of emerging threats and protection strategies",
        status: "past"
    }
];

export default function Webinars() {
    return (
        <div className="resources-container">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="resources-hero">
                    <h1>Tech Webinars</h1>
                    <p>Live and recorded sessions with industry experts</p>
                </div>

                <div className="webinar-filter">
                    <button className="filter-button active">All</button>
                    <button className="filter-button">Upcoming</button>
                    <button className="filter-button">Recorded</button>
                </div>

                <div className="webinar-grid">
                    {webinars.map((webinar, index) => (
                        <motion.div
                            key={webinar.id}
                            className="webinar-card"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="webinar-status">{webinar.status}</div>
                            <div className="webinar-content">
                                <h2>{webinar.title}</h2>
                                <div className="meta">
                                    <span className="date">{webinar.date}</span>
                                    <span className="time">{webinar.time}</span>
                                </div>
                                <p className="speaker">Hosted by {webinar.speaker}</p>
                                <p className="description">{webinar.description}</p>
                                <div className="actions">
                                    {webinar.status === 'upcoming' ? (
                                        <button className="register-button">
                                            Register Now
                                        </button>
                                    ) : (
                                        <Link href="#" className="watch-button">
                                            Watch Recording
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}