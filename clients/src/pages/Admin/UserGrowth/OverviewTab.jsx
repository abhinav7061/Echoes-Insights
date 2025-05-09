import React, { useState } from 'react'
import { LineChart, BarChart, PieChart } from '../../../components/Charts';

const OverviewTab = () => {
    const [exportLoading, setExportLoading] = useState(false);

    const userGrowthData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'New Users',
                data: [120, 190, 170, 220, 300, 280, 400],
                borderColor: 'rgba(59, 130, 246, 1)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.3,
                fill: true
            },
            {
                label: 'Active Users',
                data: [80, 150, 140, 180, 240, 220, 320],
                borderColor: 'rgba(16, 185, 129, 1)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.3,
                fill: true
            }
        ]
    };

    const handleExport = async (format) => {
        setExportLoading(true);
        // Simulate export
        await new Promise(resolve => setTimeout(resolve, 1500));
        setExportLoading(false);
        console.log(`Exporting ${format} report`);
    };
    return (
        <div className="space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">User Growth</h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleExport('png')}
                            className="px-3 py-1 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        >
                            Export PNG
                        </button>
                        <button
                            onClick={() => handleExport('csv')}
                            className="px-3 py-1 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        >
                            {exportLoading ? 'Exporting...' : 'Export CSV'}
                        </button>
                    </div>
                </div>
                <div className="h-96">
                    <LineChart data={userGrowthData} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">User Activity</h2>
                    <div className="h-64">
                        <BarChart
                            data={{
                                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                datasets: [
                                    {
                                        label: 'Active Users',
                                        data: [320, 420, 510, 480, 550, 490, 380],
                                        backgroundColor: 'rgba(59, 130, 246, 0.7)'
                                    }
                                ]
                            }}
                        />
                    </div>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">User Devices</h2>
                    <div className="h-64">
                        <PieChart
                            data={{
                                labels: ['Mobile', 'Desktop', 'Tablet'],
                                datasets: [
                                    {
                                        data: [65, 25, 10],
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

export default OverviewTab