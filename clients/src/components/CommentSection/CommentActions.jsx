import React, { useRef, useState } from 'react'
import ReportIssue from '../BlogActions/reportIssue';
import useOutsideClick from '../../hooks/useOutsideClick';
import EditBtn from './EditBtn';
import { toast } from 'sonner';
import DeleteBtn from './DeleteBtn';
import { deleteComment, editComment } from '../../lib/apiCalls/commentApi';

const CommentActions = ({ value, commentId, setComments, setTotalComments }) => {
    const container = useRef();
    const [show, setShow] = useState(false);
    useOutsideClick(container, () => setShow(false));
    const handleEdit = async (newComment) => {
        try {
            const response = await editComment(commentId, newComment);
            if (response.success) {
                setComments(prevComments => {
                    return prevComments.map(comment => comment._id === commentId ? { ...comment, comment: newComment } : comment);
                });
                toast.success('Comment updated');
                setShow(false);
            } else {
                toast.error(response.message || 'Failed to update comment');
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Error updating comment");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await deleteComment(commentId);
            if (response.success) {
                setComments(prevComments => {
                    return prevComments.filter(comment => comment._id !== commentId);
                });
                setTotalComments(response.commentsCount);
            } else {
                toast.error(response.message || 'Failed to delete comment');
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete comment');
        }
    }
    return (
        <div ref={container} className='relative'>
            <span className={`rounded-full px-1 aspect-square hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center ${show ? " bg-neutral-200 dark:bg-neutral-700" : ""}`} role='button' onClick={() => setShow(!show)}><ion-icon name="ellipsis-horizontal"></ion-icon></span>
            {
                show && <span className='absolute top-6 -right-1 bg-[rgb(238,238,238)] dark:bg-neutral-700 xs:dark:bg-neutral-800 rounded-lg p-4  z-[100]'>
                    <EditBtn className='mb-2' value={value} handleEdit={handleEdit} />
                    <DeleteBtn className='mb-2' handleDelete={handleDelete} type='comment' />
                    <ReportIssue showName={true} />
                </span>
            }
        </div>
    )
}

export default CommentActions