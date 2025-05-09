import React from 'react'

const SystemSettingsTab = () => {
    return (
        <div className="space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">General Settings</h2>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">Maintenance Mode</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                Temporarily take the site offline for maintenance
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-neutral-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">User Registration</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                Allow new users to register accounts
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-neutral-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">Content Moderation</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                Require approval for new content submissions
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-neutral-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Email Configuration</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">SMTP Host</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-white"
                            placeholder="smtp.example.com"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">SMTP Username</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-white"
                                placeholder="username"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">SMTP Password</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-white"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                            Save Email Settings
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6 border border-red-100 dark:border-red-900/50">
                <h2 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-400">Danger Zone</h2>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">Clear Cache</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                Clear all system caches
                            </p>
                        </div>
                        <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200 rounded-lg">
                            Clear Now
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">Reset System</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                Reset all settings to default
                            </p>
                        </div>
                        <button className="px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/40 text-red-800 dark:text-red-200 rounded-lg">
                            Reset Settings
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">Delete All Data</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                Permanently delete all user data and content
                            </p>
                        </div>
                        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                            Delete All Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SystemSettingsTab