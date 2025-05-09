// components/DarkMode.jsx
import React, { useState } from 'react';
import { darkBtn, getThemeIcon } from '../../lib/themeUtils';
import useTheme from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

const DarkMode = ({ position = 'left', themeOptionClass, triggerBtnClass }) => {
    const [theme, setTheme] = useTheme();
    const [icon, setIcon] = useState(() => getThemeIcon(theme));

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        setIcon(getThemeIcon(newTheme));
    };

    return (
        <div className="relative group">
            <button
                className={cn("flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-lg transition-colors", triggerBtnClass)}
                aria-label="Appearance settings"
            >
                <ion-icon name={icon} className="text-lg"></ion-icon>
                <span>Appearance</span>
            </button>

            <div className={cn("absolute top-[42%] left-0 mt-1 hidden group-hover:flex animate-fade-in opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-full -translate-y-1/2",
                position === 'right' && 'translate-x-full ml-4 group-hover:flex-row-reverse',
            )}
            >
                <div className={cn("bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2 z-10",
                    position === 'left' ? 'shadow-[-2px_0px_3px_rgba(0,0,0,0.1)]' : 'shadow-[2px_0px_3px_rgba(0,0,0,0.1)]'
                )}>
                    {darkBtn.map((elm) => (
                        <button
                            onClick={() => handleThemeChange(elm.text)}
                            className={cn("flex items-center gap-2 w-full px-3 py-1.5 rounded-md transition-colors",
                                theme === elm.text ? 'bg-neutral-200 text-blue-600 dark:bg-neutral-700 dark:text-golden text-blue' : 'hover:bg-neutral-50 dark:hover:bg-neutral-600',
                                themeOptionClass
                            )}
                            key={elm.text}
                        >
                            <ion-icon name={elm.icon}></ion-icon>
                            <span className="capitalize">{elm.text}</span>
                        </button>
                    ))}
                </div>
                <div className={cn("w-3 h-3 mt-[50%] -ml-2 rotate-45 bg-neutral-100 dark:bg-neutral-800 shadow-[1px_1px_2px_rgba(0,0,0,0.1)] -translate-y-1/2",
                    position === 'right' && 'translate-x-1/2',
                )}></div>
            </div>
        </div>
    );
};

export default DarkMode;