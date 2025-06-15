import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { color } from '../../style'
import WarningPrompt from '../../components/CustomPopup/WarningPrompt';
import { deleteBlog } from '../../lib/apiCalls/blogApi';

const DeleteBlog = ({ blogId }) => {
    const navigate = useNavigate();
    const [showPrompt, setShowPrompt] = useState(false);

    const handleAcceptance = async (accepted) => {
        if (accepted) {
            const toastId = toast.loading("deleting blog...", { duration: Infinity });
            try {
                await deleteBlog(blogId);
                toast.dismiss(toastId);
                toast.success('Blog deleted successfully');
                setShowPrompt(false);
                navigate('/');
            } catch (error) {
                toast.dismiss(toastId);
                toast.error('Failed to delete blog');
            }
        }
        else {
            setShowPrompt(false);
        }
    }

    return (
        <>
            <button
                className="text-red-600 flex items-center gap-2 text-sm px-2 py-1 hover:bg-red-700/20 rounded-md"
                type='button'
                onClick={() => setShowPrompt(true)}
            >
                <ion-icon name="trash-outline"></ion-icon> Delete Blog
            </button >
            <WarningPrompt
                visibility={showPrompt}
                warningMessage='Are you sure you want to delete this blog?'
                onClose={(val) => setShowPrompt(val)}
                setAccepted={handleAcceptance}
            />
        </>
    )
}

export default DeleteBlog