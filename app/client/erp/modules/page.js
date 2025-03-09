// app/client/erp/modules/page.js
'use client';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const modules = [
    {
        title: 'Financial Management',
        icon: '💰',
        progress: 85,
        status: 'active',
        description: 'Manage accounts, invoices, and financial reporting',
        link: '/client/erp/modules/finance'
    },
    {
        title: 'Inventory Control',
        icon: '📦',
        progress: 100,
        status: 'active',
        description: 'Real-time stock tracking and supply chain management',
        link: '/client/erp/modules/inventory'
    },
    {
        title: 'HR & Payroll',
        icon: '👥',
        progress: 65,
        status: 'in-progress',
        description: 'Employee management and payroll processing',
        link: '/client/erp/modules/hr'
    },
    {
        title: 'Sales CRM',
        icon: '📈',
        progress: 90,
        status: 'active',
        description: 'Customer relationship management system',
        link: '/client/erp/modules/sales'
    },
    {
        title: 'Production Planning',
        icon: '🏭',
        progress: 45,
        status: 'development',
        description: 'Manufacturing process optimization tools',
        link: '/client/erp/modules/production'
    },
    {
        title: 'Quality Control',
        icon: '✅',
        progress: 30,
        status: 'planned',
        description: 'Quality assurance and compliance tracking',
        link: '/client/erp/modules/quality'
    },
];

export default function ERPModules() {
    const router = useRouter();

    useEffect(() => {
        if (!document.cookie.includes('auth_token')) {
            router.push('/client/login');
        }
    }, []);

    const statusColors = {
        active: 'bg-green-100 text-green-800',
        'in-progress': 'bg-yellow-100 text-yellow-800',
        development: 'bg-blue-100 text-blue-800',
        planned: 'bg-gray-100 text-gray-800'
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
                        ERP Modules <span className="text-blue-600">Dashboard</span>
                    </motion.h1>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-lg p-4 shadow-md"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <span className="text-2xl">📊</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">System Health</h3>
                                <p className="text-sm text-green-600">All modules operational</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                >
                    {['Create New', 'Generate Report', 'Import Data', 'Settings'].map((action, index) => (
                        <motion.button
                            key={action}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all flex items-center"
                        >
                            <span className="text-2xl mr-3">📌</span>
                            <span className="text-gray-700">{action}</span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module, index) => (
                        <motion.div
                            key={module.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all relative group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <span className="text-2xl">{module.icon}</span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${statusColors[module.status]}`}>
                                    {module.status.replace('-', ' ')}
                                </span>
                            </div>

                            <h3 className="text-xl font-semibold mb-2 text-gray-800">{module.title}</h3>
                            <p className="text-gray-600 mb-4">{module.description}</p>

                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Completion</span>
                                    <span>{module.progress}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${module.progress}%` }}
                                        transition={{ duration: 0.8 }}
                                        className="h-full bg-blue-500 rounded-full"
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                onClick={() => router.push(module.link)}
                            >
                                Access Module →
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
                    +
                </motion.button>
            </motion.div>
        </div>
    );
}