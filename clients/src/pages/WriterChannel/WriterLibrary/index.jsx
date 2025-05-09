import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserAuthentication } from '../../../context/userContext';

const WriterLibraryPage = () => {
    const { writerId } = useParams();
    const { user } = useUserAuthentication();
    const navigate = useNavigate();

    const isOwner = user?.id === writerId;

    // Mock Library data - replace with API calls
    const [library, setLibrary] = useState([
        {
            id: '1',
            title: 'React Masterclass',
            thumbnail: 'https://i.ytimg.com/vi/7b42lVMdEjE/maxresdefault.jpg',
            videoCount: 12,
            viewCount: 24500,
            lastUpdated: '2 weeks ago',
            visibility: 'public',
            description: 'Complete React tutorial series from basics to advanced patterns'
        },
        {
            id: '2',
            title: 'JavaScript Fundamentals',
            thumbnail: 'https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg',
            videoCount: 8,
            viewCount: 18700,
            lastUpdated: '1 month ago',
            visibility: 'public',
            description: 'Learn JavaScript core concepts with practical examples'
        },
        {
            id: '3',
            title: 'Private Tutorials',
            thumbnail: 'https://i.ytimg.com/vi/3PHXvlpOkf4/maxresdefault.jpg',
            videoCount: 5,
            viewCount: 0,
            lastUpdated: '3 days ago',
            visibility: 'private',
            description: 'Exclusive content for premium members'
        },
    ]);

    const [newPlaylistTitle, setNewPlaylistTitle] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const handleCreatePlaylist = () => {
        if (!newPlaylistTitle.trim()) return;

        const newPlaylist = {
            id: Date.now().toString(),
            title: newPlaylistTitle,
            thumbnail: '',
            videoCount: 0,
            viewCount: 0,
            lastUpdated: 'Just now',
            visibility: 'private',
            description: ''
        };

        setLibrary(prev => [newPlaylist, ...prev]);
        setNewPlaylistTitle('');
        setIsCreating(false);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-2xl md:text-xl font-bold">Created Libraries</h1>

                {isOwner && (
                    <div className="mt-4 md:mt-0 flex items-center gap-3">
                        {isCreating ? (
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newPlaylistTitle}
                                    onChange={(e) => setNewPlaylistTitle(e.target.value)}
                                    placeholder="Playlist title"
                                    className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 dark:bg-neutral-700 dark:text-white"
                                    autoFocus
                                />
                                <button
                                    onClick={handleCreatePlaylist}
                                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg"
                                >
                                    Create
                                </button>
                                <button
                                    onClick={() => setIsCreating(false)}
                                    className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsCreating(true)}
                                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg flex items-center gap-2"
                            >
                                <ion-icon name="add-outline"></ion-icon>
                                New Playlist
                            </button>
                        )}
                    </div>
                )}
            </div>

            {library.length === 0 ? (
                <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-8 text-center">
                    <ion-icon name="list-outline" className="text-5xl text-neutral-400 dark:text-neutral-500 mb-4"></ion-icon>
                    <h3 className="text-lg font-medium mb-2">No Library yet</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                        {isOwner ? 'Create your first playlist to organize your content' : 'This writer has not created any Library'}
                    </p>
                    {isOwner && (
                        <button
                            onClick={() => setIsCreating(true)}
                            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg flex items-center gap-2 mx-auto"
                        >
                            <ion-icon name="add-outline"></ion-icon>
                            Create Playlist
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {library.map(playlist => (
                        <PlaylistCard
                            key={playlist.id}
                            playlist={playlist}
                            isOwner={isOwner}
                            onClick={() => navigate(`/writer/${writerId}/playlist/${playlist.id}`)}
                            onEdit={() => navigate(`/writer/${writerId}/playlist/${playlist.id}/edit`)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const PlaylistCard = ({ playlist, isOwner, onClick, onEdit }) => {
    return (
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {/* Thumbnail */}
            <div className="relative cursor-pointer" onClick={onClick}>
                <img
                    src={playlist.thumbnail || 'https://via.placeholder.com/320x180?text=No+Thumbnail'}
                    alt={playlist.title}
                    className="w-full h-40 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {playlist.videoCount} {playlist.videoCount === 1 ? 'video' : 'videos'}
                </div>
                {playlist.visibility === 'private' && (
                    <div className="absolute top-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <ion-icon name="lock-closed-outline" className="text-xs"></ion-icon>
                        Private
                    </div>
                )}
            </div>

            {/* Playlist Info */}
            <div className="p-4">
                <div className="flex justify-between gap-2">
                    <h3
                        className="font-medium line-clamp-2 cursor-pointer hover:text-neutral-800 dark:hover:text-neutral-800"
                        onClick={onClick}
                    >
                        {playlist.title}
                    </h3>
                    {isOwner && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit();
                            }}
                            className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-800"
                        >
                            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                        </button>
                    )}
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                    {playlist.description}
                </p>

                <div className="flex items-center justify-between mt-3 text-xs text-neutral-500 dark:text-neutral-400">
                    <span>{playlist.viewCount.toLocaleString()} views</span>
                    <span>{playlist.lastUpdated}</span>
                </div>
            </div>
        </div>
    );
};

export default WriterLibraryPage;