import React, { useState, useEffect } from 'react';
import { darkBtn } from '../../constants';

function DarkMode() {
    const element = document.documentElement;
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");
    const [icon, setIcon] = useState(() => {
        switch (theme) {
            case "dark": return "moon";
            case "light": return "sunny";
            default: return "desktop-outline";
        }
    });

    useEffect(() => {
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
                if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                    element.classList.add('dark');
                } else {
                    element.classList.remove('dark');
                }
                break;
        }
    }, [theme]);

    return (
        <div className="cursor-pointer group inline-block relative w-full px-4 py-2">
            <div className="h-5 w-full gap-1 flex items-center justify-start">
                <ion-icon name={icon}></ion-icon> Appearances
            </div>
            <div className="absolute items-center hidden z-50 group-hover:flex left-4 translate-y-[-58%] translate-x-[-100%]">
                <div className="bg-neutral-100 dark:bg-neutral-800 border dark:border-neutral-700 backdrop-blur-sm py-3 rounded-md flex flex-col z-10">
                    {darkBtn.map((elm, index) => (
                        <div
                            onClick={() => {
                                setTheme(elm.text);
                                setIcon(elm.icon);
                            }}
                            className={`${theme === elm.text ? 'text-sky-600' : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700'} text-sm py-1 px-5 flex items-center gap-1 flex-row ${index !== darkBtn.length - 1 ? "mb-2" : "mb-0"}`}
                            key={index}
                        >
                            <ion-icon name={elm.icon}></ion-icon> {elm.text}
                        </div>
                    ))}
                </div>
                <div className="py-3 z-20 -translate-x-0.5">
                    <div className="w-6 h-6 left-3.5 border-b-[12px] border-b-transparent border-t-[12px] border-t-transparent border-l-[8px] border-l-neutral-100 dark:border-l-neutral-800"></div>
                </div>
            </div>
        </div>
    );
}

export default DarkMode;
