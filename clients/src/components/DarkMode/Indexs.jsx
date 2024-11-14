import React, { useState, useEffect } from 'react'
import { darkBtn } from '../../constants';

function DarkModes() {
    const [icon, setIcon] = useState("moon");
    const element = document.documentElement;
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
    );

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
            <div className="cursor-pointer group inline-block">
                {/* <h1 className="items-center group text-black dark:text-white">
                    M
                </h1> */}
                <div className="text-sky-600 h-8 w-8 border border-sky-600 leading-9 text-xl rounded-full m-1 text-center">
                    <ion-icon name={icon}></ion-icon>
                </div>
                {/* {true && ( */}
                <div>
                    <div className="absolute top-[55px] hidden group-hover:block hover:block z-[60] translate-x-[-40%]">
                        <div className="py-3 translate-x-[40%]">
                            <div
                                className="w-4 h-4 left-3 absolute mt-1 bg-white dark:bg-black rotate-45"
                            ></div>
                        </div>
                        <div className="bg-white dark:bg-black p-5 grid grid-cols-3 gap-10 rounded-xl">
                            {darkBtn.map((elm) => (
                                <button key={elm.id} className={`h-8 w-8 border border-sky-600 leading-9 text-xl rounded-full m-1 ${theme === elm.text && 'text-sky-600'} text-center`} onClick={() => {
                                    setTheme(elm.text);
                                    setIcon(elm.icon);
                                }}><ion-icon name={elm.icon}></ion-icon></button>
                            ))}
                        </div>
                    </div>
                </div>
                {/* )} */}
            </div>
        </>
    )
}

export default DarkModes