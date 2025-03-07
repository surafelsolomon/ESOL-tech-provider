// app/about-us/page.js
import Image from 'next/image';

export default function AboutUs() {
    return (
        <div className="about-us">
            {/* Section 1 - Hero */}
            <section className="hero">
                <div className="hero-content">
                    <h1>About Esol Tech Provider</h1>
                    <p>Your technology solutions partner</p>
                </div>
                <div className="hero-image">
                    <Image
                        src="/images/about-us/hero-image.jpg"
                        alt="Esol Tech Team"
                        width={800}
                        height={400}
                        className="responsive-image"
                    />
                </div>
            </section>

            {/* Section 2 - Our Mission */}
            <section className="mission">
                <div className="container">
                    <h2>Our Mission</h2>
                    <p>
                        At Esol Tech Provider, we're committed to delivering innovative technological solutions that empower businesses to thrive in the digital age. Our mission is to help organizations leverage technology to achieve their goals while maintaining security, efficiency, and scalability.
                    </p>
                </div>
            </section>

            {/* Section 3 - Our Team */}
            <section className="team">
                <div className="container">
                    <h2>Our Team</h2>
                    <div className="team-members">
                        <div className="team-member">
                            <Image
                                src="/images/about-us/team-member1.jpg"
                                alt="Team Member 1"
                                width={200}
                                height={200}
                                className="team-photo"
                            />
                            <h3>John Doe</h3>
                            <p>CEO & Founder</p>
                        </div>
                        <div className="team-member">
                            <Image
                                src="/images/about-us/team-member2.jpg"
                                alt="Team Member 2"
                                width={200}
                                height={200}
                                className="team-photo"
                            />
                            <h3>Jane Smith</h3>
                            <p>CTO</p>
                        </div>
                        {/* Add more team members as needed */}
                    </div>
                </div>
            </section>

            {/* Section 4 - History */}
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
                        {/* Add more timeline events as needed */}
                    </div>
                </div>
            </section>
        </div>
    );
}