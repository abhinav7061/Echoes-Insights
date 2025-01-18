import React, { useRef, useState } from 'react'
import { toast } from 'sonner';
import TemplateBtn from '../BlogActions/templateBtn'
import CommentInputForm from './CommentInputForm';
import useOutsideClick from '../../hooks/useOutsideClick';
import { addReply } from '../../lib/apiCalls/commentReplyApi';

const Reply = ({ commentId, repliesCount, setRepliesCount, setReplies, setTotalComments }) => {
    const container = useRef();
    const [show, setShow] = useState(false);
    const handleReply = async (reply) => {
        try {
            const result = await addReply(commentId, reply);
            if (result.success) {
                toast.success(result.message);
                setReplies(prev => [result.newReply, ...prev]);
                setRepliesCount(result.repliesCount);
                setTotalComments(result.commentsCount);
                setShow(false);
            }
        } catch (error) {
            console.error(error);
            toast.error('Error while processing your request');
        }
    }
    useOutsideClick(container, () => setShow(false));
    return (
        <div className='relative w-full'>
            <TemplateBtn
                className={`inline-flex ${show ? 'pointer-events-none' : ''}`}
                icon='chatbox-ellipses-outline'
                showName={true}
                name={`Reply`}
                title='Reply to this comment'
                onClick={() => setShow(!show)}
            >
                &middot; <p className='text-[10px] whitespace-nowrap opacity-80'>{repliesCount} replies</p>
            </TemplateBtn>
            {show && <div
                ref={container}
                className='absolute translate-x-[-40%] w-[300px] max-w-[90vw]  xs:translate-x-[-50%] sm:translate-x-0 bg-neutral-200 px-4 py-2 rounded-lg dark:bg-neutral-700 xs:dark:bg-neutral-800  top-6 z-[100] xs:w-full min-w-[200px] shadow-sm shadow-neutral-400 dark:shadow-neutral-600 '
            >
                <CommentInputForm onSubmit={(reply) => handleReply(reply)} isReply={true} autoFocus={true} />
            </div>}
        </div>
    )
}

export default Reply