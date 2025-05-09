import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleCheckbox, SimpleRadio, SimpleSwitch } from '../../../components/Inputs/simpleInputs';
import AdminHeading from '../../../components/Headers/AdminHeading';

const BulkActionsPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('content');
    const [selectedAction, setSelectedAction] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [checked, setChecked] = useState(false);
    const [progress, setProgress] = useState(0);
    const [filters, setFilters] = useState({
        contentType: 'all',
        status: 'all',
        dateRange: 'all',
        userRole: 'all',
        userStatus: 'all'
    });

    // Mock data - replace with real API calls
    const contentItems = [
        { id: 1, title: 'Advanced React Patterns', type: 'article', status: 'published', author: 'Alex Johnson', date: '2023-05-15' },
        { id: 2, title: 'CSS Grid Complete Guide', type: 'tutorial', status: 'published', author: 'Sarah Williams', date: '2023-05-10' },
        { id: 3, title: 'TypeScript for Beginners', type: 'course', status: 'draft', author: 'Mike Chen', date: '2023-05-05' },
        { id: 4, title: 'State Management Comparison', type: 'article', status: 'published', author: 'Emma Davis', date: '2023-04-28' },
        { id: 5, title: 'Node.js Best Practices', type: 'guide', status: 'archived', author: 'James Wilson', date: '2023-04-22' }
    ];

    const userItems = [
        { id: 1, name: 'Alex Johnson', email: 'alex@example.com', role: 'admin', status: 'active', joined: '2023-01-15' },
        { id: 2, name: 'Sarah Williams', email: 'sarah@example.com', role: 'writer', status: 'active', joined: '2023-02-20' },
        { id: 3, name: 'Mike Chen', email: 'mike@example.com', role: 'writer', status: 'pending', joined: '2023-03-10' },
        { id: 4, name: 'Emma Davis', email: 'emma@example.com', role: 'user', status: 'active', joined: '2023-03-25' },
        { id: 5, name: 'James Wilson', email: 'james@example.com', role: 'user', status: 'suspended', joined: '2023-04-05' }
    ];

    const availableActions = {
        content: [
            { value: 'publish', label: 'Publish', icon: 'send-outline' },
            { value: 'unpublish', label: 'Unpublish', icon: 'eye-off-outline' },
            { value: 'archive', label: 'Archive', icon: 'archive-outline' },
            { value: 'delete', label: 'Delete', icon: 'trash-outline' },
            { value: 'change-author', label: 'Change Author', icon: 'person-circle-outline' },
            { value: 'add-tags', label: 'Add Tags', icon: 'pricetag-outline' }
        ],
        users: [
            { value: 'activate', label: 'Activate', icon: 'checkmark-circle-outline' },
            { value: 'suspend', label: 'Suspend', icon: 'ban-outline' },
            { value: 'delete', label: 'Delete', icon: 'trash-outline' },
            { value: 'change-role', label: 'Change Role', icon: 'shield-outline' },
            { value: 'send-email', label: 'Send Email', icon: 'mail-outline' },
            { value: 'export-data', label: 'Export Data', icon: 'download-outline' }
        ]
    };

    const toggleSelectItem = (id) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = (items) => {
        if (selectedItems.length === items.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(items.map(item => item.id));
        }
    };

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    };

    const executeBulkAction = () => {
        if (!selectedAction || selectedItems.length === 0) return;

        setIsProcessing(true);
        setProgress(0);

        // Simulate processing with progress updates
        const totalItems = selectedItems.length;
        let processed = 0;

        const processInterval = setInterval(() => {
            processed += 1;
            const newProgress = Math.round((processed / totalItems) * 100);
            setProgress(newProgress);

            if (processed >= totalItems) {
                clearInterval(processInterval);
                setTimeout(() => {
                    setIsProcessing(false);
                    setSelectedItems([]);
                    setSelectedAction('');
                    setProgress(0);
                    console.log(`Completed ${selectedAction} on ${totalItems} items`);
                }, 500);
            }
        }, 200);
    };

    const filteredContent = contentItems.filter(item => {
        if (filters.contentType !== 'all' && item.type !== filters.contentType) return false;
        if (filters.status !== 'all' && item.status !== filters.status) return false;
        return true;
    });

    const filteredUsers = userItems.filter(user => {
        if (filters.userRole !== 'all' && user.role !== filters.userRole) return false;
        if (filters.userStatus !== 'all' && user.status !== filters.userStatus) return false;
        return true;
    });

    const currentItems = activeTab === 'content' ? filteredContent : filteredUsers;
    const currentActions = availableActions[activeTab];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

            <AdminHeading title='Bulk Actions' desc='Perform mass operations on content and users' />

            {/* Tabs */}
            <div className="flex border-b border-neutral-200 dark:border-neutral-700 mb-6">
                <button
                    className={`px-4 py-2 flex gap-2 items-center font-medium ${activeTab === 'content' ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-500' : 'text-neutral-600 dark:text-neutral-300'}`}
                    onClick={() => setActiveTab('content')}
                >
                    <ion-icon name="document-text-outline"></ion-icon>
                    Content
                </button>
                <button
                    className={`px-4 py-2 flex gap-2 items-center font-medium ${activeTab === 'users' ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-500' : 'text-neutral-600 dark:text-neutral-300'}`}
                    onClick={() => setActiveTab('users')}
                >
                    <ion-icon name="people-outline"></ion-icon>
                    Users
                </button>
            </div>

            {/* Filters */}
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {activeTab === 'content' ? (
                        <>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Content Type</label>
                                <select
                                    value={filters.contentType}
                                    onChange={(e) => handleFilterChange('contentType', e.target.value)}
                                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-neutral-700 dark:text-white"
                                >
                                    <option value="all">All Types</option>
                                    <option value="article">Articles</option>
                                    <option value="tutorial">Tutorials</option>
                                    <option value="course">Courses</option>
                                    <option value="guide">Guides</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Status</label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-neutral-700 dark:text-white"
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Date Range</label>
                                <select
                                    value={filters.dateRange}
                                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-neutral-700 dark:text-white"
                                >
                                    <option value="all">All Time</option>
                                    <option value="7d">Last 7 Days</option>
                                    <option value="30d">Last 30 Days</option>
                                    <option value="90d">Last 90 Days</option>
                                </select>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">User Role</label>
                                <select
                                    value={filters.userRole}
                                    onChange={(e) => handleFilterChange('userRole', e.target.value)}
                                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-neutral-700 dark:text-white"
                                >
                                    <option value="all">All Roles</option>
                                    <option value="admin">Admins</option>
                                    <option value="writer">Writers</option>
                                    <option value="user">Users</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Status</label>
                                <select
                                    value={filters.userStatus}
                                    onChange={(e) => handleFilterChange('userStatus', e.target.value)}
                                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-neutral-700 dark:text-white"
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="active">Active</option>
                                    <option value="pending">Pending</option>
                                    <option value="suspended">Suspended</option>
                                </select>
                            </div>
                        </>
                    )}
                    <div className="flex items-end">
                        <button
                            onClick={() => {
                                setFilters({
                                    contentType: 'all',
                                    status: 'all',
                                    dateRange: 'all',
                                    userRole: 'all',
                                    userStatus: 'all'
                                });
                            }}
                            className="px-4 py-2 text-sm bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded-lg"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Action Selection */}
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Select Action</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                    {currentActions.map(action => (
                        <SimpleRadio
                            key={action.value}
                            name="bulk-action"
                            id={`action-${action.value}`}
                            value={action.value}
                            checked={selectedAction === action.value}
                            onChange={() => setSelectedAction(action.value)}
                            label={
                                <div className="flex items-center gap-1">
                                    <ion-icon name={action.icon} className="text-xl"></ion-icon>
                                    <span>{action.label}</span>
                                </div>
                            }
                        />
                    ))}
                </div>
            </div>

            {/* Items Table */}
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-center gap-3">
                        <SimpleCheckbox
                            id="select-all"
                            checked={selectedItems.length === currentItems.length && currentItems.length > 0}
                            onChange={() => toggleSelectAll(currentItems)}
                            indeterminate={selectedItems.length > 0 && selectedItems.length < currentItems.length}
                        />
                        <span className="text-sm font-medium">
                            {selectedItems.length > 0 ? `${selectedItems.length} selected` : `${currentItems.length} items`}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={executeBulkAction}
                            disabled={!selectedAction || selectedItems.length === 0 || isProcessing}
                            className={`px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors flex items-center gap-2 ${(!selectedAction || selectedItems.length === 0 || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {isProcessing ? (
                                <>
                                    <ion-icon name="refresh-outline" className="animate-spin"></ion-icon>
                                    Processing ({progress}%)
                                </>
                            ) : (
                                <>
                                    <ion-icon name="play-outline"></ion-icon>
                                    Execute Action
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                        <thead className="bg-neutral-50 dark:bg-neutral-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider w-10">
                                    <span className="sr-only">Select</span>
                                </th>
                                {activeTab === 'content' ? (
                                    <>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Title</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Type</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Author</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Date</th>
                                    </>
                                ) : (
                                    <>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Name</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Email</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Role</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Joined</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody className="bg-neutral-50 dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700">
                            {currentItems.length > 0 ? (
                                currentItems.map(item => (
                                    <tr key={item.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <SimpleCheckbox
                                                id={`select-${item.id}`}
                                                checked={selectedItems.includes(item.id)}
                                                onChange={() => toggleSelectItem(item.id)}
                                            />
                                        </td>
                                        {activeTab === 'content' ? (
                                            <>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-neutral-900 dark:text-white">{item.title}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${item.type === 'article' ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200' :
                                                        item.type === 'tutorial' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                                                            item.type === 'course' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200' :
                                                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
                                                        }`}>
                                                        {item.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${item.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                                                        item.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
                                                            'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'
                                                        }`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">{item.author}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">{item.date}</td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-neutral-900 dark:text-white">{item.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">{item.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${item.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' :
                                                        item.role === 'writer' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200' :
                                                            'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200'
                                                        }`}>
                                                        {item.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${item.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                                                        item.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
                                                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                                                        }`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">{item.joined}</td>
                                            </>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
                                        No items found matching your filters
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-700 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">{currentItems.length}</span> of{' '}
                        <span className="font-medium">{activeTab === 'content' ? contentItems.length : userItems.length}</span> items
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 border border-neutral-300 dark:border-neutral-600 rounded-md text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-700">
                            Previous
                        </button>
                        <button className="px-3 py-1 border border-neutral-300 dark:border-neutral-600 rounded-md text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-700">
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Danger Zone for Destructive Actions */}
            {(selectedAction === 'delete' || selectedAction === 'suspend') && (
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6 border border-red-100 dark:border-red-900/50">
                    <h2 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-400">Confirmation Required</h2>
                    <div className="flex items-center gap-3">
                        <SimpleSwitch
                            id="confirm-destructive"
                            label={`I understand this will ${selectedAction === 'delete' ? 'permanently delete' : 'suspend'} ${selectedItems.length} ${activeTab} and this action cannot be undone`}
                            checked={checked}
                            onChange={(val) => setChecked(val)}
                            required
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BulkActionsPage;