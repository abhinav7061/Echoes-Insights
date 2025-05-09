import React from 'react'

const Stats = () => {
    const engagementStats = {
        avgReadTime: '4.8 min',
        readRate: '62%',
        likeRate: '18%',
        shareRate: '8%',
        commentRate: '5%',
        completionRate: '45%'
    };
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Avg. Read Time</p>
                <p className="text-2xl font-semibold">{engagementStats.avgReadTime}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">+0.4 min from last period</p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Read Rate</p>
                <p className="text-2xl font-semibold">{engagementStats.readRate}</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">+5% from last period</p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Like Rate</p>
                <p className="text-2xl font-semibold">{engagementStats.likeRate}</p>
                <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">+2% from last period</p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Share Rate</p>
                <p className="text-2xl font-semibold">{engagementStats.shareRate}</p>
                <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">+1% from last period</p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Completion Rate</p>
                <p className="text-2xl font-semibold">{engagementStats.completionRate}</p>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">+3% from last period</p>
            </div>
        </div>
    )
}

export default Stats