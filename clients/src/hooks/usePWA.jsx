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
            const isInstalled = 
                window.matchMedia('(display-mode: standalone)').matches ||
                window.navigator.standalone ||
                document.referrer.includes('android-app://');
            setIsAppInstalled(isInstalled);
            
            // Clear dismissed flags if app gets installed
            if (isInstalled) {
                localStorage.removeItem('pwaInstallDismissed');
            }
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
            // Only show if not installed and not recently dismissed
            const dismissed = localStorage.getItem('pwaInstallDismissed');
            const dismissedTime = localStorage.getItem('pwaInstallDismissedTime');
            
            // Show if never dismissed or dismissed more than 7 days ago
            const shouldShow = !dismissed || 
                (dismissedTime && Date.now() - parseInt(dismissedTime) > 7 * 24 * 60 * 60 * 1000);
            
            if (shouldShow && !isAppInstalled) {
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

                    // Check for immediate update
                    if (reg.waiting) {
                        const updateDismissed = localStorage.getItem('pwaUpdateDismissed');
                        const updateDismissedTime = localStorage.getItem('pwaUpdateDismissedTime');
                        
                        const shouldShow = !updateDismissed || 
                            (updateDismissedTime && Date.now() - parseInt(updateDismissedTime) > 24 * 60 * 60 * 1000);
                        
                        if (shouldShow) {
                            setShowUpdatePrompt(true);
                        }
                    }

                    reg.onupdatefound = () => {
                        const newWorker = reg.installing;
                        newWorker.onstatechange = () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                const updateDismissed = localStorage.getItem('pwaUpdateDismissed');
                                const updateDismissedTime = localStorage.getItem('pwaUpdateDismissedTime');
                                
                                const shouldShow = !updateDismissed || 
                                    (updateDismissedTime && Date.now() - parseInt(updateDismissedTime) > 24 * 60 * 60 * 1000);
                                
                                if (shouldShow) {
                                    setShowUpdatePrompt(true);
                                }
                            }
                        };
                    };
                } catch (error) {
                    console.error('SW registration failed:', error);
                }
            };

            if (import.meta.env.PROD) {
                registerSW();
                
                // Listen for controller change (update completed)
                navigator.serviceWorker.addEventListener('controllerchange', () => {
                    window.location.reload();
                });
            }
        }
    }, []);

    const handleInstall = async () => {
        setShowInstallPrompt(false);
        if (deferredPrompt) {
            try {
                const { outcome } = await deferredPrompt.prompt();
                if (outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                    // Clear dismissed flag if installed
                    localStorage.removeItem('pwaInstallDismissed');
                } else {
                    console.log('User dismissed the install prompt');
                    localStorage.setItem('pwaInstallDismissed', 'true');
                    localStorage.setItem('pwaInstallDismissedTime', Date.now().toString());
                }
            } catch (err) {
                console.error('Install prompt error:', err);
            } finally {
                setDeferredPrompt(null);
            }
        }
    };

    const dismissInstall = () => {
        setShowInstallPrompt(false);
        localStorage.setItem('pwaInstallDismissed', 'true');
        localStorage.setItem('pwaInstallDismissedTime', Date.now().toString());
    };

    const handleUpdate = () => {
        setShowUpdatePrompt(false);
        if (registration && registration.waiting) {
            // Send skip waiting message
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            // No need to reload here - controllerchange event will handle it
        }
    };

    const dismissUpdate = () => {
        setShowUpdatePrompt(false);
        localStorage.setItem('pwaUpdateDismissed', 'true');
        localStorage.setItem('pwaUpdateDismissedTime', Date.now().toString());
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