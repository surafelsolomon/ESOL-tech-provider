// app/client/tours/manage/page.js
'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function Scene({ modelUrl }) {
    const { scene } = useGLTF(modelUrl);
    return <primitive object={scene} />;
}

function ModelViewer() {
    const [model, setModel] = useState(null);

    useEffect(() => {
        try {
            // Load your .glb model from public folder
            const modelData = useGLTF('/models/tour-scene.glb');
            setModel(modelData);
        } catch (error) {
            console.error('Error loading 3D model:', error);
        }
    }, []);

    return (
        <div className="h-[600px] w-full bg-gray-100 rounded-xl overflow-hidden">
            <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                {model && <Scene modelUrl={model} />}
                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                />
            </Canvas>
        </div>
    );
}

export default function TourManagement() {
    const router = useRouter();
    const [scenes, setScenes] = useState([
        { id: 1, name: 'Main Hall', objects: 15, visibility: true },
        { id: 2, name: 'Conference Room', objects: 8, visibility: false },
        { id: 3, name: 'Exhibition Space', objects: 23, visibility: true },
    ]);

    useEffect(() => {
        if (!document.cookie.includes('auth_token')) {
            router.push('/client/login');
        }
    }, []);

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
                        3D Tour Editor <span className="text-blue-600">Studio</span>
                    </motion.h1>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-lg p-4 shadow-md"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <span className="text-2xl">🖼️</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Active Scenes</h3>
                                <p className="text-2xl text-blue-600">{scenes.length}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 3D Viewer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <ModelViewer />
                    </motion.div>

                    {/* Management Panel */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white p-6 rounded-xl shadow-sm h-fit"
                    >
                        <h2 className="text-xl font-semibold mb-4">Scene Management</h2>

                        {/* Scene List */}
                        <div className="space-y-4 mb-6">
                            {scenes.map((scene, index) => (
                                <motion.div
                                    key={scene.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                >
                                    <div>
                                        <h3 className="font-medium">{scene.name}</h3>
                                        <p className="text-sm text-gray-500">{scene.objects} objects</p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`px-3 py-1 rounded-full text-sm ${scene.visibility ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        {scene.visibility ? 'Visible' : 'Hidden'}
                                    </motion.button>
                                </motion.div>
                            ))}
                        </div>

                        {/* Property Controls */}
                        <div className="space-y-4">
                            <h3 className="font-semibold">Object Properties</h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Position X</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        className="w-32 accent-blue-500"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Rotation Y</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="360"
                                        className="w-32 accent-blue-500"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Scale</span>
                                    <input
                                        type="range"
                                        min="50"
                                        max="200"
                                        className="w-32 accent-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="mt-6">
                            <h3 className="font-semibold mb-3">Animation Timeline</h3>
                            <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">Timeline controls</span>
                            </div>
                        </div>
                    </motion.div>
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