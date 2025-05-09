import React from 'react'

const Stats = () => {
    const performanceStats = {
        totalContent: 124,
        published: 98,
        drafts: 26,
        avgReadTime: '4.8 min',
        avgEngagement: '62%'
    };
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Content</p>
                <p className="text-2xl font-semibold">{performanceStats.totalContent}</p>
                <p className="text-sm text-sky-600 dark:text-sky-400 mt-1">+12 this month</p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Published</p>
                <p className="text-2xl font-semibold">{performanceStats.published}</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">{Math.round((performanceStats.published / performanceStats.totalContent) * 100)}% of total</p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Drafts</p>
                <p className="text-2xl font-semibold">{performanceStats.drafts}</p>
                <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">{Math.round((performanceStats.drafts / performanceStats.totalContent) * 100)}% of total</p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Avg. Read Time</p>
                <p className="text-2xl font-semibold">{performanceStats.avgReadTime}</p>
                <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">+0.4 min from last month</p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Avg. Engagement</p>
                <p className="text-2xl font-semibold">{performanceStats.avgEngagement}</p>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">+5% from last month</p>
            </div>
        </div>
    )
}

export default Stats