import React from 'react'
import { PieChart, RadarChart, PolarAreaChart } from '../../../components/Charts';

const AudienceTab = () => {
    const trafficSourcesData = {
        labels: ['Direct', 'Social', 'Referral', 'Search'],
        datasets: [
            {
                data: [35, 25, 20, 20],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(139, 92, 246, 0.7)'
                ],
                borderWidth: 1
            }
        ]
    };

    const audienceData = {
        labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
        datasets: [
            {
                label: 'Age Distribution',
                data: [20, 45, 20, 10, 5],
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 1
            }
        ]
    };

    const deviceData = {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        datasets: [
            {
                label: 'Devices',
                data: [45, 50, 5],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(245, 158, 11, 0.7)'
                ],
                borderWidth: 1
            }
        ]
    };

    return (
        <div className="space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <RadarChart data={audienceData} options={{
                    plugins: {
                        title: { display: true, text: 'Audience Demographics' }
                    }
                }} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <PieChart data={trafficSourcesData} options={{
                        plugins: {
                            title: { display: true, text: 'Traffic Sources' }
                        }
                    }} />
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <PolarAreaChart data={deviceData} options={{
                        plugins: {
                            title: { display: true, text: 'Devices Used' }
                        }
                    }} />
                </div>
            </div>
        </div>
    )
}

export default AudienceTab