import React, { useEffect, useState } from 'react'
import CommentCard from './CommentCard'
import LikeDislike from './LikeDislike';
import { checkCommentReplyLike, toggleCommentReplyLike } from '../../lib/apiCalls/likeApi';
import { getAllReplies } from '../../lib/apiCalls/commentReplyApi';
import CommentItemSkeletonloading from '../SkeletonLoader.js/CommentItemSkeletonloading';
import ErrorMessage from '../ErrorMessage';
import ReplyActions from './ReplyActions';

const CommentReplies = ({ replies, setReplies, commentId, showComments, setRepliesCount, setTotalComments }) => {
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const limit = 10;

    const fetchReplies = async () => {
        if (!hasMore || page == 0) return;
        setLoading(true);
        setError(null);
        try {
            const result = await getAllReplies(commentId, page, limit);
            if (result.success) {
                const existingReplyIds = new Set(replies.map((reply) => reply._id.toString()));
                const newReplies = result.replies.filter(
                    (newReply) => !existingReplyIds.has(newReply._id.toString())
                );
                setReplies([...replies, ...newReplies]);
                setHasMore(result.replies.length >= limit);
            } else throw new Error(result.message);
        } catch (error) {
            console.log(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchReplies();
    }, [page])

    if (error) {
        return <ErrorMessage heading='Error fetching Replies' message={error} action={fetchReplies} />
    }
    return (
        <div className='relative border-s-2 border-b-2 space-y-3 border-neutral-300 dark:border-neutral-500 ms-3 mb-6 ps-5 py-5 rounded-b-xl'>
            {
                replies.map(reply => {
                    return (
                        <div className='w-full flex items-start text-sm mb-2' key={reply._id}>
                            <CommentCard userImageClass='h-6 w-6' avatar={reply.user?.avatar} name={reply.user?.name} date={reply.createdAt} text={reply.reply} action={<ReplyActions replyId={reply._id} value={reply.reply} setReplies={setReplies} setRepliesCount={setRepliesCount} setTotalComments={setTotalComments} />}>
                                <LikeDislike id={reply._id} showName={true} likesCount={reply?.likesCount} checkLike={checkCommentReplyLike} toggleLike={toggleCommentReplyLike} likeType='reply' />
                            </CommentCard>
                        </div>
                    )
                })
            }
            {loading && <CommentItemSkeletonloading />}
            <div
                className={`translate-y-[50%] absolute bottom-0 left-5 w-[calc(100%-20px)] px-2 py-1 xs:bg-white xs:dark:bg-neutral-950 ${showComments ? "bg-neutral-50 dark:bg-neutral-800" : ""} ${!hasMore ? "pointer-events-none" : ""}`}
                role='button'
                onClick={() => hasMore ? setPage(page + 1) : null}
                aria-disabled={!hasMore}
            >{(replies.length == 0) ? "See Replies" : loading ? 'loading' : hasMore ? "Load More" : 'No more replies'}</div>
        </div>
    )
}

export default CommentReplies