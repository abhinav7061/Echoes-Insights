import React, { useRef, useState } from 'react'
import ReportIssue from '../BlogActions/reportIssue';
import useOutsideClick from '../../hooks/useOutsideClick';
import EditBtn from './EditBtn';
import { deleteReply, editReply } from '../../lib/apiCalls/commentReplyApi';
import { toast } from 'sonner';
import DeleteBtn from './DeleteBtn';

const ReplyActions = ({ value, replyId, setReplies, setRepliesCount, setTotalComments }) => {
    const container = useRef();
    const [show, setShow] = useState(false);
    useOutsideClick(container, () => setShow(false));
    const handleEdit = async (newReplyValue) => {
        try {
            const response = await editReply(replyId, newReplyValue);
            if (response.success) {
                setReplies(prevReplies => {
                    return prevReplies.map(reply => reply._id === replyId ? { ...reply, reply: newReplyValue } : reply);
                });
                toast.success('Reply updated');
                setShow(false);
            } else {
                toast.error(response.message || 'Failed to update reply');
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Error updating reply");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await deleteReply(replyId);
            if (response.success) {
                setReplies(prevReplies => {
                    return prevReplies.filter(reply => reply._id !== replyId);
                });
                setRepliesCount(response.repliesCount);
                setTotalComments(response.commentsCount);
            } else {
                toast.error(response.message || 'Failed to delete reply');
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete reply');
        }
    }
    return (
        <div ref={container} className='relative'>
            <span className={`rounded-full px-1 aspect-square hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center ${show ? " bg-neutral-200 dark:bg-neutral-700" : ""}`} role='button' onClick={() => setShow(!show)}><ion-icon name="ellipsis-horizontal"></ion-icon></span>
            {
                show && <span className='absolute top-6 -right-1 bg-[rgb(238,238,238)] dark:bg-neutral-700 xs:dark:bg-neutral-800 rounded-lg p-4  z-[100]'>
                    <EditBtn className='mb-2' value={value} handleEdit={handleEdit} />
                    <DeleteBtn className='mb-2' handleDelete={handleDelete} type='reply' />
                    <ReportIssue showName={true} />
                </span>
            }
        </div>
    )
}

export default ReplyActions