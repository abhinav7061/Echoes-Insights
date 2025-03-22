import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { cn } from '../../lib/utils';
import CommentSection from '../../components/CommentSection';
import useOutsideClick from '../../hooks/useOutsideClick';
import styles from './index.module.css'
import useWindowSize from '../../hooks/useWindowSize';
const shortsData = [
    { id: 1, text: "With AI advancements accelerating, millions of jobs are at risk of automation, but new opportunities are emerging too. A recent report suggests that while AI could replace 300 million jobs worldwide, it will also create demand for AI-related skills in fields like data science, cybersecurity, and automation. Companies are investing heavily in AI upskilling programs to bridge the gap. However, experts warn that unskilled workers may struggle to adapt, leading to rising inequality. Governments are considering universal basic income (UBI) and reskilling initiatives to counter AI-driven job displacement. The question remains—will AI create more jobs than it destroys, or are we heading toward mass unemployment?", image: "https://cdn.pixabay.com/photo/2016/01/02/02/03/orange-1117645_960_720.jpg" },
    { id: 2, text: "Rumors are heating up about Apple’s entry into the foldable phone market. Reports suggest Apple is testing prototypes, with a possible 2026 launch. Unlike Samsung’s Galaxy Z Fold and Flip, Apple may focus on durability and seamless design, ensuring no visible creases in its foldable screen. The company is reportedly collaborating with display manufacturers to perfect the technology. While Apple remains silent, industry analysts believe the device could revolutionize foldable tech, much like the first iPhone did for touchscreens. However, high costs and durability concerns could be a hurdle. Will Apple redefine foldable phones, or is it arriving too late to the party?", image: "https://cdn.pixabay.com/photo/2016/01/02/02/03/orange-1117645_960_720.jpg" },
    { id: 3, text: "After the success of Chandrayaan-3, India is setting its sights even higher with Chandrayaan-4—a potential stepping stone for human space exploration. ISRO has hinted at a 2028 launch window, with plans to test advanced lunar landers and rovers capable of sustaining human life. The mission could pave the way for Gaganyaan, India’s first human spaceflight program, which aims to send astronauts to space by 2025. Experts believe Chandrayaan-4 will focus on extracting resources like lunar water, essential for long-term space missions. With global interest in lunar colonization growing, India's ambitions align with NASA’s Artemis program and China’s moon base plans. Could India be a major player in future space exploration?", image: "https://cdn.pixabay.com/photo/2016/01/02/02/03/orange-1117645_960_720.jpg" }
];

const Shorts = () => {
    const containerRef = useRef(null);
    const commentRef = useRef(null);
    const navigate = useNavigate();
    const [isShowComments, setIsShowComments] = useState(false);
    const [index, setIndex] = useState(0);
    const { windowInWidth } = useWindowSize();
    useOutsideClick(commentRef, () => {
        if (windowInWidth < 1200) setIsShowComments(false)
    })
    const handleScroll = (direction) => {
        if (containerRef.current) {
            const scrollAmount = containerRef.current.clientHeight;
            if (direction === 'up') {
                containerRef.current.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
                setIndex(prev => Math.max(prev - 1, 0));
            } else if (direction === 'down') {
                containerRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
                setIndex(prev => Math.min(prev + 1, shortsData.length - 1));
            }
        }
    };

    useEffect(() => {
        document.body.style.overflow = (isShowComments || windowInWidth < 480) ? 'hidden' : 'auto'
    }, [isShowComments, windowInWidth])

    useEffect(() => {
        const handleScrollEvent = () => {
            if (!containerRef.current) return;

            const scrollTop = containerRef.current.scrollTop;
            const itemHeight = containerRef.current.clientHeight;
            const newIndex = Math.round(scrollTop / itemHeight);

            setIndex(newIndex);
        };

        containerRef.current?.addEventListener('scroll', handleScrollEvent);

        return () => {
            containerRef.current?.removeEventListener('scroll', handleScrollEvent);
        };
    }, []);

    return (
        <div className={`fixed top-0 bottom-0 right-0 left-0 xs:relative z-[1001] xs:z-auto bg-white dark:bg-neutral-950 h-screen xs:h-[calc(100vh-90px)] `}>
            <div
                role='button'
                className="absolute top-3 left-3 xs:bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/40 xs:dark:bg-neutral-800 dark:hover:bg-neutral-700 flex p-3 text-2xl  rounded-full transition-all duration-500 z-10 xs:hidden"
                onClick={() => navigate(-1)}
            >
                <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className='relative flex xs:gap-4 items-center justify-center h-full ml-auto mr-auto w-full'>
                <div
                    ref={containerRef}
                    className="overflow-y-auto snap-y snap-mandatory scrollbar-none w-full max-w-[500px] z-0 flex flex-col h-full gap-5"
                >
                    {shortsData.map((short) => (
                        <div key={short.id} className="relative snap-start h-full flex gap-5 flex-shrink-0 w-full">
                            <div className="absolute h-full sm:relative left-3 flex flex-col gap-3 justify-center z-10">
                                <button
                                    className="xs:bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/40 sm:dark:bg-neutral-800 dark:hover:bg-neutral-700 flex p-3 text-2xl rounded-full transition-all duration-500"
                                    onClick={() => setIsShowComments(!isShowComments)}
                                >
                                    <ion-icon name="chatbubble-outline"></ion-icon>
                                </button>
                                <button
                                    className="xs:bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/40 sm:dark:bg-neutral-800 dark:hover:bg-neutral-700 flex p-3 text-2xl  rounded-full transition-all duration-500"
                                >
                                    <ion-icon name="thumbs-up-outline"></ion-icon>
                                </button>
                                <button
                                    className="xs:bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/40 sm:dark:bg-neutral-800 dark:hover:bg-neutral-700 flex p-3 text-2xl  rounded-full transition-all duration-500"
                                >
                                    <ion-icon name="thumbs-down-outline"></ion-icon>
                                </button>
                                <button
                                    className="xs:bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/40 sm:dark:bg-neutral-800 dark:hover:bg-neutral-700 flex p-3 text-2xl  rounded-full transition-all duration-500"
                                >
                                    <ion-icon name="bookmark-outline"></ion-icon>
                                </button>
                            </div>
                            <div className='short xs:rounded-lg w-full max-w-[500px] overflow-hidden xs:border dark:border-neutral-700 flex-grow relative flex flex-col justify-end bg-[url(https://cdn.pixabay.com/photo/2016/01/02/02/03/orange-1117645_960_720.jpg)] bg-cover bg-center bg-no-repeat'>
                                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                                <p className="p-5 ps-16 sm:ps-3 text-justify overflow-auto z-[1]">{short.text}</p>
                                <div className='w-full p-3 pt-0 flex gap-3 items-center z-[1]'>
                                    <img src='https://cdn.pixabay.com/photo/2016/01/02/02/03/orange-1117645_960_720.jpg' className='rounded-full h-10 w-10 object-cover' />
                                    <div className='flex flex-col h-full justify-end flex-grow'>
                                        <p className='text-sm font-semibold'>John Doe</p>
                                        <p className='text-xs text-neutral-500 dark:text-neutral-400'>2 hours ago</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <button className='bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/
                                        40 dark:bg-neutral-800 dark:hover:bg-neutral-700 px-4 py-1 font-sm font-semibold rounded-full h-min'>
                                            Follow
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div ref={commentRef} className={`w-0 h-0 z-[1000] ${isShowComments ? 'xs:w-[600px] h-[95%] top-3 max-h-[500px] lg:w-[450px] max-w-[95vw] xs:border' : ''} absolute lg:static bg-white dark:bg-neutral-950 top-20 bottom-20 xs:transition-all xs:duration-500 lg:h-[calc(100vh-90px)] overflow-y-scroll rounded-lg dark:border-neutral-700`}>
                    {isShowComments && <div className='fixed h-screen w-screen bg-neutral-600/20 top-0 left-0 z-[-1] lg:hidden' onClick={() => setIsShowComments(false)} />}
                    <CommentSection blogId={'6770433fb69ffe51da45802b'} authorId={'6770433fb69ffe51da45802b'} className='sm:w-full' isShowComments={isShowComments} setIsShowComments={setIsShowComments} commentInputClass={styles.commentInput} preventBodyScroll={false} />
                </div>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex-col gap-3 z-10 hidden lg:flex">
                    <button
                        onClick={() => handleScroll('up')}
                        className={cn("xs:bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/40 xs:dark:bg-neutral-800 dark:hover:bg-neutral-700 flex p-3 text-2xl  rounded-full transition-all duration-500",
                            index === 0 && "opacity-0 translate-y-[calc(100%+12px)]",
                        )}
                        style={{ visibility: index === 0 ? 'hidden' : 'visible' }}
                    >
                        <ion-icon name="arrow-up-outline"></ion-icon>
                    </button>
                    <button
                        onClick={() => handleScroll('down')}
                        className={cn("xs:bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/40 xs:dark:bg-neutral-800 dark:hover:bg-neutral-700 flex p-3 text-2xl  rounded-full transition-all duration-500",
                            index === shortsData.length - 1 && "opacity-0 -translate-y-[calc(100%+12px)]",
                        )}
                        style={{ visibility: index === shortsData.length - 1 ? 'hidden' : 'visible' }}
                    >
                        <ion-icon name="arrow-down-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Shorts;