import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar-overrides.css';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';

const SchedulePage = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [newPost, setNewPost] = useState({
        title: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        time: '12:00',
        status: 'draft'
    });

    // Mock scheduled posts - replace with real data from your API
    const scheduledPosts = [
        { id: 1, title: 'React Hooks Deep Dive', date: '2025-05-05', time: '09:00', status: 'scheduled' },
        { id: 2, title: 'CSS Grid Tutorial', date: '2025-05-08', time: '14:30', status: 'scheduled' },
        { id: 3, title: 'TypeScript Best Practices', date: '2025-05-04', time: '11:00', status: 'draft' },
        { id: 4, title: 'State Management Comparison', date: '2025-05-02', time: '16:45', status: 'scheduled' },
    ];

    const handleDateChange = (newDate) => {
        setDate(newDate);
        setNewPost(prev => ({
            ...prev,
            date: format(newDate, 'yyyy-MM-dd')
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSchedulePost = (e) => {
        e.preventDefault();
        // Here you would typically make an API call to schedule the post
        console.log('Scheduling post:', newPost);
        setShowScheduleModal(false);
        // Reset form
        setNewPost({
            title: '',
            date: format(new Date(), 'yyyy-MM-dd'),
            time: '12:00',
            status: 'draft'
        });
    };

    const handlePublishNow = (postId) => {
        // Implement publish now functionality
        console.log('Publishing post:', postId);
    };

    const handleEditPost = (postId) => {
        navigate(`/editor/${postId}`);
    };

    const handleDeletePost = (postId) => {
        // Implement delete functionality
        console.log('Deleting post:', postId);
    };

    const postsForSelectedDate = scheduledPosts.filter(post =>
        post.date === format(date, 'yyyy-MM-dd')
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Content Schedule</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        Manage and schedule your content for publication
                    </p>
                </div>
                <button
                    onClick={() => setShowScheduleModal(true)}
                    className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors"
                >
                    <ion-icon name="add-outline"></ion-icon>
                    Schedule New Post
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar Section */}
                <div className="lg:col-span-1 bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <Calendar
                        onChange={handleDateChange}
                        value={date}
                        tileClassName={({ date: tileDate }) =>
                            cn(
                                'dark:hover:text-black rounded-md',
                                scheduledPosts.some(post => post.date === format(tileDate, 'yyyy-MM-dd'))
                                    ? 'scheduled_tile dark:bg-neutral-700'
                                    : ''
                            )
                        }
                    />

                    <div className="mt-6">
                        <h3 className="text-lg font-medium mb-3">Legend</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-sky-500"></div>
                                <span className="text-sm">Scheduled posts</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="text-sm">Published posts</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <span className="text-sm">Drafts</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scheduled Posts List */}
                <div className="lg:col-span-2 bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">
                            Posts for {format(date, 'MMMM d, yyyy')}
                        </h2>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setDate(new Date(date.setDate(date.getDate() - 1)))}
                                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
                            >
                                <ion-icon name="chevron-back-outline"></ion-icon>
                            </button>
                            <button
                                onClick={() => setDate(new Date())}
                                className="px-3 py-1 text-sm bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded-lg"
                            >
                                Today
                            </button>
                            <button
                                onClick={() => setDate(new Date(date.setDate(date.getDate() + 1)))}
                                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
                            >
                                <ion-icon name="chevron-forward-outline"></ion-icon>
                            </button>
                        </div>
                    </div>

                    {postsForSelectedDate.length > 0 ? (
                        <div className="space-y-4">
                            {postsForSelectedDate.map(post => (
                                <div key={post.id} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium">{post.title}</h3>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                                                Scheduled for {post.date} at {post.time}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full ${post.status === 'scheduled'
                                            ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200'
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
                                            }`}>
                                            {post.status}
                                        </span>
                                    </div>

                                    <div className="flex justify-end gap-2 mt-4">
                                        <button
                                            onClick={() => handlePublishNow(post.id)}
                                            className="px-3 py-1 text-sm bg-green-100 hover:bg-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg"
                                        >
                                            Publish Now
                                        </button>
                                        <button
                                            onClick={() => handleEditPost(post.id)}
                                            className="px-3 py-1 text-sm bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded-lg"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeletePost(post.id)}
                                            className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <ion-icon name="calendar-outline" className="text-4xl text-neutral-400 mx-auto mb-3"></ion-icon>
                            <h3 className="text-lg font-medium">No posts scheduled</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                                You don't have any posts scheduled for this date.
                            </p>
                            <button
                                onClick={() => setShowScheduleModal(true)}
                                className="mt-4 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg"
                            >
                                Schedule a Post
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Schedule New Post Modal */}
            {showScheduleModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl shadow-lg w-full max-w-md">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Schedule New Post</h3>
                                <button
                                    onClick={() => setShowScheduleModal(false)}
                                    className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                >
                                    <ion-icon name="close-outline" className="text-xl"></ion-icon>
                                </button>
                            </div>

                            <form onSubmit={handleSchedulePost}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                                            Post Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={newPost.title}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-neutral-700 dark:text-white"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                                                Date
                                            </label>
                                            <input
                                                type="date"
                                                name="date"
                                                value={newPost.date}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-neutral-700 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                                                Time
                                            </label>
                                            <input
                                                type="time"
                                                name="time"
                                                value={newPost.time}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-neutral-700 dark:text-white"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                                            Status
                                        </label>
                                        <select
                                            name="status"
                                            value={newPost.status}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-neutral-700 dark:text-white"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="scheduled">Scheduled</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowScheduleModal(false)}
                                        className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors"
                                    >
                                        Schedule Post
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SchedulePage;