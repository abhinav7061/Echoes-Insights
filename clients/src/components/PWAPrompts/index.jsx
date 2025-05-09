import React, { useEffect } from 'react';
import usePWA from '../../hooks/usePWA';
import CancelBtn from '../Button/cancelBtn';
import AcceptBtn from '../Button/acceptBtn';

const PWAPrompts = () => {
    const {
        showInstallPrompt,
        showUpdatePrompt,
        handleInstall,
        dismissInstall,
        handleUpdate,
        dismissUpdate
    } = usePWA();

    // Prevent body scroll when prompt is shown
    useEffect(() => {
        if (showInstallPrompt || showUpdatePrompt) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [showInstallPrompt, showUpdatePrompt]);

    // Add escape key listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (showInstallPrompt) dismissInstall();
                if (showUpdatePrompt) dismissUpdate();
            }
        };

        if (showInstallPrompt || showUpdatePrompt) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [showInstallPrompt, showUpdatePrompt, dismissInstall, dismissUpdate]);

    if (!showInstallPrompt && !showUpdatePrompt) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={showInstallPrompt ? dismissInstall : dismissUpdate}
            />

            {/* Install Prompt */}
            {showInstallPrompt && (
                <div
                    className="relative bg-white dark:bg-neutral-800 p-6 rounded-lg max-w-md w-[calc(100%-2rem)] mx-4 shadow-xl"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="install-heading"
                >
                    <h3 id="install-heading" className="text-lg font-semibold">
                        Install App
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-2 mb-6">
                        Add this app to your home screen for a better experience
                    </p>
                    <div className="flex justify-end gap-3">
                        <CancelBtn title='Not Now' onClick={dismissInstall} aria-label="Dismiss install prompt" />
                        <AcceptBtn title='Install' onClick={handleInstall} aria-label="Install application" />
                    </div>
                </div>
            )}

            {/* Update Prompt */}
            {showUpdatePrompt && (
                <div
                    className="relative bg-white dark:bg-neutral-800 p-6 rounded-lg max-w-md w-[calc(100%-2rem)] mx-4 shadow-xl"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="update-heading"
                >
                    <h3 id="update-heading" className="text-lg font-semibold">
                        Update Available
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-2 mb-6">
                        A new version is available. Update now for the latest features and improvements.
                    </p>
                    <div className="flex justify-end gap-3">
                        <CancelBtn title='Later' onClick={dismissUpdate} aria-label="Dismiss update prompt" />
                        <AcceptBtn title='Update Now' onClick={handleUpdate} aria-label="Update application" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PWAPrompts;
