// app/client/tours/view/page.js
'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, CameraControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function Model({ url }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
}

function SceneViewer() {
    const [currentScene, setCurrentScene] = useState('/models/tour-main.glb');
    const [cameraControls, setCameraControls] = useState(null);

    const scenes = [
        { id: 1, name: 'Main Hall', model: '/models/tour-main.glb', thumbnail: '/images/thumb-main.jpg' },
        { id: 2, name: 'Conference Room', model: '/models/tour-conf.glb', thumbnail: '/images/thumb-conf.jpg' },
        { id: 3, name: 'Exhibition Space', model: '/models/tour-expo.glb', thumbnail: '/images/thumb-expo.jpg' },
    ];

    const handleSceneChange = (modelUrl) => {
        setCurrentScene(modelUrl);
        if (cameraControls) {
            cameraControls.reset(true);
            cameraControls.setPosition(0, 5, 10, true);
        }
    };

    return (
        <div className="relative h-[70vh] w-full bg-gray-100 rounded-xl overflow-hidden">
            <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
                <CameraControls ref={setCameraControls} />
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Suspense fallback={null}>
                    <Model url={currentScene} />
                </Suspense>
                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={5}
                    maxDistance={20}
                />
            </Canvas>

            {/* Scene Selector */}
            <motion.div
                className="absolute bottom-4 left-4 flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {scenes.map((scene) => (
                    <motion.button
                        key={scene.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-2 bg-white rounded-lg shadow-md ${currentScene === scene.model ? 'ring-2 ring-blue-500' : ''
                            }`}
                        onClick={() => handleSceneChange(scene.model)}
                    >
                        <img
                            src={scene.thumbnail}
                            alt={scene.name}
                            className="w-24 h-16 object-cover rounded-md"
                        />
                        <span className="text-sm mt-1 block">{scene.name}</span>
                    </motion.button>
                ))}
            </motion.div>
        </div>
    );
}

export default function TourView() {
    const router = useRouter();

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
                        Immersive 3D Tour <span className="text-blue-600">Viewer</span>
                    </motion.h1>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-lg p-4 shadow-md"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <span className="text-2xl">👁️</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Current Scene</h3>
                                <p className="text-2xl text-blue-600">Main Hall</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Main Viewer */}
                <SceneViewer />

                {/* Controls Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-white p-6 rounded-xl shadow-sm"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="p-3 bg-blue-100 text-blue-600 rounded-lg flex flex-col items-center"
                        >
                            <span className="text-2xl mb-2">📐</span>
                            <span className="text-sm">Measure</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="p-3 bg-blue-100 text-blue-600 rounded-lg flex flex-col items-center"
                        >
                            <span className="text-2xl mb-2">📷</span>
                            <span className="text-sm">Snapshot</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="p-3 bg-blue-100 text-blue-600 rounded-lg flex flex-col items-center"
                        >
                            <span className="text-2xl mb-2">👓</span>
                            <span className="text-sm">VR View</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="p-3 bg-blue-100 text-blue-600 rounded-lg flex flex-col items-center"
                        >
                            <span className="text-2xl mb-2">📥</span>
                            <span className="text-sm">Export</span>
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}