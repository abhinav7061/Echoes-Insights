import React, { useEffect, useState } from 'react';
import { LikeAnimation } from "../../assets";
import TemplateBtn from './templateBtn';
import { checkBlogLike, toggleBlogLike } from '../../lib/apiCalls/likeApi';
import { toast } from 'sonner';
import { useUserAuthentication } from '../../context/userContext';

const BlogLikeDislike = ({ blogId, icon = 'heart-outline', showName, btnClassName, className, liked, setLiked }) => {
    const [iconName, setIconName] = useState(icon);
    const [showCofetti, setShowCofetti] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useUserAuthentication();
    const handleToggleBlogLike = async () => {
        if (!user) return toast.error("Login first to like blog");
        setLoading(true);
        try {
            const result = await toggleBlogLike(blogId);
            if (result.success) {
                if (!liked) {
                    setShowCofetti(true);
                    setTimeout(() => {
                        setShowCofetti(false);
                    }, 500);
                }
                setLiked(!liked);
                toast.success(result.message);
            } else {
                toast.error(result.message || "Something went wrong");
            }
        } catch (error) {
            console.error('Error toggling blog like:', error.message);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleCheckBlogLike = async () => {
            try {
                const result = await checkBlogLike(blogId);
                setLiked(result.liked);
            } catch (error) {
                setLiked(false);
                console.error('Error checking blog like status:', error.message);
            }
        };
        handleCheckBlogLike();
    }, [user])
    useEffect(() => {
        if (liked) {
            setIconName('heart');
        } else {
            setIconName('heart-outline');
        }
    }, [liked])
    return (
        <span className={`relative flex items-center ${className}`}>
            {showCofetti && <img src={LikeAnimation} className="absolute h-4 scale-[4]" />}
            <TemplateBtn
                icon={iconName}
                title={`${liked ? 'Deslike' : 'Like'} the blog`}
                onClick={handleToggleBlogLike}
                iconClassName={showCofetti ? 'opacity-0' : liked ? 'text-red-600' : ''}
                showName={showName}
                className={btnClassName}
                name={liked ? 'Deslike' : 'Like'}
                loading={loading}
            />
        </span>
    )
}

export default BlogLikeDislike