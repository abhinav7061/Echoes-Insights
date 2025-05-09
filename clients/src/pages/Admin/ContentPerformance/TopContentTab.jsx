import React, { useState } from 'react'

const TopContentTab = () => {
    const [filter, setFilter] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'views', direction: 'desc' });
    const contentPerformance = [
        {
            id: 1,
            title: 'Advanced React Patterns',
            author: 'Alex Johnson',
            type: 'article',
            published: '2023-05-15',
            views: 8420,
            reads: 5120,
            likes: 1240,
            shares: 420,
            comments: 180,
            status: 'published'
        },
        {
            id: 2,
            title: 'CSS Grid Complete Guide',
            author: 'Sarah Williams',
            type: 'tutorial',
            published: '2023-05-10',
            views: 7210,
            reads: 4210,
            likes: 980,
            shares: 310,
            comments: 145,
            status: 'published'
        },
        {
            id: 3,
            title: 'TypeScript for Beginners',
            author: 'Mike Chen',
            type: 'course',
            published: '2023-05-05',
            views: 5320,
            reads: 3120,
            likes: 760,
            shares: 210,
            comments: 95,
            status: 'published'
        },
        {
            id: 4,
            title: 'State Management Comparison',
            author: 'Emma Davis',
            type: 'article',
            published: '2023-04-28',
            views: 4890,
            reads: 2890,
            likes: 640,
            shares: 180,
            comments: 72,
            status: 'published'
        },
        {
            id: 5,
            title: 'Node.js Best Practices',
            author: 'James Wilson',
            type: 'guide',
            published: '2023-04-22',
            views: 4210,
            reads: 2510,
            likes: 520,
            shares: 150,
            comments: 68,
            status: 'draft'
        }
    ];

    const filteredContent = contentPerformance.filter(item => {
        if (filter === 'all') return true;
        if (filter === 'published') return item.status === 'published';
        if (filter === 'drafts') return item.status === 'draft';
        return item.type === filter;
    });

    const maxViews = Math.max(...contentPerformance.map(item => item.views));

    const sortedContent = [...filteredContent].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getPerformanceColor = (value, max) => {
        const percentage = (value / max) * 100;
        if (percentage > 75) return 'bg-green-500';
        if (percentage > 50) return 'bg-sky-500';
        if (percentage > 25) return 'bg-yellow-500';
        return 'bg-red-500';
    };
    return (
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h2 className="text-lg font-semibold">Top Performing Content</h2>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <select
                            value={sortConfig.key}
                            onChange={(e) => requestSort(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-neutral-700 dark:text-white"
                        >
                            <option value="views">Sort by Views</option>
                            <option value="reads">Sort by Reads</option>
                            <option value="likes">Sort by Likes</option>
                            <option value="shares">Sort by Shares</option>
                            <option value="comments">Sort by Comments</option>
                        </select>
                        <ion-icon
                            name={sortConfig.direction === 'asc' ? 'arrow-up-outline' : 'arrow-down-outline'}
                            className="absolute left-3 top-2.5 text-neutral-400"
                        ></ion-icon>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                    <thead className="bg-neutral-50 dark:bg-neutral-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Author</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Published</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Views</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Engagement</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-neutral-50 dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700">
                        {sortedContent.map((content) => (
                            <tr key={content.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-md bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                                            {content.type === 'article' && <ion-icon name="document-text-outline"></ion-icon>}
                                            {content.type === 'tutorial' && <ion-icon name="code-slash-outline"></ion-icon>}
                                            {content.type === 'course' && <ion-icon name="school-outline"></ion-icon>}
                                            {content.type === 'guide' && <ion-icon name="book-outline"></ion-icon>}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-neutral-900 dark:text-white">{content.title}</div>
                                            <div className="text-sm text-neutral-500 dark:text-neutral-400">
                                                {content.likes} likes · {content.comments} comments
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">{content.author}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${content.type === 'article' ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200' :
                                        content.type === 'tutorial' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                                            content.type === 'course' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200' :
                                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
                                        }`}>
                                        {content.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">{content.published}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-16 mr-2">
                                            <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${getPerformanceColor(content.views, maxViews)}`}
                                                    style={{ width: `${(content.views / maxViews) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium">{content.views.toLocaleString()}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium">
                                        {Math.round((content.reads / content.views) * 100)}%
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => navigate(`/editor/${content.id}`)}
                                        className="text-sky-600 dark:text-sky-400 hover:text-sky-900 dark:hover:text-sky-300 mr-3"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => console.log('Analyze', content.id)}
                                        className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                                    >
                                        Analyze
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-700 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedContent.length}</span> of <span className="font-medium">{contentPerformance.length}</span> content
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
    )
}

export default TopContentTab