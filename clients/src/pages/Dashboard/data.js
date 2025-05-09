export const stats = [
    { name: 'Total Views', value: '1,248', change: '+12%', changeType: 'positive' },
    { name: 'Content Published', value: '24', change: '+3', changeType: 'positive' },
    { name: 'Followers', value: '586', change: '+42', changeType: 'positive' },
    { name: 'Engagement Rate', value: '4.8%', change: '-0.2%', changeType: 'negative' },
];

export const recentActivity = [
    { id: 1, action: 'Published new blog', title: 'React Hooks Guide', time: '2 hours ago', iconName: 'document-text-outline' },
    { id: 2, action: 'New follower', title: 'Sarah Johnson', time: '5 hours ago', iconName: 'person-add-outline' },
    { id: 3, action: 'Comment received', title: 'Great post!', time: '1 day ago', iconName: 'chatbubble-outline' },
    { id: 4, action: 'Content updated', title: 'JavaScript Basics', time: '2 days ago', iconName: 'pencil-outline' },
];

export const quickActions = [
    { iconName: 'add-outline', label: 'New Post', action: () => navigate('/editor') },
    { iconName: 'analytics-outline', label: 'Analytics', action: () => navigate('/analytics') },
    { iconName: 'people-outline', label: 'Audience', action: () => navigate('/audience') },
    { iconName: 'settings-outline', label: 'Settings', action: () => navigate('/settings') },
];

export const contentPerformance = [
    { title: 'Advanced React Patterns', views: 842, likes: 124, date: 'May 15' },
    { title: 'CSS Grid Complete Guide', views: 721, likes: 98, date: 'May 10' },
    { title: 'TypeScript for Beginners', views: 532, likes: 76, date: 'May 5' },
    { title: 'State Management Comparison', views: 489, likes: 64, date: 'Apr 28' },
];