import React from 'react';
import usePWA from '../../hooks/usePWA';

const PWAPrompts = () => {
    const {
        showInstallPrompt,
        showUpdatePrompt,
        handleInstall,
        dismissInstall,
        handleUpdate,
        dismissUpdate
    } = usePWA();


    if (!showInstallPrompt && !showUpdatePrompt) return null;

    return (
        <>
            {showInstallPrompt && (
                <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-[9999]">
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg max-w-md w-11/12">
                        <h3 className="text-lg font-semibold">Install App</h3>
                        <p className="text-neutral-400 mt-2 mb-6">
                            Add this app to your home screen for a better experience
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={dismissInstall}
                                className="px-4 py-1.5 rounded-full border border-red-500 text-red-500 text-sm hover:bg-red-500 hover:text-white hover:shadow-[0_0_25px_2px_rgba(239,68,68,0.7)] transition-all duration-500 ease-in-out"
                            >
                                Not Now
                            </button>
                            <button
                                onClick={handleInstall}
                                className="px-4 py-1.5 rounded-full border dark:border-neutral-200 border-neutral-800 dark:text-neutral-200 text-neutral-800 text-sm dark:hover:bg-neutral-200 hover:bg-neutral-800 dark:hover:text-neutral-800 hover:text-neutral-200 dark:hover:shadow-[0_0_25px_2px_rgba(255,255,255,0.7)] hover:shadow-[0_0_25px_2px_rgba(0,0,0,0.7)] transition-all duration-500 ease-in-out"
                            >
                                Install
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Prompt */}
            {showUpdatePrompt && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg max-w-md w-11/12 shadow-lg">
                        <h3 className="text-lg font-semibold">Update Available</h3>
                        <p className="text-gray-600 mt-2 mb-6">
                            A new version of the app is available. Update for the best experience.
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={dismissUpdate}
                                className="px-4 py-1.5 rounded-full border border-red-500 text-red-500 text-sm hover:bg-red-500 hover:text-white hover:shadow-[0_0_25px_2px_rgba(239,68,68,0.7)] transition-all duration-500 ease-in-out"
                            >
                                Later
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-1.5 rounded-full border dark:border-neutral-200 border-neutral-800 dark:text-neutral-200 text-neutral-800 text-sm dark:hover:bg-neutral-200 hover:bg-neutral-800 dark:hover:text-neutral-800 hover:text-neutral-200 dark:hover:shadow-[0_0_25px_2px_rgba(255,255,255,0.7)] hover:shadow-[0_0_25px_2px_rgba(0,0,0,0.7)] transition-all duration-500 ease-in-out"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PWAPrompts;
