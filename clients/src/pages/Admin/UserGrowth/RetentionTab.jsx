import React from 'react'
import { BarChart } from '../../../components/Charts';

const RetentionTab = () => {
    const retentionData = {
        labels: ['Day 1', 'Day 7', 'Day 14', 'Day 30'],
        datasets: [
            {
                label: 'Retention Rate %',
                data: [85, 62, 45, 28],
                backgroundColor: 'rgba(139, 92, 246, 0.7)'
            }
        ]
    };
    return (
        <div className="space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">User Retention</h2>
                <div className="h-96">
                    <BarChart data={retentionData} />
                </div>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Cohort Analysis</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                        <thead className="bg-neutral-50 dark:bg-neutral-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Cohort</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Day 1</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Day 7</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Day 14</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Day 30</th>
                            </tr>
                        </thead>
                        <tbody className="bg-neutral-50 dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700">
                            {[
                                { cohort: 'Jan 2023', day1: '85%', day7: '65%', day14: '48%', day30: '30%' },
                                { cohort: 'Feb 2023', day1: '88%', day7: '68%', day14: '50%', day30: '32%' },
                                { cohort: 'Mar 2023', day1: '87%', day7: '67%', day14: '49%', day30: '31%' },
                                { cohort: 'Apr 2023', day1: '90%', day7: '70%', day14: '52%', day30: '35%' },
                                { cohort: 'May 2023', day1: '92%', day7: '72%', day14: '55%', day30: '38%' }
                            ].map((row, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-white">{row.cohort}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">{row.day1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">{row.day7}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">{row.day14}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">{row.day30}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default RetentionTab