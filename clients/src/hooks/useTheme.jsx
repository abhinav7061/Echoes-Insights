// utils/themeUtils.js
import { useEffect, useState } from 'react';

const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "system";
    });

    useEffect(() => {
        const element = document.documentElement;
        switch (theme) {
            case 'dark':
                element.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                break;
            case 'light':
                element.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                break;
            default:
                localStorage.removeItem('theme');
                const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                element.classList.toggle('dark', isDark);
                break;
        }
    }, [theme]);

    return [theme, setTheme];
};

export default useTheme;