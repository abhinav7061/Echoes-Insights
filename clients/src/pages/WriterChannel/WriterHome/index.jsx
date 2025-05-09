import React from 'react';
import { useOutletContext } from 'react-router-dom';

const WriterHomeTab = () => {
    const { writer, contents, isOwner } = useOutletContext();

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6">Featured Content</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Featured Articles */}
                <div className="bg-neutral-50 dark:bg-neutral-700/30 rounded-lg p-4">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                        <ion-icon name="document-text-outline"></ion-icon>
                        Popular Articles
                    </h3>
                    <ul className="space-y-2">
                        <li className="hover:underline cursor-pointer">Advanced React Patterns</li>
                        <li className="hover:underline cursor-pointer">CSS Grid Complete Guide</li>
                        <li className="hover:underline cursor-pointer">TypeScript Best Practices</li>
                    </ul>
                </div>

                {/* Featured Videos */}
                <div className="bg-neutral-50 dark:bg-neutral-700/30 rounded-lg p-4">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                        <ion-icon name="videocam-outline"></ion-icon>
                        Latest Videos
                    </h3>
                    <ul className="space-y-2">
                        <li className="hover:underline cursor-pointer">React Hooks Explained</li>
                        <li className="hover:underline cursor-pointer">Node.js Performance Tips</li>
                        <li className="hover:underline cursor-pointer">CSS Animations Tutorial</li>
                    </ul>
                </div>

                {/* Channel Stats */}
                <div className="bg-neutral-50 dark:bg-neutral-700/30 rounded-lg p-4">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                        <ion-icon name="stats-chart-outline"></ion-icon>
                        Channel Stats
                    </h3>
                    <div className="space-y-2">
                        <p>{contents.articles} published articles</p>
                        <p>{contents.videos} tutorial videos</p>
                        <p>{contents.podcasts} podcast episodes</p>
                        <p>{writer.followers.toLocaleString()} followers</p>
                    </div>
                </div>
            </div>

            {isOwner && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                        <ion-icon name="sparkles-outline"></ion-icon>
                        Channel Tips
                    </h3>
                    <p className="text-sm">
                        You're viewing your own channel. Use the "Customize Channel" button to update your profile
                        and banner. Create more content to grow your audience!
                    </p>
                </div>
            )}
        </div>
    );
};

export default WriterHomeTab;