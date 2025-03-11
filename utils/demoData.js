export const generatePerformanceData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
        month,
        revenue: Math.floor(Math.random() * 5000) + 2000,
        users: Math.floor(Math.random() * 300) + 100,
    }));
};

export const servicesList = [
    {
        title: "ERP Solutions",
        icon: "📊",
        description: "End-to-end enterprise resource planning with real-time analytics",
        link: "/services/erp-system"
    },
    {
        title: "3D Virtualization",
        icon: "🖥️",
        description: "Immersive VR experiences & interactive product configurators",
        link: "/services/3d-virtualization"
    },
    {
        title: "Tech Consulting",
        icon: "💡",
        description: "Strategic IT planning & cloud migration expertise",
        link: "/services/other-services"
    }
];