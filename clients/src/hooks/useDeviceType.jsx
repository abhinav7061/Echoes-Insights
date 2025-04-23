import { useState, useEffect } from 'react';
import useWindowSize from './useWindowSize';

export default function useDeviceType() {
    const [deviceType, setDeviceType] = useState('desktop');
    const { windowInWidth } = useWindowSize();

    useEffect(() => {
        const checkDevice = () => {
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const screenWidth = window.innerWidth;
            const userAgent = navigator.userAgent.toLowerCase();

            // Check if mobile browser is in "Desktop Site" forced mode
            const isForcedDesktopMode =
                isTouchDevice &&
                (userAgent.includes('mobile') || userAgent.includes('android')) &&
                !/mobile|android/.test(window.navigator.appVersion.toLowerCase()) || windowInWidth > 500;

            if (isForcedDesktopMode) {
                setDeviceType('desktop'); // Override to desktop UI
            } else if (isTouchDevice && screenWidth < 1024) {
                setDeviceType('mobile');
            } else {
                setDeviceType('desktop');
            }
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    return {
        isMobile: deviceType === 'mobile',
        isDesktop: deviceType === 'desktop',
    };
}