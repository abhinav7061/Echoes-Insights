import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Checkbox } from '../../../components/Inputs/checkbox';
import { useForm } from 'react-hook-form';
import AdminHeading from '../../../components/Headers/AdminHeading';

const ExportDataPage = () => {
    const method = useForm({
        defaultValues: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            lastActive: true
        }
    });
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [exportType, setExportType] = useState('users');
    const [format, setFormat] = useState('csv');
    const [isExporting, setIsExporting] = useState(false);
    const [exportHistory, setExportHistory] = useState([
        { id: 1, type: 'users', format: 'csv', date: '2023-06-15', status: 'completed', size: '2.4 MB' },
        { id: 2, type: 'content', format: 'json', date: '2023-06-10', status: 'completed', size: '5.1 MB' },
        { id: 3, type: 'analytics', format: 'csv', date: '2023-06-05', status: 'failed', size: '0 MB' }
    ]);

    const exportOptions = [
        { value: 'users', label: 'User Data', columns: ['id', 'name', 'email', 'role', 'createdAt', 'lastActive', 'status'] },
        { value: 'content', label: 'Content Data', columns: ['id', 'title', 'author', 'type', 'createdAt', 'publishedAt', 'views', 'likes', 'status'] },
        { value: 'analytics', label: 'Analytics Data', columns: ['date', 'activeUsers', 'newUsers', 'contentViews', 'engagementRate'] },
        { value: 'transactions', label: 'Transaction Data', columns: ['id', 'userId', 'amount', 'type', 'status', 'createdAt'] }
    ];

    const formatOptions = [
        { value: 'csv', label: 'CSV' },
        { value: 'json', label: 'JSON' },
        { value: 'excel', label: 'Excel' },
        { value: 'pdf', label: 'PDF' }
    ];

    const handleExport = () => {
        setIsExporting(true);
        // Simulate export process
        setTimeout(() => {
            const newExport = {
                id: exportHistory.length + 1,
                type: exportType,
                format,
                date: new Date().toISOString().split('T')[0],
                status: 'completed',
                size: `${(Math.random() * 10).toFixed(1)} MB`
            };
            setExportHistory(prev => [newExport, ...prev]);
            setIsExporting(false);
        }, 3000);
    };

    const getSelectedOption = () => {
        return exportOptions.find(option => option.value === exportType) || exportOptions[0];
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

            <AdminHeading title='Export Data' desc='Export system data for analysis or backup' />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Export Settings */}
                <div className="lg:col-span-2">
                    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6 mb-6">
                        <h2 className="text-lg font-semibold mb-4">Export Settings</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                                    Data Type
                                </label>
                                <select
                                    value={exportType}
                                    onChange={(e) => setExportType(e.target.value)}
                                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-white"
                                >
                                    {exportOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                                    Format
                                </label>
                                <select
                                    value={format}
                                    onChange={(e) => setFormat(e.target.value)}
                                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-white"
                                >
                                    {formatOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                                Date Range (optional)
                            </label>
                            <DatePicker
                                selectsRange={true}
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(update) => setDateRange(update)}
                                placeholderText="Select date range"
                                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-white"
                            />
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium mb-3 text-neutral-700 dark:text-neutral-300">
                                Include Columns
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {getSelectedOption().columns.map(column => (
                                    <Checkbox key={column} name={column} control={method.control} label={column} />
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleExport}
                                disabled={isExporting}
                                className={`px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors ${isExporting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isExporting ? (
                                    <span className="flex items-center justify-center">
                                        <ion-icon name="refresh-outline" className="animate-spin mr-2"></ion-icon>
                                        Exporting...
                                    </span>
                                ) : 'Export Data'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Export History */}
                <div className="lg:col-span-1">
                    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold mb-4">Export History</h2>

                        <div className="space-y-3">
                            {exportHistory.map(exportItem => (
                                <div key={exportItem.id} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-medium capitalize">{exportItem.type}</p>
                                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                                {exportItem.date} · {exportItem.format.toUpperCase()}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full ${exportItem.status === 'completed'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                                            }`}>
                                            {exportItem.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-sm text-neutral-500 dark:text-neutral-400">{exportItem.size}</span>
                                        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                            Download
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {exportHistory.length === 0 && (
                            <div className="text-center py-8">
                                <ion-icon name="download-outline" className="text-4xl text-neutral-400 mx-auto mb-3"></ion-icon>
                                <h3 className="text-lg font-medium">No exports yet</h3>
                                <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                                    Your export history will appear here
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Data Preview */}
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6 mt-6">
                <h2 className="text-lg font-semibold mb-4">Data Preview</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800 rounded-xl overflow-hidden">
                        <thead className="bg-neutral-100 dark:bg-neutral-800">
                            <tr>
                                {getSelectedOption().columns
                                    .filter(column => method.watch(column))
                                    .map(column => (
                                        <th
                                            key={column}
                                            scope="col"
                                            className={"px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider"}
                                        >
                                            {column}
                                        </th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody className="bg-neutral-50 dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700">
                            {/* Sample preview rows */}
                            {[1, 2, 3].map(row => (
                                <tr key={row}>
                                    {getSelectedOption().columns
                                        .filter(column => method.watch(column))
                                        .map(column => (
                                            <td
                                                key={column}
                                                className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400"
                                            >
                                                {column === 'id' ? `ID-${1000 + row}` :
                                                    column === 'name' ? `Sample ${exportType} ${row}` :
                                                        column === 'email' ? `sample${row}@example.com` :
                                                            column === 'createdAt' ? '2023-06-01' :
                                                                column === 'status' ? 'active' :
                                                                    column === 'title' ? `Sample ${exportType} title ${row}` :
                                                                        column === 'type' ? exportType :
                                                                            column === 'date' ? `2023-06-${10 + row}` :
                                                                                column === 'activeUsers' ? (row * 1000) :
                                                                                    column === 'amount' ? `$${(row * 10).toFixed(2)}` :
                                                                                        'Sample data'}
                                            </td>
                                        ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                    Showing 3 sample rows. Actual export will include all matching records.
                </div>
            </div>
        </div>
    );
};

export default ExportDataPage;