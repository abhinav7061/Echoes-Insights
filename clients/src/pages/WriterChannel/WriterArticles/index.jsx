import React from 'react';
import { useOutletContext } from 'react-router-dom';

const WriterArticlesTab = () => {
    const { writer, isOwner } = useOutletContext();

    // Mock articles data
    const articles = [
        { id: 1, title: 'Advanced React Patterns', views: 842, date: 'May 15, 2023', readTime: '8 min' },
        { id: 2, title: 'CSS Grid Complete Guide', views: 721, date: 'May 10, 2023', readTime: '12 min' },
        { id: 3, title: 'TypeScript for Beginners', views: 532, date: 'May 5, 2023', readTime: '10 min' },
        { id: 4, title: 'State Management Comparison', views: 489, date: 'Apr 28, 2023', readTime: '15 min' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Articles</h2>
                {isOwner && (
                    <button
                        onClick={() => navigate('/editor')}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center gap-2"
                    >
                        <ion-icon name="add-outline"></ion-icon>
                        New Article
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {articles.map(article => (
                    <div key={article.id} className="border-b border-neutral-100 dark:border-neutral-700 pb-4">
                        <h3 className="font-medium text-lg hover:underline cursor-pointer">{article.title}</h3>
                        <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                            <span>{article.views.toLocaleString()} views</span>
                            <span>{article.date} · {article.readTime} read</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WriterArticlesTab;