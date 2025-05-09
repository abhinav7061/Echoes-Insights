import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, PieChart } from '../../../components/Charts';
import AdminHeading from '../../../components/Headers/AdminHeading';

const FlaggedCommentsPage = () => {
    const navigate = useNavigate();
    const [selectedComments, setSelectedComments] = useState([]);
    const [bulkAction, setBulkAction] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    // Mock data - replace with real API calls
    const flaggedComments = [
        {
            id: 1,
            content: "This is completely wrong information! The author doesn't know what they're talking about.",
            author: "JohnDoe123",
            postTitle: "React Hooks Explained",
            postAuthor: "SarahWilliams",
            flags: [
                { type: 'inappropriate', count: 3 },
                { type: 'misinformation', count: 2 },
                { type: 'spam', count: 1 }
            ],
            date: "2023-06-15T14:30:00Z",
            status: "pending"
        },
        {
            id: 2,
            content: "You can get the premium version for free at this sketchy website: freestuff.com",
            author: "FreebieHunter",
            postTitle: "Advanced TypeScript Patterns",
            postAuthor: "MikeChen",
            flags: [
                { type: 'spam', count: 5 },
                { type: 'phishing', count: 2 }
            ],
            date: "2023-06-14T09:15:00Z",
            status: "pending"
        },
        {
            id: 3,
            content: "The solution in this article is terrible. Only an idiot would implement it this way.",
            author: "AngryDev",
            postTitle: "CSS Grid Layout Guide",
            postAuthor: "EmmaDavis",
            flags: [
                { type: 'harassment', count: 4 },
                { type: 'inappropriate', count: 2 }
            ],
            date: "2023-06-13T18:45:00Z",
            status: "pending"
        },
        {
            id: 4,
            content: "I've reported this comment before but nothing was done. The content is clearly violating your guidelines!",
            author: "FrustratedUser",
            postTitle: "Node.js Performance Tips",
            postAuthor: "JamesWilson",
            flags: [
                { type: 'inappropriate', count: 1 }
            ],
            date: "2023-06-12T11:20:00Z",
            status: "reported"
        },
        {
            id: 5,
            content: "This is a duplicate comment to boost my visibility. Please check out my profile for more great content!",
            author: "SelfPromoter",
            postTitle: "JavaScript Best Practices",
            postAuthor: "AlexJohnson",
            flags: [
                { type: 'spam', count: 3 }
            ],
            date: "2023-06-10T16:10:00Z",
            status: "pending"
        }
    ];

    const toggleCommentSelection = (commentId) => {
        setSelectedComments(prev =>
            prev.includes(commentId)
                ? prev.filter(id => id !== commentId)
                : [...prev, commentId]
        );
    };

    const toggleSelectAll = () => {
        if (selectedComments.length === flaggedComments.length) {
            setSelectedComments([]);
        } else {
            setSelectedComments(flaggedComments.map(comment => comment.id));
        }
    };

    const handleStatusChange = async (commentId, newStatus) => {
        setIsProcessing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(`Changing comment ${commentId} to ${newStatus}`);
        setIsProcessing(false);
    };

    const handleBulkAction = async () => {
        if (!bulkAction || selectedComments.length === 0) return;

        setIsProcessing(true);
        // Simulate bulk action
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Performing ${bulkAction} on ${selectedComments.length} comments`);
        setSelectedComments([]);
        setBulkAction('');
        setIsProcessing(false);
    };

    const getFlagColor = (type) => {
        switch (type) {
            case 'inappropriate':
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
            case 'harassment':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200';
            case 'spam':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
            case 'misinformation':
                return 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200';
            case 'phishing':
                return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
            default:
                return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
            case 'reported':
                return 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200';
            case 'resolved':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
            default:
                return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

            <AdminHeading title='Flagged Comments' desc='Review and moderate inappropriate or harmful comments' />

            {/* Bulk Actions */}
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={selectedComments.length === flaggedComments.length && flaggedComments.length > 0}
                            onChange={toggleSelectAll}
                            className="h-4 w-4 rounded border-neutral-300 text-sky-600 focus:ring-sky-500 dark:border-neutral-600 dark:bg-neutral-700"
                        />
                        <span className="ml-2 text-sm">
                            {selectedComments.length > 0
                                ? `${selectedComments.length} selected`
                                : 'Select all'}
                        </span>
                    </div>

                    <div className="flex-1 flex flex-col sm:flex-row gap-2">
                        <select
                            value={bulkAction}
                            onChange={(e) => setBulkAction(e.target.value)}
                            className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-neutral-700 dark:text-white"
                        >
                            <option value="">Bulk Actions</option>
                            <option value="approve">Approve (keep visible)</option>
                            <option value="remove">Remove comment</option>
                            <option value="warn">Warn user</option>
                            <option value="ban">Ban user</option>
                        </select>
                        <button
                            onClick={handleBulkAction}
                            disabled={!bulkAction || selectedComments.length === 0 || isProcessing}
                            className={`px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors ${(!bulkAction || selectedComments.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isProcessing ? 'Processing...' : 'Apply'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="text-sm font-medium">Filter by:</div>
                <button
                    onClick={() => { }}
                    className="px-3 py-1 rounded-full text-sm bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200"
                >
                    All Flags
                </button>
                <button
                    onClick={() => { }}
                    className="px-3 py-1 rounded-full text-sm bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                    Inappropriate
                </button>
                <button
                    onClick={() => { }}
                    className="px-3 py-1 rounded-full text-sm bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                    Harassment
                </button>
                <button
                    onClick={() => { }}
                    className="px-3 py-1 rounded-full text-sm bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                    Spam
                </button>
                <button
                    onClick={() => { }}
                    className="px-3 py-1 rounded-full text-sm bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                    Misinformation
                </button>
                <button
                    onClick={() => { }}
                    className="px-3 py-1 rounded-full text-sm bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                    Phishing
                </button>
            </div>

            {/* Status Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="text-sm font-medium">Status:</div>
                <button
                    onClick={() => { }}
                    className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                >
                    Pending Review
                </button>
                <button
                    onClick={() => { }}
                    className="px-3 py-1 rounded-full text-sm bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200"
                >
                    Reported
                </button>
                <button
                    onClick={() => { }}
                    className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                >
                    Resolved
                </button>
            </div>

            {/* Comments Table */}
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                        <thead className="bg-neutral-100 dark:bg-neutral-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                                    <input
                                        type="checkbox"
                                        checked={selectedComments.length === flaggedComments.length && flaggedComments.length > 0}
                                        onChange={toggleSelectAll}
                                        className="h-4 w-4 rounded border-neutral-300 text-sky-600 focus:ring-sky-500 dark:border-neutral-600 dark:bg-neutral-700"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Comment</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Flags</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Post</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Author</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-neutral-50 dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700">
                            {flaggedComments.map((comment) => (
                                <tr key={comment.id} className="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedComments.includes(comment.id)}
                                            onChange={() => toggleCommentSelection(comment.id)}
                                            className="h-4 w-4 rounded border-neutral-300 text-sky-600 focus:ring-sky-500 dark:border-neutral-600 dark:bg-neutral-700"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-neutral-900 dark:text-white max-w-xs truncate">
                                            {comment.content}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-wrap gap-1">
                                            {comment.flags.map((flag, index) => (
                                                <span
                                                    key={index}
                                                    className={`px-2 py-1 text-xs rounded-full ${getFlagColor(flag.type)}`}
                                                >
                                                    {flag.type} ({flag.count})
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-neutral-900 dark:text-white">{comment.postTitle}</div>
                                        <div className="text-xs text-neutral-500 dark:text-neutral-400">by {comment.postAuthor}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                                        {comment.author}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                                        {new Date(comment.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(comment.status)}`}>
                                            {comment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleStatusChange(comment.id, 'approve')}
                                                className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                                                title="Approve"
                                            >
                                                <ion-icon name="checkmark-outline"></ion-icon>
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(comment.id, 'remove')}
                                                className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                                                title="Remove"
                                            >
                                                <ion-icon name="trash-outline"></ion-icon>
                                            </button>
                                            <button
                                                onClick={() => navigate(`/admin/users/${comment.author}`)}
                                                className="text-sky-600 dark:text-sky-400 hover:text-sky-900 dark:hover:text-sky-300"
                                                title="View User"
                                            >
                                                <ion-icon name="person-outline"></ion-icon>
                                            </button>
                                            <button
                                                onClick={() => navigate(`/posts/${comment.postTitle.replace(/\s+/g, '-').toLowerCase()}`)}
                                                className="text-purple-600 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300"
                                                title="View Post"
                                            >
                                                <ion-icon name="document-outline"></ion-icon>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 bg-neutral-100 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">{flaggedComments.length}</span> of <span className="font-medium">{flaggedComments.length}</span> flagged comments
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 border border-neutral-300 dark:border-neutral-600 rounded-md text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                            Previous
                        </button>
                        <button className="px-3 py-1 border border-neutral-300 dark:border-neutral-600 rounded-md text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-medium mb-4">Flag Types Distribution</h3>
                    <div className="h-64">
                        <PieChart
                            data={{
                                labels: ['Inappropriate', 'Harassment', 'Spam', 'Misinformation', 'Phishing'],
                                datasets: [
                                    {
                                        data: [35, 25, 20, 15, 5],
                                        backgroundColor: [
                                            'rgba(239, 68, 68, 0.7)',
                                            'rgba(139, 92, 246, 0.7)',
                                            'rgba(245, 158, 11, 0.7)',
                                            'rgba(59, 130, 246, 0.7)',
                                            'rgba(249, 115, 22, 0.7)'
                                        ]
                                    }
                                ]
                            }}
                        />
                    </div>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-medium mb-4">Resolution Rate</h3>
                    <div className="h-64">
                        <BarChart
                            data={{
                                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                                datasets: [
                                    {
                                        label: 'Flagged',
                                        data: [120, 150, 170, 190, 210, 240],
                                        backgroundColor: 'rgba(245, 158, 11, 0.7)'
                                    },
                                    {
                                        label: 'Resolved',
                                        data: [80, 110, 130, 150, 180, 210],
                                        backgroundColor: 'rgba(16, 185, 129, 0.7)'
                                    }
                                ]
                            }}
                            options={{
                                indexAxis: 'y',
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: 'top' },
                                },
                                scales: {
                                    x: { beginAtZero: true },
                                },
                            }}
                        />
                    </div>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-medium mb-4">Top Flagged Users</h3>
                    <div className="space-y-3">
                        {[
                            { user: 'AngryDev', flags: 12, status: 'active' },
                            { user: 'TrollMaster', flags: 8, status: 'warned' },
                            { user: 'SpamBot', flags: 15, status: 'banned' },
                            { user: 'FakeExpert', flags: 6, status: 'active' },
                            { user: 'OffensiveUser', flags: 9, status: 'suspended' }
                        ].map((user, index) => (
                            <div key={index} className="flex items-center justify-between p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium">{user.user}</span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${user.status === 'banned' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' :
                                        user.status === 'suspended' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
                                            user.status === 'warned' ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200' :
                                                'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                                        }`}>
                                        {user.status}
                                    </span>
                                </div>
                                <span className="text-sm font-medium">{user.flags} flags</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlaggedCommentsPage;