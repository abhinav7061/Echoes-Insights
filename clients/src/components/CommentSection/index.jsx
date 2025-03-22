import React, { useState, useRef, useEffect } from 'react'
import CommentCard from './CommentCard'
import CommentInputForm from './CommentInputForm'
import Reply from './Reply'
import CommentReplies from './CommentReplies'
import { cn } from '../../lib/utils'
import useOutsideClick from '../../hooks/useOutsideClick'
import LikeDislike from './LikeDislike'
import CommentItemSkeletonloading from '../SkeletonLoader.js/CommentItemSkeletonloading'
import { checkCommentLike, toggleCommentLike } from '../../lib/apiCalls/likeApi'
import { addComment } from '../../lib/apiCalls/commentApi'
import ErrorMessage from '../ErrorMessage'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import CommentActions from './CommentActions'
import useWindowSize from '../../hooks/useWindowSize'

const MIN_HEIGHT = 0;
const MAX_HEIGHT = window.innerHeight - 240;

const CommentSection = ({ blogId, authorId, commentsCount, className, isShowComments = false, setIsShowComments, preventBodyScroll = true, commentInputClass }) => {
    const [showComments, setShowComments] = useState(isShowComments);
    const [totalComments, setTotalComments] = useState(commentsCount);
    const [touchStartY, setTouchStartY] = useState(0);
    const [touchMoveY, setTouchMoveY] = useState(0);
    const [draggedHeight, setDraggedHeight] = useState(null);
    const { data: comments, setData: setComments, loading, error, hasMore, loaderRef, debouncedReset } = useInfiniteScroll(`/comment/all-comment/${blogId}`);
    const commentContainerRef = useRef();
    const commentsDiv = useRef();
    const { windowInWidth } = useWindowSize();
    useOutsideClick(commentContainerRef, () => {
        if (windowInWidth < 1200 && preventBodyScroll) setShowComments(false)
    })

    const handleTouchStart = (e) => {
        setTouchStartY(e.touches[0].clientY);
        setDraggedHeight(null);
    };
    const handleTouchMove = (e) => {
        const moveY = e.touches[0].clientY;
        const deltaY = moveY - touchStartY;

        if (deltaY > 100 && commentsDiv.current?.scrollTop === 0) {
            setDraggedHeight(Math.max(MAX_HEIGHT - deltaY, MIN_HEIGHT));
        } else {
            setDraggedHeight(null);
        }

        setTouchMoveY(moveY);
    };
    const handleTouchEnd = () => {
        const swipeDistance = touchMoveY - touchStartY;

        if (swipeDistance > 100 && commentsDiv.current?.scrollTop === 0) {
            setShowComments(false);
        }

        setTouchStartY(0);
        setTouchMoveY(0);
    };

    const handleCommentSubmit = async (comment) => {
        try {
            const result = await addComment(blogId, comment);
            if (result.success) {
                setTotalComments(result.commentsCount);
                setComments(prev => [result.newComment, ...prev]);
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setShowComments(isShowComments);
    }, [isShowComments]);

    useEffect(() => {
        setDraggedHeight(null);
        setIsShowComments && setIsShowComments(showComments);
    }, [showComments]);
    useEffect(() => {
        if (!preventBodyScroll) return;
        if (showComments) {
            document.body.style.overflow = window.innerWidth < 460 ? 'hidden' : 'auto';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showComments, windowInWidth])

    if (error) {
        return <span className='w-full sm:w-3/5'><ErrorMessage heading='Error fetching Comments' message={error} action={debouncedReset} /></span>
    }

    return (
        <div className={`w-full sm:w-3/5 ${showComments ? '' : 'h-[78px] xs:h-auto overflow-hidden'} ${className}`}>
            <div className={`rounded-xl xs:rounded-none border xs:border-0 px-4 py-2 xs:pb-5 bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-700 xs:pointer-events-none ${showComments ? "pointer-events-none" : ""}`}
                onClick={() => (window.innerWidth < 480) && setShowComments(!showComments)}
                role='button'
            >
                <h1 className='font-bold text-base xs:text-xl'>
                    {totalComments} Comment
                </h1>
                <span className='xs:hidden flex text-xs mt-1'><CommentCard userImageClass='w-7 h-7' name='top Commenter' date='2025-01-11T14:21:00.190Z' text='this is top comment' /></span>
            </div>
            <div ref={commentContainerRef} className={cn('xs:block xs:static xs:h-auto xs:bg-white xs:dark:bg-neutral-950 xs:rounded-t-none transition-[height] duration-700 ease-in-out',
                showComments ? "flex flex-col fixed w-full xs:w-auto bottom-0 left-0 bg-neutral-50 dark:bg-neutral-800 z-[100] rounded-t-xl shadow-[0_-5px_20px_0px_rgba(23,23,23,0.7)] xs:shadow-none h-[calc(100vh-240px)]" : "h-0"
            )}
                style={draggedHeight !== null? {
                    height: `${draggedHeight}px`
                }: {}}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className='h-[24px] sticky xs:hidden top-0 bg-neutral-50 dark:bg-neutral-800 w-full z-[100]  flex py-2 justify-center rounded-t-xl' role='button' onClick={() => setShowComments(false)}><div className='h-2 w-20 rounded-full bg-neutral-500'></div></div>
                <CommentInputForm className={`px-2 xs:mb-6 pb-3 xs:py-4 sticky top-0 xs:top-16 bg-neutral-50 dark:bg-neutral-800 xs:bg-white xs:dark:bg-neutral-950 ${commentInputClass}`} onSubmit={handleCommentSubmit} />
                <div ref={commentsDiv} className='flex-grow p-4 h-auto overflow-y-scroll xs:overflow-y-visible'>
                    {
                        comments.map(comment => {
                            return (
                                <div key={comment._id} className=' relative mb-2'>
                                    <CommentItem _id={comment._id} authorId={authorId} totalReply={comment.repliesCount} user={comment.user} createdAt={comment.createdAt} likesCount={comment.likesCount} comment={comment.comment} setComments={setComments} setTotalComments={setTotalComments} showComments={showComments} />
                                </div>
                            )
                        })
                    }
                    {loading && hasMore && <CommentItemSkeletonloading />}
                    {!hasMore && <h3 className='font-bold mt-4 text-center text-lg'>No {totalComments > 0 ? 'more comments' : 'comment'}</h3>}
                </div>
                <div ref={loaderRef} className='w-full' />
            </div>
        </div>
    )
}

export default CommentSection

export const CommentItem = ({ _id, authorId, totalReply, user, createdAt, comment, setComments, likesCount, setTotalComments, showComments }) => {
    const [repliesCount, setRepliesCount] = useState(totalReply);
    const [replies, setReplies] = useState([]);
    return (
        <>
            <div className='w-full flex items-start text-sm relative'>
                {repliesCount > 0 && <div className='h-[calc(100%-35px)] absolute bottom-0 left-3 flex-shrink-0 w-[2px] bg-neutral-300 dark:bg-neutral-500 z-0' />}
                <CommentCard isAuthor={authorId == user._id} userImageClass='w-7 h-7 z-[5]' avatar={user?.avatar} name={user?.name} date={createdAt} text={comment} action={<CommentActions value={comment} commentId={_id} setComments={setComments} setTotalComments={setTotalComments} />}>
                    <div className='flex gap-3 items-center mt-2'>
                        <LikeDislike id={_id} showName={true} likesCount={likesCount} checkLike={checkCommentLike} toggleLike={toggleCommentLike} likeType='comment' />
                        <span className='h-3 border-l border-neutral-400'></span>
                        <Reply commentId={_id} repliesCount={repliesCount} setRepliesCount={setRepliesCount} setTotalComments={setTotalComments} setReplies={setReplies} />
                    </div>
                </CommentCard>
            </div>
            {repliesCount > 0 && <CommentReplies replies={replies} setReplies={setReplies} commentId={_id} showComments={showComments} setRepliesCount={setRepliesCount} setTotalComments={setTotalComments} />}
        </>
    )
}