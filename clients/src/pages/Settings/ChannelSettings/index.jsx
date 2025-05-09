import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import SettingsHeading from '../../../components/Headers/heading';

const ChannelSettingsPage = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const bannerInputRef = useRef(null);

    // Current channel data (replace with actual data from API/context)
    const [channel, setChannel] = useState({
        name: 'Jane Doe',
        handle: '@janedoe',
        bio: 'Tech writer specializing in React and Node.js. Sharing knowledge through tutorials and articles.',
        avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
        banner: '',
        links: [
            { id: 1, platform: 'website', url: 'https://janedoe.dev' },
            { id: 2, platform: 'twitter', url: 'https://twitter.com/janedoe' }
        ],
        socialMedia: {
            twitter: 'janedoe',
            github: 'janedoe',
            linkedin: 'janedoe',
            youtube: ''
        }
    });

    const [newLink, setNewLink] = useState({ platform: 'website', url: '' });
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setChannel(prev => ({ ...prev, avatar: event.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setChannel(prev => ({ ...prev, banner: event.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddLink = () => {
        if (newLink.url) {
            setChannel(prev => ({
                ...prev,
                links: [...prev.links, {
                    id: Date.now(),
                    platform: newLink.platform,
                    url: newLink.url
                }]
            }));
            setNewLink({ platform: 'website', url: '' });
        }
    };

    const handleRemoveLink = (id) => {
        setChannel(prev => ({
            ...prev,
            links: prev.links.filter(link => link.id !== id)
        }));
    };

    const handleSocialMediaChange = (platform, value) => {
        setChannel(prev => ({
            ...prev,
            socialMedia: {
                ...prev.socialMedia,
                [platform]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error('Error saving channel settings:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const platformOptions = [
        { value: 'website', label: 'Website' },
        { value: 'twitter', label: 'Twitter' },
        { value: 'github', label: 'GitHub' },
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'youtube', label: 'YouTube' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'patreon', label: 'Patreon' }
    ];

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6">

            <SettingsHeading title='Channel Customization' />

            <form onSubmit={handleSubmit}>
                {/* Banner & Avatar Section */}
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm overflow-hidden mb-6">
                    {/* Banner */}
                    <div
                        className="h-32 bg-gradient-to-r from-sky-500 to-purple-600  dark:from-sky-800 dark:to-purple-800 relative"
                        style={channel.banner ? { backgroundImage: `url(${channel.banner})`, backgroundSize: 'cover' } : {}}
                    >
                        <button
                            type="button"
                            onClick={() => bannerInputRef.current.click()}
                            className="absolute top-4 right-4 px-3 py-1 bg-black/50 hover:bg-black/70 text-white rounded-full text-sm flex items-center gap-1"
                        >
                            <ion-icon name="camera-outline"></ion-icon>
                            {channel.banner ? 'Change' : 'Add'} Banner
                        </button>
                        <input
                            type="file"
                            ref={bannerInputRef}
                            onChange={handleBannerChange}
                            accept="image/*"
                            className="hidden"
                        />

                        {/* Avatar */}
                        <div className="absolute -bottom-16 left-6">
                            <div className="relative">
                                <img
                                    src={channel.avatar}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full border-4 border-neutral-50 dark:border-neutral-900 bg-white dark:bg-neutral-700"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current.click()}
                                    className="absolute bottom-2 right-2 p-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-full flex"
                                >
                                    <ion-icon name="camera-outline" className="text-lg"></ion-icon>
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleAvatarChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 px-6 pb-6">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => bannerInputRef.current.click()}
                                className="text-sm text-sky-600 dark:text-sky-400 hover:underline md:hidden"
                            >
                                {channel.banner ? 'Change Banner' : 'Add Banner'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Basic Info Section */}
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                                Display Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={channel.name}
                                onChange={(e) => setChannel(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg outline-none dark:bg-neutral-800 dark:text-white"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="handle" className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                                Handle
                            </label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 py-2 border border-r-0 border-neutral-300 dark:border-neutral-600 rounded-l-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                                    @
                                </span>
                                <input
                                    type="text"
                                    id="handle"
                                    value={channel.handle.replace('@', '')}
                                    onChange={(e) => setChannel(prev => ({ ...prev, handle: `@${e.target.value}` }))}
                                    className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-r-lg outline-none dark:bg-neutral-800 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                                Bio
                            </label>
                            <textarea
                                id="bio"
                                rows="3"
                                value={channel.bio}
                                onChange={(e) => setChannel(prev => ({ ...prev, bio: e.target.value }))}
                                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg outline-none dark:bg-neutral-800 dark:text-white"
                                maxLength="200"
                            />
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                {channel.bio.length}/200 characters
                            </p>
                        </div>
                    </div>
                </div>

                {/* Links Section */}
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">Links</h2>

                    <div className="space-y-4">
                        {channel.links.map(link => (
                            <div key={link.id} className="flex items-center gap-2">
                                <select
                                    value={link.platform}
                                    onChange={(e) => {
                                        const updatedLinks = channel.links.map(l =>
                                            l.id === link.id ? { ...l, platform: e.target.value } : l
                                        );
                                        setChannel(prev => ({ ...prev, links: updatedLinks }));
                                    }}
                                    className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg outline-none dark:bg-neutral-800 dark:text-white"
                                >
                                    {platformOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                <input
                                    type="url"
                                    value={link.url}
                                    onChange={(e) => {
                                        const updatedLinks = channel.links.map(l =>
                                            l.id === link.id ? { ...l, url: e.target.value } : l
                                        );
                                        setChannel(prev => ({ ...prev, links: updatedLinks }));
                                    }}
                                    placeholder={`https://${link.platform}.com/username`}
                                    className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg outline-none dark:bg-neutral-800 dark:text-white"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveLink(link.id)}
                                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg flex"
                                >
                                    <ion-icon name="trash-outline"></ion-icon>
                                </button>
                            </div>
                        ))}

                        <div className="flex items-center gap-2">
                            <select
                                value={newLink.platform}
                                onChange={(e) => setNewLink(prev => ({ ...prev, platform: e.target.value }))}
                                className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg outline-none dark:bg-neutral-800 dark:text-white"
                            >
                                {platformOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <input
                                type="url"
                                value={newLink.url}
                                onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                                placeholder={`https://${newLink.platform}.com/username`}
                                className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg outline-none dark:bg-neutral-800 dark:text-white"
                            />
                            <button
                                type="button"
                                onClick={handleAddLink}
                                className="p-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded-lg flex"
                            >
                                <ion-icon name="add-outline"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Social Media Section */}
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">Social Media</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="twitter" className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                                Twitter Username
                            </label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 py-2 border border-r-0 border-neutral-300 dark:border-neutral-600 rounded-l-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                                    @
                                </span>
                                <input
                                    type="text"
                                    id="twitter"
                                    value={channel.socialMedia.twitter}
                                    onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-r-lg outline-none dark:bg-neutral-800 dark:text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="github" className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                                GitHub Username
                            </label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 py-2 border border-r-0 border-neutral-300 dark:border-neutral-600 rounded-l-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                                    @
                                </span>
                                <input
                                    type="text"
                                    id="github"
                                    value={channel.socialMedia.github}
                                    onChange={(e) => handleSocialMediaChange('github', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-r-lg outline-none dark:bg-neutral-800 dark:text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="linkedin" className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                                LinkedIn Username
                            </label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 py-2 border border-r-0 border-neutral-300 dark:border-neutral-600 rounded-l-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                                    in/
                                </span>
                                <input
                                    type="text"
                                    id="linkedin"
                                    value={channel.socialMedia.linkedin}
                                    onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-r-lg outline-none dark:bg-neutral-800 dark:text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="youtube" className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                                YouTube Channel ID
                            </label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 py-2 border border-r-0 border-neutral-300 dark:border-neutral-600 rounded-l-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                                    youtube.com/
                                </span>
                                <input
                                    type="text"
                                    id="youtube"
                                    value={channel.socialMedia.youtube}
                                    onChange={(e) => handleSocialMediaChange('youtube', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-r-lg outline-none dark:bg-neutral-800 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end gap-3">
                    {saveSuccess && (
                        <span className="flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg text-sm">
                            <span className="mr-2 flex"> <ion-icon name="checkmark-circle-outline"></ion-icon></span>
                            Channel updated successfully
                        </span>
                    )}
                    <Button
                        type="submit"
                        disabled={isSaving}
                        className={`px-6 py-2 rounded-lg transition-colors ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                        title={isSaving ? (
                            <span className="flex items-center justify-center">
                                <span className="animate-spin mr-2"><ion-icon name="refresh-outline"></ion-icon></span>
                                Saving...
                            </span>
                        ) : 'Save Changes'}
                    />
                </div>
            </form>
        </div>
    );
};

export default ChannelSettingsPage;