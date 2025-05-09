import React from 'react'
import SettingActionsBtn from '../../../components/Button/SettingActionsBtn';
import { useNavigate } from 'react-router-dom';

const ContentModerationTab = () => {
    const navigate = useNavigate();
    const reportedContent = [
        { id: 1, title: 'React Advanced Patterns', type: 'article', reports: 3, author: 'Sarah Williams', status: 'pending' },
        { id: 2, title: 'CSS Grid Tutorial', type: 'tutorial', reports: 5, author: 'Mike Chen', status: 'reviewed' },
        { id: 3, title: 'JavaScript Fundamentals', type: 'article', reports: 1, author: 'Alex Johnson', status: 'pending' },
    ];

    const updateContentStatus = (contentId, newStatus) => {
        console.log(`Updating content ${contentId} to ${newStatus}`);
    };
    return (
        <div className="space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-lg font-semibold">Reported Content</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                        <thead className="bg-neutral-100 dark:bg-neutral-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Title</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Author</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Reports</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-neutral-50 dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700">
                            {reportedContent.map((content) => (
                                <tr key={content.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-neutral-900 dark:text-white">{content.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400 capitalize">{content.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">{content.author}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">{content.reports}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${content.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'}`}>
                                            {content.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => updateContentStatus(content.id, 'approved')}
                                            className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 mr-3"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => updateContentStatus(content.id, 'rejected')}
                                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Content Moderation Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SettingActionsBtn iconName='eye-outline' label='Content Review Queue' action={() => navigate('/admin/content-review')} className='bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg' />
                    <SettingActionsBtn iconName='flag-outline' label='Flagged Comments' action={() => navigate('/admin/flagged-comments')} className='bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg' />
                    <SettingActionsBtn iconName='copy-outline' label='Bulk Actions' action={() => navigate('/admin/bulk-actions')} className='bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg' />
                </div>
            </div>
        </div>
    )
}

export default ContentModerationTab