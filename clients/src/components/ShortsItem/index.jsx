import React from 'react'
import { formatDistanceStrict } from "date-fns";

const ShortItem = ({ short, loaderRef, index, totalItems, isShowComments, setIsShowComments }) => (
    <div ref={index === totalItems - 3 ? loaderRef : null} className="relative snap-start h-full flex gap-5 flex-shrink-0 w-full">
        <div className="absolute h-full sm:relative left-3 flex flex-col gap-3 justify-center z-10">
            <button
                className="bg-neutral-100/30 sm:bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/40 sm:dark:bg-neutral-800 dark:hover:bg-neutral-700 flex p-3 text-2xl rounded-full transition-all duration-500"
                onClick={() => setIsShowComments(!isShowComments)}
                aria-label={isShowComments ? "Hide comments" : "Show comments"}
            >
                <ion-icon aria-hidden="true" name="chatbubble-outline"></ion-icon>
            </button>
            <button
                className="bg-neutral-100/30 sm:bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/40 sm:dark:bg-neutral-800 dark:hover:bg-neutral-700 flex p-3 text-2xl  rounded-full transition-all duration-500"
            >
                <ion-icon name="thumbs-up-outline"></ion-icon>
            </button>
            <button
                className="bg-neutral-100/30 sm:bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/40 sm:dark:bg-neutral-800 dark:hover:bg-neutral-700 flex p-3 text-2xl  rounded-full transition-all duration-500"
            >
                <ion-icon name="thumbs-down-outline"></ion-icon>
            </button>
            <button
                className="bg-neutral-100/30 sm:bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/40 sm:dark:bg-neutral-800 dark:hover:bg-neutral-700 flex p-3 text-2xl  rounded-full transition-all duration-500"
            >
                <ion-icon name="bookmark-outline"></ion-icon>
            </button>
        </div>
        <div className={`short xs:rounded-2xl w-full max-w-[500px] overflow-hidden xs:border dark:border-neutral-700 flex-grow relative flex flex-col justify-end`}>
            <img loading="lazy" src={short.cover.url} alt="" className='absolute inset-0 h-full w-full object-cover' />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-200/80 to-white/40 dark:from-black dark:to-black/40"></div>
            <h2 className='m-6 mb-0 ps-12 sm:ps-0 z-[1] line-clamp-2 overflow-hidden font-semibold' title={short.title}>{short.title}</h2>
            <p className="ms-6 my-4 pe-6 ps-12 sm:ps-0 text-justify font-sans overflow-auto z-[1]">{short.summary}</p>
            <div className='w-full p-3 pt-0 flex gap-3 items-center z-[1]'>
                <img src={short.author?.avatar?.url || "/default-profile.png"} className='rounded-full h-10 w-10 object-cover' />
                <div className='flex flex-col h-full justify-end flex-grow'>
                    <p className='text-sm font-semibold'>{short.author.name}</p>
                    <p className='text-xs text-neutral-500 dark:text-neutral-400'>{formatDistanceStrict(new Date(short.createdAt), new Date(), { addSuffix: true })}</p>
                </div>
                <div className='flex gap-2'>
                    <button className='bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/40 dark:bg-neutral-800 dark:hover:bg-neutral-700 px-4 py-1 font-sm font-semibold rounded-full h-min'>
                        Follow
                    </button>
                </div>
            </div>
        </div>
    </div>
);


export default ShortItem;