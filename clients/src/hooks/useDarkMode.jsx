import { useEffect, useState } from 'react';

const useDarkMode = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkDarkMode = () => {
            const isDark = document.documentElement.classList.contains('dark') ||
                (localStorage.theme === 'dark') ||
                (!('theme' in localStorage) &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches);
            setIsDark(isDark);
        };

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    checkDarkMode();
                }
            });
        });

        const handleStorageChange = () => checkDarkMode();

        checkDarkMode();

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        window.addEventListener('storage', handleStorageChange);
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkDarkMode);

        return () => {
            observer.disconnect();
            window.removeEventListener('storage', handleStorageChange);
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', checkDarkMode);
        };
    }, []);

    return isDark;
};

export default useDarkMode;