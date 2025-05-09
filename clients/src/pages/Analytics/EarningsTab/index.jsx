import React from 'react'
import { LineChart, PieChart, BarChart } from '../../../components/Charts';

const EarningsTab = () => {
    return (
        <div className="space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <LineChart data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                        {
                            label: 'Earnings ($)',
                            data: [120, 190, 300, 500, 200, 300],
                            borderColor: 'rgb(16, 185, 129)',
                            backgroundColor: 'rgba(16, 185, 129, 0.5)',
                            tension: 0.1
                        }
                    ]
                }} options={{
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'Earnings Over Time' }
                    }
                }} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <PieChart data={{
                        labels: ['Subscriptions', 'Ads', 'Sponsorships', 'Donations'],
                        datasets: [{
                            data: [50, 30, 15, 5],
                            backgroundColor: [
                                'rgba(59, 130, 246, 0.7)',
                                'rgba(16, 185, 129, 0.7)',
                                'rgba(245, 158, 11, 0.7)',
                                'rgba(139, 92, 246, 0.7)'
                            ]
                        }]
                    }} options={{
                        plugins: {
                            title: { display: true, text: 'Revenue Sources' }
                        }
                    }} />
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <BarChart data={{
                        labels: ['Articles', 'Videos', 'Podcasts'],
                        datasets: [
                            {
                                label: 'Earnings ($)',
                                data: [1200, 800, 400],
                                backgroundColor: 'rgba(16, 185, 129, 0.7)'
                            }
                        ]
                    }} options={{
                        maintainAspectRatio: false,
                        plugins: {
                            title: { display: true, text: 'Earnings by Content Type' }
                        }
                    }} />
                </div>
            </div>
        </div>
    )
}

export default EarningsTab