// app/about-us/page.js
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutUs() {
    return (
        <div className="about-us">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>About Esol Tech Provider</h1>
                    <p>Your technology solutions partner</p>
                </div>
                <div className="hero-image">
                    <Image
                        src="/images/about-us/hero-image.jpg"
                        alt="Esol Tech Provider"
                        width={800}
                        height={400}
                        className="responsive-image"
                    />
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission">
                <div className="container">
                    <h2>Our Mission</h2>
                    <p>
                        At Esol Tech Provider, we&apos;re committed to delivering innovative technological solutions that empower businesses to thrive in the digital age. Our mission is to help organizations leverage technology to achieve their goals while maintaining security, efficiency, and scalability.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="container">
                    <h2>What Makes Us Different</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>Innovative Solutions</h3>
                            <p>We develop cutting-edge technology solutions tailored to your specific needs.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Expertise & Experience</h3>
                            <p>Our team brings decades of combined experience in technology and business solutions.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Customer-Centric Approach</h3>
                            <p>We prioritize your success and build long-term partnerships with our clients.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* History Section */}
            <section className="history">
                <div className="container">
                    <h2>Our Journey</h2>
                    <div className="timeline">
                        <div className="timeline-event">
                            <div className="timeline-date">2010</div>
                            <div className="timeline-content">
                                <h3>Founding Year</h3>
                                <p>Esol Tech Provider was established with a vision to revolutionize technology solutions.</p>
                            </div>
                        </div>
                        <div className="timeline-event">
                            <div className="timeline-date">2015</div>
                            <div className="timeline-content">
                                <h3>Expansion</h3>
                                <p>Opened new offices in three continents and doubled our team size.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}