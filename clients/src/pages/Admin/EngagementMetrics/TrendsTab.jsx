import React from 'react'
import { LineChart, BarChart} from '../../../components/Charts';

const TrendsTab = () => {
    return (
        <div className="space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Engagement Trend Over Time</h2>
                <div className="h-96">
                    <LineChart
                        data={{
                            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                            datasets: [
                                {
                                    label: 'Reads',
                                    data: [120, 80, 210, 180, 240, 190],
                                    borderColor: 'rgba(59, 130, 246, 1)',
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                    tension: 0.3,
                                    fill: true
                                },
                                {
                                    label: 'Likes',
                                    data: [35, 20, 60, 50, 70, 55],
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

            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Engagement by Day of Week</h2>
                <div className="h-96">
                    <BarChart
                        data={{
                            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                            datasets: [
                                {
                                    label: 'Reads',
                                    data: [320, 420, 510, 480, 550, 490, 380],
                                    backgroundColor: 'rgba(59, 130, 246, 0.7)'
                                },
                                {
                                    label: 'Likes',
                                    data: [95, 125, 150, 140, 165, 145, 110],
                                    backgroundColor: 'rgba(16, 185, 129, 0.7)'
                                }
                            ]
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default TrendsTab