import React, { useEffect, useState } from 'react';
import { LikeAnimation } from "../../assets";
import { toast } from 'sonner';
import { useUserAuthentication } from '../../context/userContext';
import TemplateBtn from '../BlogActions/templateBtn';

const LikeDislike = ({ id, icon = 'heart-outline', btnClassName, className, likesCount = 0, checkLike, toggleLike, likeType }) => {
    const [totalLikes, setTotalLikes] = useState(likesCount);
    const [iconName, setIconName] = useState(icon);
    const [showCofetti, setShowCofetti] = useState(false);
    const [loading, setLoading] = useState(false);
    const [liked, setLiked] = useState(false);
    const { user } = useUserAuthentication();
    const handleToggleLike = async () => {
        if (!user) return toast.error(`Login first to like ${likeType}`);
        setLoading(true);
        try {
            const result = await toggleLike(id);
            if (result.success) {
                if (!liked) {
                    setShowCofetti(true);
                    setTimeout(() => {
                        setShowCofetti(false);
                    }, 500);
                }
                setTotalLikes(result.likesCount);
                setLiked(!liked);
                toast.success(result.message);
            } else {
                toast.error(result.message || "Something went wrong");
            }
        } catch (error) {
            console.error('Error toggling like:', error.message);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleCheckLike = async () => {
            try {
                const result = await checkLike(id);
                setLiked(result.liked);
            } catch (error) {
                setLiked(false);
                console.error('Error checking blog like status:', error.message);
            }
        };
        handleCheckLike();
    }, [user])
    useEffect(() => {
        if (liked) {
            setIconName('heart');
        } else {
            setIconName('heart-outline');
        }
    }, [liked])
    return (
        <span className={`relative flex items-center gap-1 ${className}`}>
            {showCofetti && <img src={LikeAnimation} className="absolute h-4 scale-[4]" />}
            <TemplateBtn
                icon={iconName}
                title={`${liked ? 'Dislike' : 'Like'} the ${likeType}`}
                onClick={handleToggleLike}
                iconClassName={showCofetti ? 'opacity-0' : liked ? 'text-red-600' : ''}
                showName={false}
                className={btnClassName}
                name={liked ? 'Dislike' : 'Like'}
                loading={loading}
            >
                &middot;
                <p className='text-[10px] whitespace-nowrap opacity-80'>
                    {totalLikes} likes
                </p>
            </TemplateBtn>
        </span>
    )
}

export default LikeDislike