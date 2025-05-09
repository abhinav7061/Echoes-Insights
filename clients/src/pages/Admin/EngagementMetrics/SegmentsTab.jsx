import React from 'react'
import { BarChart, PieChart, RadarChart } from '../../../components/Charts';

const SegmentsTab = () => {
    const userSegments = {
        labels: ['Reads', 'Likes', 'Shares', 'Comments', 'Saves', 'Completions'],
        datasets: [
            {
                label: 'Free Users',
                data: [65, 18, 8, 5, 12, 35],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            },
            {
                label: 'Premium Users',
                data: [82, 35, 15, 12, 25, 65],
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 1
            }
        ]
    };
    return (
        <div className="space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Free vs Premium Users</h2>
                <div className="h-96">
                    <BarChart
                        data={{
                            labels: ['Read Rate', 'Like Rate', 'Share Rate', 'Completion Rate'],
                            datasets: [
                                {
                                    label: 'Free Users',
                                    data: [65, 18, 8, 35],
                                    backgroundColor: 'rgba(59, 130, 246, 0.7)'
                                },
                                {
                                    label: 'Premium Users',
                                    data: [82, 35, 15, 65],
                                    backgroundColor: 'rgba(16, 185, 129, 0.7)'
                                }
                            ]
                        }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Engagement by User Segments</h2>
                    <div className="h-96">
                        <RadarChart data={userSegments} />
                    </div>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">By Device Type</h2>
                    <div className="h-96">
                        <PieChart
                            data={{
                                labels: ['Mobile', 'Desktop', 'Tablet'],
                                datasets: [
                                    {
                                        data: [55, 35, 10],
                                        backgroundColor: [
                                            'rgba(59, 130, 246, 0.7)',
                                            'rgba(16, 185, 129, 0.7)',
                                            'rgba(245, 158, 11, 0.7)'
                                        ]
                                    }
                                ]
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SegmentsTab