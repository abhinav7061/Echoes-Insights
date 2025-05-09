import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuthentication } from '../../context/userContext';
import { stats, recentActivity, contentPerformance } from './data'
import SettingsHeading2 from '../../components/Headers/settingsHeading2';
import StatsCard from '../../components/Cards/StatsCard';
import SettingActionsBtn from '../../components/Button/SettingActionsBtn';

const DashboardPage = () => {
    const { user } = useUserAuthentication();
    const navigate = useNavigate();
    const quickActions = [
        { iconName: 'add-outline', label: 'New Post', action: () => navigate('/editor') },
        { iconName: 'analytics-outline', label: 'Analytics', action: () => navigate('/analytics') },
        { iconName: 'people-outline', label: 'Audience', action: () => navigate('/analytics?tab=audience') },
        { iconName: 'cash-outline', label: 'Earnings', action: () => navigate('/analytics?tab=earnings') },
    ];
    const adminActions = [
        { iconName: 'people-outline', label: 'Manage Users', action: () => navigate('/admin?tab=users'), },
        { iconName: 'analytics-outline', label: 'Site Analytics', action: () => navigate('/admin?tab=analytics'), },
        { iconName: 'document-text-outline', label: 'Content Moderation', action: () => navigate('/admin?tab=content'), },
        { iconName: 'settings-outline', label: 'System Settings', action: () => navigate('/admin?tab=settings'), },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SettingsHeading2
                title="Dashboard"
                desc={`Welcome back, ${user?.name || 'User'}! Here's what's happening with your content.`}
            >
                <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-200 text-sm rounded-full">
                    {user?.role === 'admin' ? 'Admin' : user?.role === 'writer' ? 'Writer' : 'User'}
                </span>
            </SettingsHeading2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {quickActions.map((action, index) => (
                        <SettingActionsBtn key={index} {...action} />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {recentActivity.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-start gap-3 p-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                            >
                                <div className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-full flex">
                                    <ion-icon name={activity.iconName} className="text-lg"></ion-icon>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">{activity.action}</p>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{activity.title}</p>
                                </div>
                                <div className="text-sm text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                                    {activity.time}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => navigate('/activity')}
                        className="mt-4 text-sm text-sky-600 dark:text-golden hover:underline flex items-center gap-1"
                    >
                        View all activity
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </button>
                </div>

                {/* Content Performance */}
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Top Content</h2>
                    <div className="space-y-4">
                        {contentPerformance.map((content, index) => (
                            <div key={index} className="pb-4 border-b border-neutral-100 dark:border-neutral-700 last:border-0">
                                <h3 className="font-medium">{content.title}</h3>
                                <div className="flex justify-between mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                                    <span>{content.views} views</span>
                                    <span>{content.likes} likes</span>
                                    <span>{content.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => navigate('/content')}
                        className="mt-4 text-sm text-sky-600 dark:text-golden hover:underline flex items-center gap-1"
                    >
                        View all content
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </button>
                </div>
            </div>

            {/* Additional Sections for Admin/Writers */}
            {(user?.role === 'admin' || user?.role === 'writer') && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Drafts Section */}
                    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Your Drafts</h2>
                            <button
                                onClick={() => navigate('/drafts')}
                                className="text-sm text-sky-600 dark:text-golden hover:underline"
                            >
                                View all
                            </button>
                        </div>
                        <div className="space-y-3">
                            <p className="text-neutral-600 dark:text-neutral-400">You have 3 unpublished drafts</p>
                            <button
                                onClick={() => navigate('/editor')}
                                className="w-full py-2 bg-sky-600 hover:bg-sky-700 dark:bg-golden dark:text-black text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <ion-icon name="add-outline"></ion-icon>
                                Create New Draft
                            </button>
                        </div>
                    </div>

                    {/* Schedule Section */}
                    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Scheduled Content</h2>
                            <button
                                onClick={() => navigate('/schedule')}
                                className="text-sm text-sky-600 dark:text-golden hover:underline"
                            >
                                View calendar
                            </button>
                        </div>
                        <div className="space-y-3">
                            <p className="text-neutral-600 dark:text-neutral-400">2 posts scheduled for publication</p>
                            <button
                                onClick={() => navigate('/editor')}
                                className="w-full py-2 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <ion-icon name="calendar-outline"></ion-icon>
                                Schedule New Post
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Admin Only Section */}
            {user?.role === 'admin' && (
                <div className="mt-8 rounded-xl shadow-sm p-6 border border-red-100 dark:border-red-900/50">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
                            <ion-icon name="shield-checkmark-outline"></ion-icon>
                            Admin Tools
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {adminActions.map((action, index) => (
                            <SettingActionsBtn
                                key={index}
                                {...action}
                                className="bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 shadow-none"
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;