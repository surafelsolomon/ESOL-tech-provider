// app/client/erp/reports/page.js
'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AreaChart, PieChart, Pie, Area, Cell, ResponsiveContainer } from 'recharts';

const reports = [
    {
        id: 1,
        title: 'Financial Summary Q1',
        type: 'financial',
        status: 'generated',
        progress: 100,
        lastUpdated: '2024-03-15',
        data: [
            { name: 'Jan', value: 4000 },
            { name: 'Feb', value: 3000 },
            { name: 'Mar', value: 6000 },
        ]
    },
    {
        id: 2,
        title: 'Inventory Analysis',
        type: 'inventory',
        status: 'pending',
        progress: 65,
        lastUpdated: '2024-03-14',
        data: [
            { name: 'Product A', value: 2400 },
            { name: 'Product B', value: 4567 },
            { name: 'Product C', value: 1398 },
        ]
    },
    {
        id: 3,
        title: 'Sales Performance',
        type: 'sales',
        status: 'error',
        progress: 30,
        lastUpdated: '2024-03-13',
        data: [
            { name: 'Week 1', value: 200 },
            { name: 'Week 2', value: 300 },
            { name: 'Week 3', value: 100 },
        ]
    },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

export default function ERPReports() {
    const router = useRouter();
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        if (!document.cookie.includes('auth_token')) {
            router.push('/client/login');
        }
    }, []);

    const statusColors = {
        generated: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800'
    };

    const filteredReports = filter === 'all'
        ? reports
        : reports.filter(report => report.status === filter);

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
                        Analytics Reports <span className="text-blue-600">Center</span>
                    </motion.h1>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-lg p-4 shadow-md"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <span className="text-2xl">📈</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Total Reports</h3>
                                <p className="text-2xl text-blue-600">{reports.length}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-2 mb-8"
                >
                    {['all', 'generated', 'pending', 'error'].map((f) => (
                        <motion.button
                            key={f}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-4 py-2 rounded-full ${filter === f
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                            onClick={() => setFilter(f)}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Reports Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredReports.map((report, index) => (
                        <motion.div
                            key={report.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{report.title}</h3>
                                    <p className="text-sm text-gray-500">{report.lastUpdated}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${statusColors[report.status]}`}>
                                    {report.status}
                                </span>
                            </div>

                            <div className="h-40 mb-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    {report.type === 'financial' ? (
                                        <AreaChart data={report.data}>
                                            <Area
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#3B82F6"
                                                fill="#3B82F620"
                                            />
                                        </AreaChart>
                                    ) : (
                                        <PieChart>
                                            <Pie
                                                data={report.data}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={40}
                                                outerRadius={60}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {report.data.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={COLORS[index % COLORS.length]}
                                                    />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    )}
                                </ResponsiveContainer>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="h-2 bg-gray-200 rounded-full">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${report.progress}%` }}
                                            transition={{ duration: 0.8 }}
                                            className="h-full bg-blue-500 rounded-full"
                                        />
                                    </div>
                                    <span className="text-sm text-gray-500 mt-1">
                                        {report.progress}% Complete
                                    </span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="ml-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                                >
                                    Export
                                </motion.button>
                            </div>
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