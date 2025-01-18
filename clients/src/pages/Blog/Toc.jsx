import React, { useEffect, useState, useRef } from 'react'
import useOutsideClick from '../../hooks/useOutsideClick';

const Toc = ({ content, showTOC, setShowTOC, className = '', needToShowTOC, setNeedToShowTOC }) => {
    const tocRef = useRef();
    const [toc, setToc] = useState([])
    const [currentId, setCurrentId] = useState(null);
    const getTOC = () => {
        const toc = []
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        let baseLevel = 7; // No heading level is 7; this will be reset by the first heading

        doc.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
            const level = parseInt(heading.tagName.substring(1));
            const text = heading.textContent.trim();
            const id = heading.id;

            // Determine the base level (e.g., if the first heading is h3, baseLevel will be 3)
            if (level < baseLevel) {
                baseLevel = level;
            }

            toc.push({ level, text, id, baseLevel });
        });

        setToc(toc);
    }

    useOutsideClick(tocRef, () => setShowTOC(false))

    const handleScroll = () => {
        const scrollPosition = window.scrollY + 80;
        let currentId = null;

        toc.forEach(item => {
            const element = document.getElementById(item.id);
            if (element && element.offsetTop <= scrollPosition) {
                currentId = item.id;
            }
        });

        setCurrentId(currentId);
    };

    useEffect(() => {
        getTOC();
    }, [])

    useEffect(() => {
        if (toc.length > 1) {
            window.addEventListener('scroll', handleScroll);
            handleScroll();
            setNeedToShowTOC(true);
        } else {
            setNeedToShowTOC(false);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [toc]);

    return (
        <>
            {needToShowTOC && <div className={`sticky top-[76px] max-h-[calc(100vh-80px)] z-[100] ${className}`}>
                <div className={`dark:text-neutral-100 absolute ${showTOC ? 'flex justify-center w-[calc(100vw-50px)] md:w-64' : 'w-0'} transition-[width] duration-500 overflow-hidden md:relative md:w-full`}>
                    <div ref={tocRef} className={`border border-neutral-300 dark:border-neutral-700 backdrop-blur-xl md:backdrop-blur-0 md:bg-transparent dark:md:bg-transparent md:border-0 bg-neutral-200/80 dark:bg-neutral-800/80 max-w-xl w-[80vw] md:w-64 rounded-2xl px-5 py-3 md:p-0 md:pr-3 overflow-hidden h-full`}>
                        <span className='flex justify-end items-center px-2 h-12 md:h-4'><button
                            className='p-1 md:hidden bg-neutral-400 dark:bg-neutral-800 text-neutral-100 rounded-md flex text-xl'
                            onClick={() => setShowTOC(false)}
                            title="Hide TOC"
                        >
                            <ion-icon name="close"></ion-icon>
                        </button></span>
                        <div className='max-h-[calc(100vh-130px)] p-5 pt-1 overflow-x-hidden overflow-y-auto'>
                            <h1 className='text-2xl underline mb-4'>Table of Contents</h1>
                            <ul className='space-y-1'>
                                {toc.map((item, index) => {
                                    const indentLevel = item.level - item.baseLevel;
                                    return (
                                        <li
                                            key={index}
                                            className={`ml-${indentLevel * 4} flex transition-all duration-300 ${currentId === item.id ? 'text-sky-600 dark:text-golden' : 'hover:text-sky-800 dark:hover:text-yellow-200'}`}
                                            style={{ marginLeft: `${indentLevel * 1}rem` }}
                                            onClick={() => {
                                                setCurrentId(item.id);
                                                setShowTOC(false);
                                            }}
                                        >
                                            <strong className='mr-2'>-</strong> <a href={`#${item.id}`} className='text-sm hover:underline'>{item.text}</a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Toc