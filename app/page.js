'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { FiClock, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import { generatePerformanceData, servicesList } from '@/utils/demoData';
import { ProgressBar } from './components/ProgressBar';
import Link from 'next/link';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [performanceData] = useState(generatePerformanceData());

  const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  const handleBooking = () => {
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  return (
    <div className="home-page">
      {/* Parallax Section */}
      <div className="parallax" />

      {/* Welcome Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="welcome-section"
      >
        <h1>Welcome to Esol Tech Provider</h1>
        <p>Transform your business with intelligent technology solutions</p>
      </motion.section>

      {/* Enhanced Appointment Scheduler */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="scheduler-section"
      >
        <div className="scheduler-header">
          <FiCalendar className="scheduler-icon" />
          <h2>Schedule a Consultation</h2>
          <p>Select your preferred date and time</p>
        </div>

        <div className="scheduler-container">
          <motion.div
            className="date-picker-card"
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
          >
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
              inline
            />
          </motion.div>

          <motion.div
            className="time-picker-card"
            initial={{ x: 20 }}
            whileInView={{ x: 0 }}
          >
            <div className="time-slots">
              {times.map(time => (
                <motion.button
                  key={time}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  <FiClock /> {time}
                </motion.button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="confirm-button"
              onClick={handleBooking}
              disabled={!selectedTime}
            >
              Confirm Appointment
            </motion.button>
          </motion.div>
        </div>

        {showConfirmation && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="confirmation-banner"
          >
            <FiCheckCircle /> Appointment booked for {selectedDate.toDateString()} at {selectedTime}
          </motion.div>
        )}
      </motion.section>

      {/* Interactive Dashboard Preview */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="dashboard-preview"
      >
        <h2>ERP System Overview</h2>
        <p className="section-subtitle">Real-time performance metrics</p>

        <div className="dashboard-grid">
          <motion.div
            className="chart-card"
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
          >
            <h3>Monthly Performance</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData}>
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    fill="#3b82f620"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="metrics-grid">
            <motion.div
              className="metric-card"
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
            >
              <h4>System Health</h4>
              <ProgressBar percentage={98} />
              <span className="metric-note">Optimal performance</span>
            </motion.div>

            <motion.div
              className="metric-card"
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
            >
              <h4>Storage Utilization</h4>
              <ProgressBar percentage={64} />
              <span className="metric-note">325GB of 512GB used</span>
            </motion.div>

            <motion.div
              className="metric-card"
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
            >
              <h4>Active Users</h4>
              <div className="metric-value">246</div>
              <span className="metric-note">+14 this week</span>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Preview */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="services-preview"
      >
        <h2>Our Core Services</h2>
        <p className="section-subtitle">Solutions powering digital transformation</p>

        <div className="services-grid">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="service-card"
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <motion.div whileHover={{ x: 5 }}>
                <Link href={service.link} className="learn-more">
                  Explore Service →
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}