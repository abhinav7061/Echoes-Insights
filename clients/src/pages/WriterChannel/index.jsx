import React, { useState } from 'react';
import { useParams, useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { useUserAuthentication } from '../../context/userContext';
import Tabs from '../../components/TabView/Tabs';

const WriterChannelPage = () => {
    const { writerId } = useParams();
    const { user } = useUserAuthentication();
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.pathname)

    // Mock data - replace with API calls
    const [writer, setWriter] = useState({
        id: writerId,
        name: 'Jane Doe',
        avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
        bio: 'Tech writer specializing in React and Node.js. Sharing knowledge through tutorials and articles.',
        followers: 1245,
        following: 86,
        isFollowing: false,
        isOwner: user?.id === writerId
    });

    const [activeTab, setActiveTab] = useState(location?.pathname.split('/')[3] || 'home');
    const [contents, setContents] = useState({
        articles: 24,
        videos: 12,
        podcasts: 5,
        playlists: 3
    });

    const tabs = [
        { key: 'home', label: 'Home', icon: 'home-outline' },
        { key: 'articles', label: 'Articles', icon: 'document-text-outline' },
        // { key: 'videos', label: 'Videos', icon: 'videocam-outline' },
        // { key: 'podcasts', label: 'Podcasts', icon: 'mic-outline' },
        { key: 'libraries', label: 'Libraries', icon: 'list-outline' },
        { key: 'about', label: 'About', icon: 'information-circle-outline' },
        ...(writer.isOwner ? [{ key: 'analytics', label: 'Analytics', icon: 'analytics-outline' }] : [])
    ];

    const handleFollow = () => {
        setWriter(prev => ({
            ...prev,
            isFollowing: !prev.isFollowing,
            followers: prev.isFollowing ? prev.followers - 1 : prev.followers + 1
        }));
        // API call to follow/unfollow would go here
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="h-32 bg-gradient-to-r from-sky-500 to-purple-600 dark:from-sky-800 dark:to-purple-800"></div>
                <div className="px-6 pb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-16 relative">
                        <div className="flex items-end gap-4">
                            <img
                                src={writer.avatar}
                                alt={writer.name}
                                className="w-32 h-32 rounded-full border-4 border-eutral-50 dark:border-neutral-900 bg-white dark:bg-neutral-700"
                            />
                            <div className="sm:hidden">
                                {!writer.isOwner && (
                                    <button
                                        onClick={handleFollow}
                                        className={`px-4 py-1 rounded-full text-sm font-medium ${writer.isFollowing
                                            ? 'bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                            }`}
                                    >
                                        {writer.isFollowing ? 'Following' : 'Follow'}
                                    </button>
                                )}
                                {writer.isOwner && (
                                    <button
                                        onClick={() => navigate('/settings/channel')}
                                        className="px-4 py-1 rounded-full text-sm font-medium bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                                    >
                                        Customize Channel
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                            <h1 className="text-2xl font-bold">{writer.name}</h1>
                            <p className="text-neutral-600 dark:text-neutral-100 mt-1">{writer.bio}</p>

                            <div className="flex items-center gap-4 mt-3 text-sm">
                                <span className="font-medium">{writer.followers.toLocaleString()} followers</span>
                                <span className="font-medium">{writer.following} following</span>
                                <span className="font-medium">{contents.articles} articles</span>
                            </div>
                        </div>

                        <div className="hidden sm:block mt-4 sm:mt-0">
                            {!writer.isOwner && (
                                <button
                                    onClick={handleFollow}
                                    className={`px-6 py-2 rounded-full text-sm font-medium ${writer.isFollowing
                                        ? 'bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                                        : 'bg-sky-600 hover:bg-sky-700 text-white'
                                        }`}
                                >
                                    {writer.isFollowing ? 'Following' : 'Follow'}
                                </button>
                            )}
                            {writer.isOwner && (
                                <button
                                    onClick={() => navigate('/settings/channel')}
                                    className="px-6 py-2 rounded-full text-sm font-medium bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                                >
                                    Customize Channel
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <Tabs tabs={tabs} activeTab={activeTab} handleTabChange={(key) => {
                navigate(key === 'home' ? '' : key === 'analytics' ? '/analytics' : key);
                setActiveTab(key)
            }} tabBtnClass='py-4 px-1 text-sm font-medium gap-2' containerClass='gap-8' />

            <Outlet context={{ writer, contents, isOwner: writer.isOwner }} />
        </div>
    );
};

export default WriterChannelPage;