import { useEffect, useState } from 'react';

const usePWA = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);
    const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
    const [isAppInstalled, setIsAppInstalled] = useState(false);
    const [registration, setRegistration] = useState(null);

    // Check if app is installed
    useEffect(() => {
        const checkInstalled = () => {
            const isInstalled = window.matchMedia('(display-mode: standalone)').matches ||
                window.navigator.standalone ||
                document.referrer.includes('android-app://');
            setIsAppInstalled(isInstalled);
        };

        checkInstalled();
        window.addEventListener('appinstalled', checkInstalled);

        return () => {
            window.removeEventListener('appinstalled', checkInstalled);
        };
    }, []);

    // Handle beforeinstallprompt event
    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            // Check if user previously dismissed the prompt
            const dismissed = localStorage.getItem('pwaInstallDismissed');
            if (!dismissed && !isAppInstalled) {
                setDeferredPrompt(e);
                setShowInstallPrompt(true);
            }
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, [isAppInstalled]);

    // Handle service worker update
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            const registerSW = async () => {
                try {
                    const reg = await navigator.serviceWorker.register('/sw.js');
                    setRegistration(reg);

                    reg.addEventListener('updatefound', () => {
                        const newWorker = reg.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed') {
                                const updateDismissed = localStorage.getItem('pwaUpdateDismissed');
                                if (!updateDismissed && navigator.serviceWorker.controller) {
                                    setShowUpdatePrompt(true);
                                }
                            }
                        });
                    });
                } catch (error) {
                    console.error('SW registration failed:', error);
                }
            };

            if (import.meta.env.PROD) {
                registerSW();
            }
        }
    }, []);

    const handleInstall = async () => {
        setShowInstallPrompt(false);
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
                localStorage.setItem('pwaInstallDismissed', 'true');
            }
            setDeferredPrompt(null);
        }
    };

    const dismissInstall = () => {
        setShowInstallPrompt(false);
        localStorage.setItem('pwaInstallDismissed', 'true');
    };

    const handleUpdate = () => {
        setShowUpdatePrompt(false);
        if (registration && registration.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
        }
    };

    const dismissUpdate = () => {
        setShowUpdatePrompt(false);
        localStorage.setItem('pwaUpdateDismissed', 'true');
    };

    return {
        showInstallPrompt,
        showUpdatePrompt,
        handleInstall,
        dismissInstall,
        handleUpdate,
        dismissUpdate,
        isAppInstalled
    };
};

export default usePWA;