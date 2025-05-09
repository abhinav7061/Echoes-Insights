import React from 'react'
import { LineChart, BarChart } from '../../../components/Charts';

const SegmentsTab = () => {
    return (
        <div className="space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">User Segments</h2>
                <div className="h-96">
                    <BarChart
                        data={{
                            labels: ['Free Users', 'Premium Users', 'Admins', 'Writers', 'Inactive Users'],
                            datasets: [
                                {
                                    label: 'User Count',
                                    data: [8500, 3200, 80, 30, 700],
                                    backgroundColor: [
                                        'rgba(59, 130, 246, 0.7)',
                                        'rgba(16, 185, 129, 0.7)',
                                        'rgba(139, 92, 246, 0.7)',
                                        'rgba(239, 68, 68, 0.7)'
                                    ]
                                }
                            ]
                        }}
                    />
                </div>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Segment Growth</h2>
                <div className="h-96">
                    <LineChart
                        data={{
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                            datasets: [
                                {
                                    label: 'Free Users',
                                    data: [6000, 6500, 7000, 7500, 8000, 8500],
                                    borderColor: 'rgba(59, 130, 246, 1)',
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                    tension: 0.3,
                                    fill: true
                                },
                                {
                                    label: 'Premium Users',
                                    data: [2000, 2300, 2600, 2800, 3000, 3200],
                                    borderColor: 'rgba(16, 185, 129, 1)',
                                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                    tension: 0.3,
                                    fill: true
                                }
                            ]
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default SegmentsTab