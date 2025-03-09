// app/client/support/helpdesk/page.js
'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaLifeRing, FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';

const tickets = [
    {
        id: 1,
        title: "Login Issues",
        status: "resolved",
        date: "2024-03-15",
        description: "Unable to access account despite correct credentials",
        priority: "high"
    },
    {
        id: 2,
        title: "Report Generation Failed",
        status: "in-progress",
        date: "2024-03-14",
        description: "Financial reports not generating properly",
        priority: "medium"
    },
    {
        id: 3,
        title: "Mobile App Crash",
        status: "new",
        date: "2024-03-14",
        description: "Application crashes on iOS when viewing dashboard",
        priority: "critical"
    },
];

export default function Helpdesk() {
    const router = useRouter();
    const [newTicket, setNewTicket] = useState(false);
    const [formData, setFormData] = useState({
        subject: '',
        description: '',
        urgency: 'medium'
    });

    useEffect(() => {
        if (!document.cookie.includes('auth_token')) {
            router.push('/client/login');
        }
    }, []);

    const statusIcons = {
        resolved: <FaCheckCircle className="text-green-500" />,
        'in-progress': <FaClock className="text-yellow-500" />,
        new: <FaExclamationTriangle className="text-blue-500" />
    };

    const priorityColors = {
        critical: 'bg-red-100 text-red-800',
        high: 'bg-orange-100 text-orange-800',
        medium: 'bg-yellow-100 text-yellow-800',
        low: 'bg-gray-100 text-gray-800'
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto"
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                    <motion.h1
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        className="text-4xl font-bold text-gray-800 mb-4 md:mb-0"
                    >
                        Support Center <span className="text-blue-600">Hub</span>
                    </motion.h1>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-lg p-4 shadow-md"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <FaLifeRing className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Active Tickets</h3>
                                <p className="text-2xl text-blue-600">{tickets.length}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Ticket Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm h-fit"
                    >
                        <h2 className="text-xl font-semibold mb-4">Create New Ticket</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    rows="4"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Urgency
                                </label>
                                <select
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    value={formData.urgency}
                                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="critical">Critical</option>
                                </select>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Submit Ticket
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Tickets List */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-4"
                        >
                            {tickets.map((ticket, index) => (
                                <motion.div
                                    key={ticket.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">{ticket.title}</h3>
                                            <p className="text-sm text-gray-500 mt-1">{ticket.date}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className={`px-2 py-1 rounded-full text-sm ${priorityColors[ticket.priority]}`}>
                                                {ticket.priority}
                                            </span>
                                            {statusIcons[ticket.status]}
                                        </div>
                                    </div>
                                    <p className="text-gray-600">{ticket.description}</p>
                                    <div className="mt-4 flex items-center space-x-4">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                                        >
                                            View Details
                                        </motion.button>
                                        <span className="text-sm text-gray-500">Last updated 2h ago</span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Floating Action Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-8 right-8 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center text-2xl"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    ↑
                </motion.button>
            </motion.div>
        </div>
    );
}