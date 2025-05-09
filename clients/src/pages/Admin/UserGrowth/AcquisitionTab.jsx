import React from 'react'
import { LineChart, PieChart } from '../../../components/Charts';
const AcquisitionTab = () => {
    const acquisitionData = {
        labels: ['Organic Search', 'Social Media', 'Direct', 'Referral', 'Email'],
        datasets: [
            {
                label: 'User Acquisition',
                data: [45, 25, 15, 10, 5],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(139, 92, 246, 0.7)',
                    'rgba(239, 68, 68, 0.7)'
                ]
            }
        ]
    };
    return (
        <div className="space-x-6 flex">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">User Acquisition Channels</h2>
                <div className="h-96">
                    <PieChart data={acquisitionData} />
                </div>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6 flex-grow">
                <h2 className="text-lg font-semibold mb-4">Acquisition Over Time</h2>
                <div className="h-96">
                    <LineChart
                        data={{
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                            datasets: [
                                {
                                    label: 'Organic Search',
                                    data: [120, 150, 170, 190, 210, 240],
                                    borderColor: 'rgba(59, 130, 246, 1)',
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                    tension: 0.3,
                                    fill: true
                                },
                                {
                                    label: 'Social Media',
                                    data: [80, 90, 110, 120, 130, 150],
                                    borderColor: 'rgba(16, 185, 129, 1)',
                                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                    tension: 0.3,
                                    fill: true
                                },
                                {
                                    label: 'Direct',
                                    data: [50, 55, 60, 65, 70, 75],
                                    borderColor: 'rgba(245, 158, 11, 1)',
                                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
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

export default AcquisitionTab