import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import CommentSection from '../../components/CommentSection';
import useOutsideClick from '../../hooks/useOutsideClick';
import styles from './index.module.css'
import useWindowSize from '../../hooks/useWindowSize';
import useInfiniteApi from '../../hooks/useInfiniteApi';
import debounce from '../../lib/debounce';
import useLockBody from '../../hooks/useLockBody';
import { toast } from 'sonner';
import Button from '../../components/Button';
import ShortItem from '../../components/ShortsItem';
import ShortsControls from './shortsControls';
import useSwipeDirection from '../../hooks/useSwipeDirection';

const Shorts = () => {
    useLockBody(true);
    const containerRef = useRef(null);
    const commentRef = useRef(null);
    const debouncedNavigateRef = useRef(null);
    const navigate = useNavigate();
    const { shortId } = useParams();
    const [isShowComments, setIsShowComments] = useState(false);
    const [authorId, setAuthorId] = useState(null);
    const [index, setIndex] = useState(0);
    const { windowInWidth } = useWindowSize();
    const swipeDirection = useSwipeDirection(containerRef);
    useOutsideClick(commentRef, () => {
        if (windowInWidth < 1200) setIsShowComments(false)
    })
    const { data, loading, error, hasMore, loaderRef } = useInfiniteApi('/blog/shorts', shortId);

    const handleScroll = useCallback((direction) => {
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
    }, [containerRef, data.length]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp') handleScroll('up');
            if (e.key === 'ArrowDown') handleScroll('down');
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleScroll]);

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

    const handleScrollEnd = useCallback((e) => {
        if (e.deltaY > 0 && index < data.length) {
            handleScroll('down');
        } else if (e.deltaY < 0 && index > 0) {
            handleScroll('up');
        }
    }, [data.length, handleScroll, index]);

    useEffect(() => {
        const handleScrollEvent = debounce(handleScrollEnd, 50);
        containerRef.current?.addEventListener('wheel', handleScrollEvent);

        return () => {
            containerRef.current?.removeEventListener('wheel', handleScrollEvent);
            handleScrollEvent.cancel?.();
        };
    }, [handleScrollEnd, containerRef]);

    useEffect(() => {
        if (!swipeDirection) return;

        if (swipeDirection === 'up') {
            handleScroll('down');
        } else if (swipeDirection === 'down') {
            handleScroll('up');
        }
    }, [swipeDirection, handleScroll]);

    return (
        <div className={`fixed top-0 bottom-0 right-0 left-0 xs:relative z-[1001] xs:z-auto bg-white dark:bg-neutral-950 h-full xs:h-[calc(100vh-90px)] `}>
            <div
                aria-label="Go back"
                role='button'
                className="fixed top-3 left-3 bg-neutral-100/30 sm:bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/40 xs:dark:bg-neutral-800 dark:hover:bg-neutral-700 flex p-3 text-2xl  rounded-full transition-all duration-500 z-10 xs:hidden"
                onClick={() => navigate(-1)}
            >
                <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className='relative flex xs:gap-4 items-center justify-center h-full ml-auto mr-auto w-full'>
                <div
                    ref={containerRef}
                    className="overflow-hidden snap-y snap-mandatory snap-always scrollbar-none overscroll-contain w-full max-w-[500px] z-0 flex flex-col h-full gap-2"
                >
                    {data.map((short, index) => <ShortItem
                        key={short._id}
                        short={short} l
                        loaderRef={loaderRef}
                        index={index}
                        totalItems={data.length}
                        isShowComments={isShowComments}
                        setIsShowComments={setIsShowComments}
                    />)}
                    {
                        loading ? <div className="relative snap-start h-full flex gap-5 flex-shrink-0 w-full">loading...</div> : error ? <div className="relative snap-start h-full flex gap-5 flex-shrink-0 w-full">Error: {error}</div> : null
                    }
                    {
                        !hasMore && <div className="relative snap-start h-full flex justify-end gap-5 flex-shrink-0 w-full">
                            <div className={`xs:rounded-2xl w-full max-w-[500px] overflow-hidden xs:border dark:border-neutral-700 flex flex-col justify-center items-center text-2xl font-bold`}>
                                <p>No more shorts</p>
                                <Button title='Create Your own' className='text-sm mt-2 rounded-full px-3 py-1' onClick={() => toast.info('This is under development')} />
                            </div>
                        </div>
                    }
                </div>
                {isShowComments && <div className='fixed h-screen w-screen lg:hidden bg-neutral-800/40 dark:bg-neutral-600/20 top-0 left-0 z-[1000]' onClick={() => setIsShowComments(false)} />}
                <div ref={commentRef} className={`w-0 h-0 z-[1001] lg:z-[20]  ${isShowComments ? 'xs:w-[600px] h-[95%] top-3 max-h-[500px]  lg:w-[450px] max-w-[95vw] xs:border' : ''} absolute lg:static bg-white dark:bg-neutral-950 top-20 bottom-20 xs:transition-all xs:duration-500 lg:h-[calc(100vh-90px)] overflow-y-scroll rounded-2xl dark:border-neutral-700`}>
                    <CommentSection blogId={shortId} authorId={authorId} className='sm:w-full' isShowComments={isShowComments} setIsShowComments={setIsShowComments} commentInputClass={styles.commentInput} preventBodyScroll={false} />
                </div>
                <ShortsControls handleScroll={handleScroll} canGoUp={index === 0} canGoDown={index === data.length} />
            </div>
        </div>
    );
};

export default Shorts;