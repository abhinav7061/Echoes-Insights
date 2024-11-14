import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { color } from '../../style'
import WarningPrompt from '../../components/CustomPopup/WarningPrompt';

const apiUrl = import.meta.env.VITE_API_URL;

const DeleteBlog = ({ blogId }) => {
    const navigate = useNavigate();
    const [showPrompt, setShowPrompt] = useState(false);

    const deleteBlog = async () => {
        const toastId = toast.loading("deleting blog...", { duration: Infinity })
        try {
            const res = await fetch(`${apiUrl}/blog/deleteBlog/${blogId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            const data = await res.json();
            toast.dismiss(toastId);
            if (data.success) {
                toast.success('Blog deleted successfully');
                setShowPrompt(false);
                navigate('/blog');
            }
            else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.dismiss(toastId);
            toast.error('Failed to delete blog');
        }
    }

    const handleAcceptance = (accepted) => {
        if (accepted) {
            deleteBlog();
        }
        else {
            setShowPrompt(false);
        }
    }

    return (
        <>
            <button
                className={`${color.textBlackWhite} hover:text-red-500 h-6 flex items-center gap-2 text-xs md:text-sm`}
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