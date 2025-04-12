import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { cn } from '../../lib/utils';
import CommentSection from '../../components/CommentSection';
import useOutsideClick from '../../hooks/useOutsideClick';
import styles from './index.module.css'
import useWindowSize from '../../hooks/useWindowSize';
import useInfiniteApi from '../../hooks/useInfiniteApi';
import { formatDistanceStrict } from "date-fns";
import debounce from '../../lib/debounce';

const Shorts = () => {
    const containerRef = useRef(null);
    const commentRef = useRef(null);
    const debouncedNavigateRef = useRef(null);
    const navigate = useNavigate();
    const { shortId } = useParams();
    const [isShowComments, setIsShowComments] = useState(false);
    const [authorId, setAuthorId] = useState(null);
    const [index, setIndex] = useState(0);
    const { windowInWidth } = useWindowSize();
    useOutsideClick(commentRef, () => {
        if (windowInWidth < 1200) setIsShowComments(false)
    })
    const { data, loading, error, hasMore, loaderRef } = useInfiniteApi('/blog/shorts', shortId);

    const handleScroll = (direction) => {
        if (containerRef.current) {
            const scrollAmount = containerRef.current.clientHeight;
            if (direction === 'up') {
                containerRef.current.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
                setIndex(prev => Math.max(prev - 1, 0));
            } else if (direction === 'down') {
                containerRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
                setIndex(prev => Math.min(prev + 1, data.length));
            }
        }
    };

    useEffect(() => {
        document.body.style.overflow = ((isShowComments && windowInWidth < 1200) || windowInWidth < 480) ? 'hidden' : 'auto'
    }, [isShowComments, windowInWidth])

    useEffect(() => {
        if (!debouncedNavigateRef.current) {
            debouncedNavigateRef.current = debounce((id, authorId) => {
                navigate(`/shorts/${id}`, { replace: true });
                setAuthorId(authorId);
            }, 200);
        }
        return () => {
            debouncedNavigateRef.current?.cancel();
        };
    }, []);

    useEffect(() => {
        const newShort = data[index];
        if (newShort && newShort._id !== shortId) {
            debouncedNavigateRef.current(newShort._id, newShort.author._id);
        }
    }, [data, index, shortId]);

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
                className="absolute top-3 left-3 bg-neutral-100/30 sm:bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/40 xs:dark:bg-neutral-800 dark:hover:bg-neutral-700 flex p-3 text-2xl  rounded-full transition-all duration-500 z-10 xs:hidden"
                onClick={() => navigate(-1)}
            >
                <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className='relative flex xs:gap-4 items-center justify-center h-full ml-auto mr-auto w-full'>
                <div
                    ref={containerRef}
                    className="overflow-y-auto snap-y snap-mandatory scrollbar-none w-full max-w-[500px] z-0 flex flex-col h-full gap-5"
                >
                    {data.map((short, index) => (
                        <div key={short._id} ref={index == (data.length - 3) ? loaderRef : null} className="relative snap-start h-full flex gap-5 flex-shrink-0 w-full">
                            <div className="absolute h-full sm:relative left-3 flex flex-col gap-3 justify-center z-10">
                                <button
                                    className="bg-neutral-100/30 sm:bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/40 sm:dark:bg-neutral-800 dark:hover:bg-neutral-700 flex p-3 text-2xl rounded-full transition-all duration-500"
                                    onClick={() => setIsShowComments(!isShowComments)}
                                >
                                    <ion-icon name="chatbubble-outline"></ion-icon>
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
                                <img src={short.cover.url} alt="" className='absolute inset-0 h-full w-full object-cover' />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-200/80 to-white/40 dark:from-black dark:to-black/40"></div>
                                <h2 className='m-6 mb-0 ps-12 sm:ps-0 z-[1] line-clamp-2 overflow-hidden font-semibold' title={short.title}>{short.title}</h2>
                                <p className="ms-6 my-4 pe-6 ps-12 sm:ps-0 text-justify font-sans overflow-auto z-[1]">{short.summary}</p>
                                <div className='w-full p-3 pt-0 flex gap-3 items-center z-[1]'>
                                    <img src='https://cdn.pixabay.com/photo/2016/01/02/02/03/orange-1117645_960_720.jpg' className='rounded-full h-10 w-10 object-cover' />
                                    <div className='flex flex-col h-full justify-end flex-grow'>
                                        <p className='text-sm font-semibold'>{short.author.name}</p>
                                        <p className='text-xs text-neutral-500 dark:text-neutral-400'>{formatDistanceStrict(new Date(short.createdAt), new Date(), { addSuffix: true })}</p>
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
                    )
                    )}
                    {
                        loading ? <div className="relative snap-start h-full flex gap-5 flex-shrink-0 w-full">loading...</div> : error ? <div className="relative snap-start h-full flex gap-5 flex-shrink-0 w-full">Error: {error}</div> : null
                    }
                    {
                        !hasMore && <div className="relative snap-start h-full flex justify-end gap-5 flex-shrink-0 w-full ps-[66px]">
                            <div className={`xs:rounded-2xl w-full max-w-[500px] overflow-hidden xs:border dark:border-neutral-700 flex justify-center items-center text-2xl font-bold`}>
                                No more shorts
                            </div>
                        </div>
                    }
                </div>
                {isShowComments && <div className='fixed h-screen w-screen lg:hidden bg-neutral-800/40 dark:bg-neutral-600/20 top-0 left-0 z-[1000]' onClick={() => setIsShowComments(false)} />}
                <div ref={commentRef} className={`w-0 h-0 z-[1001] lg:z-[20]  ${isShowComments ? 'xs:w-[600px] h-[95%] top-3 max-h-[500px]  lg:w-[450px] max-w-[95vw] xs:border' : ''} absolute lg:static bg-white dark:bg-neutral-950 top-20 bottom-20 xs:transition-all xs:duration-500 lg:h-[calc(100vh-90px)] overflow-y-scroll rounded-2xl dark:border-neutral-700`}>
                    <CommentSection blogId={shortId} authorId={authorId} className='sm:w-full' isShowComments={isShowComments} setIsShowComments={setIsShowComments} commentInputClass={styles.commentInput} preventBodyScroll={false} />
                </div>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex-col gap-3 z-10 hidden lg:flex">
                    <button
                        onClick={() => handleScroll('up')}
                        className={cn("bg-neutral-100/30 sm:bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/40 xs:dark:bg-neutral-800 dark:hover:bg-neutral-700 flex p-3 text-2xl  rounded-full transition-all duration-500",
                            index === 0 && "opacity-0 translate-y-[calc(100%+12px)]",
                        )}
                        style={{ visibility: index === 0 ? 'hidden' : 'visible' }}
                    >
                        <ion-icon name="arrow-up-outline"></ion-icon>
                    </button>
                    <button
                        onClick={() => handleScroll('down')}
                        className={cn("bg-neutral-100/30 sm:bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/40 xs:dark:bg-neutral-800 dark:hover:bg-neutral-700 flex p-3 text-2xl  rounded-full transition-all duration-500",
                            index === data.length && "opacity-0 -translate-y-[calc(100%+12px)]",
                        )}
                        style={{ visibility: index === data.length ? 'hidden' : 'visible' }}
                    >
                        <ion-icon name="arrow-down-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Shorts;