// app/client/support/training/page.js
'use client';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaVideo, FaBook, FaCertificate, FaRocket, FaChartLine } from 'react-icons/fa';

const trainingModules = [
    {
        id: 1,
        title: "ERP System Basics",
        icon: <FaRocket className="w-6 h-6" />,
        progress: 100,
        status: 'completed',
        description: "Fundamentals of our ERP system interface and navigation",
        duration: "2h 15m"
    },
    {
        id: 2,
        title: "Advanced Reporting",
        icon: <FaChartLine className="w-6 h-6" />,
        progress: 65,
        status: 'in-progress',
        description: "Mastering custom report generation and data analysis",
        duration: "3h 30m"
    },
    {
        id: 3,
        title: "Inventory Management",
        icon: <FaBook className="w-6 h-6" />,
        progress: 30,
        status: 'not-started',
        description: "Complete guide to stock control and supply chain features",
        duration: "4h 00m"
    },
    {
        id: 4,
        title: "Video Tutorials",
        icon: <FaVideo className="w-6 h-6" />,
        progress: 0,
        status: 'not-started',
        description: "Collection of video guides for visual learners",
        duration: "5h 45m"
    },
    {
        id: 5,
        title: "Certification Program",
        icon: <FaCertificate className="w-6 h-6" />,
        progress: 0,
        status: 'not-started',
        description: "Official certification path for power users",
        duration: "8h 00m"
    },
];

export default function Training() {
    const router = useRouter();

    useEffect(() => {
        if (!document.cookie.includes('auth_token')) {
            router.push('/client/login');
        }
    }, []);

    const statusColors = {
        completed: 'bg-green-100 text-green-800',
        'in-progress': 'bg-yellow-100 text-yellow-800',
        'not-started': 'bg-gray-100 text-gray-800'
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
                        Learning Portal <span className="text-blue-600">Academy</span>
                    </motion.h1>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-lg p-4 shadow-md"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <FaCertificate className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Your Progress</h3>
                                <p className="text-2xl text-blue-600">35% Complete</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Training Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trainingModules.map((module, index) => (
                        <motion.div
                            key={module.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all relative group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    {module.icon}
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${statusColors[module.status]}`}>
                                    {module.status.replace('-', ' ')}
                                </span>
                            </div>

                            <h3 className="text-xl font-semibold mb-2 text-gray-800">{module.title}</h3>
                            <p className="text-gray-600 mb-4">{module.description}</p>

                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-gray-500">{module.duration}</span>
                                {module.status === 'completed' && (
                                    <span className="text-green-500 text-sm">🎉 Completed</span>
                                )}
                            </div>

                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Progress</span>
                                    <span>{module.progress}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${module.progress}%` }}
                                        transition={{ duration: 0.8 }}
                                        className={`h-full ${module.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                                            } rounded-full`}
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            >
                                {module.status === 'completed' ? 'Review Material' : 'Start Learning'}
                            </motion.button>
                        </motion.div>
                    ))}
                </div>

                {/* Floating Action Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-8 right-8 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center text-2xl"
                >
                    🚀
                </motion.button>
            </motion.div>
        </div>
    );
}