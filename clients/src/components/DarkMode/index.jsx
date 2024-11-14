import React, { useState, useEffect } from 'react'
import { darkBtn } from '../../constants';

function DarkMode() {
    const element = document.documentElement;
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
    );

    const [icon, setIcon] = useState(() => {
        switch (theme) {
            case "dark": return "moon";
            case "light": return "sunny";
            default: return "desktop-outline";
        }
    });

    function onWindowMatch() {
        if (localStorage.theme === 'dark' || (!("theme" in localStorage) && darkQuery.matches)) {
            element.classList.add('dark');
        } else {
            element.classList.remove('dark');
        }
    }
    onWindowMatch();

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
                onWindowMatch();
                break;
        }
    }, [theme]);

    darkQuery.addEventListener('change', (event) => {
        if (!("theme" in localStorage)) {
            if (event.matches) {
                element.classList.add('dark');
            } else {
                element.classList.remove('dark');
            }
        }
    });
    return (
        <>
            <div className="cursor-pointer group inline-block relative w-full px-4 py-2">
                <div className="h-5 w-full gap-1 flex items-center justify-start">
                    <ion-icon name={icon}></ion-icon> Appearances
                </div>
                <div className="absolute top-3 hidden z-50 group-hover:block translate-x-[-30%] left-12">
                    <div className="py-3 translate-x-[30%]">
                        <div
                            className="w-4 h-4 left-3.5 absolute  -mt-1 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-gray-400 dark:border-b-gray-900"
                        ></div>
                    </div>
                    <div className="bg-white/60 shadow-lime-100 shadow-sm dark:bg-gray-900/90 backdrop-blur-sm py-3 rounded-xl flex flex-col">
                        {darkBtn.map((elm, index) => (
                            <div
                                onClick={() => {
                                    setTheme(elm.text);
                                    setIcon(elm.icon);
                                }}
                                className={`${theme === elm.text ? 'text-sky-600' : 'text-black dark:text-white hover:bg-gray-600'} px-3 sm:px-5 flex items-center gap-1 flex-row ${index !== darkBtn.length - 1 ? "mb-2" : "mb-0"}`}
                                key={index}
                            >
                                <div className={`flex items-center justify-center rounded-full text-center`}>
                                    <ion-icon name={elm.icon}></ion-icon>
                                </div>
                                <h1 className='text-base lg:text-lg'>{elm.text}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DarkMode