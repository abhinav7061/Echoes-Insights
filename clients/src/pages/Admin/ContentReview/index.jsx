import React, { useState } from 'react';
import Pagination from '../../../components/Admin/Pagination';
import ReviewSidebar from '../../../components/Admin/ReviewSidebar';
import ContentPreviewModal from '../../../components/Admin/ContentPreviewModal';
import DatePicker from 'react-datepicker';
import AdminHeading from '../../../components/Headers/AdminHeading';

const ContentReviewPage = () => {
    const [selectedContent, setSelectedContent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        status: 'pending',
        type: 'all',
        dateRange: [null, null]
    });
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [bulkActions, setBulkActions] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    // Mock data - replace with real API calls
    const contentToReview = [
        {
            id: 1,
            title: 'Advanced React Patterns',
            author: 'Alex Johnson',
            type: 'article',
            submitted: '2023-06-15',
            status: 'pending',
            flags: 3,
            preview: 'This article covers advanced React patterns...',
            content: '<p>Full article content here...</p>'
        },
        {
            id: 2,
            title: 'CSS Grid Tutorial',
            author: 'Sarah Williams',
            type: 'tutorial',
            submitted: '2023-06-14',
            status: 'pending',
            flags: 1,
            preview: 'Complete guide to CSS Grid layout...',
            content: '<p>Full tutorial content here...</p>'
        },
        {
            id: 3,
            title: 'TypeScript Best Practices',
            author: 'Mike Chen',
            type: 'article',
            submitted: '2023-06-13',
            status: 'pending',
            flags: 0,
            preview: 'Recommended practices for TypeScript...',
            content: '<p>Full article content here...</p>'
        },
        {
            id: 4,
            title: 'State Management Comparison',
            author: 'Emma Davis',
            type: 'article',
            submitted: '2023-06-12',
            status: 'flagged',
            flags: 5,
            preview: 'Comparing Redux, Context API, and Zustand...',
            content: '<p>Full article content here...</p>'
        },
        {
            id: 5,
            title: 'Node.js Security Guide',
            author: 'James Wilson',
            type: 'guide',
            submitted: '2023-06-11',
            status: 'pending',
            flags: 2,
            preview: 'Essential security practices for Node.js...',
            content: '<p>Full guide content here...</p>'
        }
    ];

    const filteredContent = contentToReview.filter(content => {
        // Apply status filter
        if (filters.status !== 'all' && content.status !== filters.status) return false;

        // Apply type filter
        if (filters.type !== 'all' && content.type !== filters.type) return false;

        // Apply date range filter if set
        if (filters.dateRange[0] && new Date(content.submitted) < filters.dateRange[0]) return false;
        if (filters.dateRange[1] && new Date(content.submitted) > filters.dateRange[1]) return false;

        return true;
    });

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredContent.length / itemsPerPage);
    const paginatedContent = filteredContent.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleApprove = (contentId) => {
        console.log('Approving content:', contentId);
        // API call to approve content
    };

    const handleReject = (contentId, reason) => {
        console.log('Rejecting content:', contentId, 'Reason:', reason);
        // API call to reject content
    };

    const handleRequestChanges = (contentId, feedback) => {
        console.log('Requesting changes for content:', contentId, 'Feedback:', feedback);
        // API call to request changes
    };

    const handlePreview = (content) => {
        setSelectedContent(content);
        setShowPreviewModal(true);
    };

    const handleBulkAction = (action) => {
        console.log('Performing bulk action:', action, 'on items:', selectedItems);
        // API call for bulk action
        setSelectedItems([]);
    };

    const toggleSelectItem = (contentId) => {
        setSelectedItems(prev =>
            prev.includes(contentId)
                ? prev.filter(id => id !== contentId)
                : [...prev, contentId]
        );
    };

    const toggleSelectAll = () => {
        if (selectedItems.length === paginatedContent.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(paginatedContent.map(item => item.id));
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

            <AdminHeading title='Content Review' desc='Moderate and review user-submitted content' />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-3">
                    {/* Filters */}
                    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-4 mb-6">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium">Status:</label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                    className="px-3 py-1 border border-neutral-300 dark:border-neutral-600 rounded-lg dark:bg-neutral-700 dark:text-white"
                                >
                                    <option value="all">All</option>
                                    <option value="pending">Pending</option>
                                    <option value="flagged">Flagged</option>
                                    <option value="reported">Reported</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium">Type:</label>
                                <select
                                    value={filters.type}
                                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                    className="px-3 py-1 border border-neutral-300 dark:border-neutral-600 rounded-lg dark:bg-neutral-700 dark:text-white"
                                >
                                    <option value="all">All</option>
                                    <option value="article">Articles</option>
                                    <option value="tutorial">Tutorials</option>
                                    <option value="guide">Guides</option>
                                    <option value="course">Courses</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium">Submitted:</label>
                                <DatePicker
                                    selectsRange={true}
                                    startDate={filters.dateRange[0]}
                                    endDate={filters.dateRange[1]}
                                    onChange={(update) => setFilters({ ...filters, dateRange: update })}
                                    placeholderText="Any date"
                                    className="px-3 py-1 border border-neutral-300 dark:border-neutral-600 rounded-lg dark:bg-neutral-700 dark:text-white"
                                />
                            </div>

                            <button
                                onClick={() => setFilters({ status: 'pending', type: 'all', dateRange: [null, null] })}
                                className="ml-auto text-sm text-sky-600 dark:text-sky-400 hover:underline"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>

                    {/* Bulk Actions */}
                    {selectedItems.length > 0 && (
                        <div className="bg-sky-50 dark:bg-sky-900/20 rounded-xl shadow-sm p-4 mb-6 flex items-center justify-between">
                            <div className="text-sm">
                                {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
                            </div>
                            <div className="flex gap-2">
                                <select
                                    value=""
                                    onChange={(e) => handleBulkAction(e.target.value)}
                                    className="px-3 py-1 border border-neutral-300 dark:border-neutral-600 rounded-lg dark:bg-neutral-700 dark:text-white"
                                >
                                    <option value="">Bulk Actions</option>
                                    <option value="approve">Approve Selected</option>
                                    <option value="reject">Reject Selected</option>
                                    <option value="request-changes">Request Changes</option>
                                </select>
                                <button
                                    onClick={() => setSelectedItems([])}
                                    className="px-3 py-1 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Content List */}
                    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm overflow-hidden">
                        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                            <thead className="bg-neutral-100 dark:bg-neutral-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider w-8">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.length === paginatedContent.length && paginatedContent.length > 0}
                                            onChange={toggleSelectAll}
                                            className="h-4 w-4 rounded border-neutral-300 text-sky-600 focus:ring-sky-500 dark:border-neutral-600 dark:bg-neutral-700"
                                        />
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                                        Author
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                                        Submitted
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-neutral-50 dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700">
                                {paginatedContent.length > 0 ? (
                                    paginatedContent.map((content) => (
                                        <tr key={content.id} className="hover:bg-neutral-100 dark:hover:bg-neutral-700">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(content.id)}
                                                    onChange={() => toggleSelectItem(content.id)}
                                                    className="h-4 w-4 rounded border-neutral-300 text-sky-600 focus:ring-sky-500 dark:border-neutral-600 dark:bg-neutral-700"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="text-sm font-medium text-neutral-900 dark:text-white">
                                                        {content.title}
                                                    </div>
                                                    {content.flags > 0 && (
                                                        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200">
                                                            {content.flags} flag{content.flags !== 1 ? 's' : ''}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-1">
                                                    {content.preview}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                                                {content.author}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full capitalize ${content.type === 'article' ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200' :
                                                    content.type === 'tutorial' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                                                        content.type === 'guide' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
                                                            'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200'
                                                    }`}>
                                                    {content.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                                                {content.submitted}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full capitalize ${content.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
                                                    content.status === 'flagged' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' :
                                                        'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200'
                                                    }`}>
                                                    {content.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handlePreview(content)}
                                                    className="text-sky-600 dark:text-sky-400 hover:text-sky-900 dark:hover:text-sky-300 mr-3"
                                                >
                                                    Preview
                                                </button>
                                                <button
                                                    onClick={() => handleApprove(content.id)}
                                                    className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 mr-3"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReject(content.id, 'Not meeting guidelines')}
                                                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                                                >
                                                    Reject
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
                                            No content found matching your filters
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="px-6 py-4 bg-neutral-100 dark:bg-neutral-700 border-t border-neutral-200 dark:border-neutral-700">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <ReviewSidebar
                        stats={{
                            pending: contentToReview.filter(c => c.status === 'pending').length,
                            flagged: contentToReview.filter(c => c.status === 'flagged').length,
                            approvedToday: 12,
                            avgReviewTime: '2.4 hours'
                        }}
                        onQuickAction={(action) => console.log('Quick action:', action)}
                    />
                </div>
            </div>

            {/* Preview Modal */}
            {showPreviewModal && selectedContent && (
                <ContentPreviewModal
                    content={selectedContent}
                    onApprove={() => {
                        handleApprove(selectedContent.id);
                        setShowPreviewModal(false);
                    }}
                    onReject={(reason) => {
                        handleReject(selectedContent.id, reason);
                        setShowPreviewModal(false);
                    }}
                    onRequestChanges={(feedback) => {
                        handleRequestChanges(selectedContent.id, feedback);
                        setShowPreviewModal(false);
                    }}
                    onClose={() => setShowPreviewModal(false)}
                />
            )}
        </div>
    );
};

export default ContentReviewPage;