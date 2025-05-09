import React from 'react'
import { PieChart, ScatterChart, PolarAreaChart } from '../../../components/Charts';
const ContentTab = () => {
    return (
        <div className="space-y-6">
            <div className='grid gap-6 md:grid-cols-2'>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Content Engagement Distribution</h2>
                    <div className="h-96">
                        <PolarAreaChart
                            data={{
                                labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
                                datasets: [
                                    {
                                        label: 'Activity Level',
                                        data: [0.5, 1, 1.5, 2, 2.5, 3, 2.5, 1.5],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                            'rgba(33, 150, 243, 0.6)',
                                            'rgba(0, 188, 212, 0.3)'
                                        ],
                                        borderWidth: 1
                                    }
                                ]
                            }}
                            options={{
                                responsive: true,
                                scales: {
                                    r: {
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }
                                },
                                plugins: {
                                    legend: {
                                        display: false
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Content Engagement Distribution</h2>
                    <div className="h-96">
                        <PieChart
                            data={{
                                labels: ['High Engagement', 'Medium Engagement', 'Low Engagement', 'Minimal Engagement'],
                                datasets: [
                                    {
                                        data: [25, 35, 25, 15],
                                        backgroundColor: [
                                            'rgba(16, 185, 129, 0.7)',
                                            'rgba(59, 130, 246, 0.7)',
                                            'rgba(245, 158, 11, 0.7)',
                                            'rgba(239, 68, 68, 0.7)'
                                        ]
                                    }
                                ]
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Content Performance Matrix</h2>
                <div className="h-96">
                    <ScatterChart
                        data={{
                            datasets: [
                                {
                                    label: 'Articles',
                                    data: [
                                        { x: 65, y: 18 },
                                        { x: 72, y: 22 },
                                        { x: 58, y: 15 },
                                        { x: 81, y: 25 },
                                        { x: 62, y: 17 }
                                    ],
                                    backgroundColor: 'rgba(59, 130, 246, 0.7)'
                                },
                                {
                                    label: 'Tutorials',
                                    data: [
                                        { x: 72, y: 22 },
                                        { x: 68, y: 20 },
                                        { x: 75, y: 24 },
                                        { x: 65, y: 18 },
                                        { x: 70, y: 21 }
                                    ],
                                    backgroundColor: 'rgba(16, 185, 129, 0.7)'
                                }
                            ]
                        }}
                        options={{
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Read Rate (%)'
                                    }
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Like Rate (%)'
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default ContentTab