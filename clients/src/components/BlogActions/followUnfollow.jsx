import React, { useEffect, useState } from 'react';
import TemplateBtn from './templateBtn';
import { checkFollowStatus, toggleFollow } from '../../lib/apiCalls/followerApi';
import { toast } from 'sonner';
import { useUserAuthentication } from '../../context/userContext';

const FollowUnfollow = ({ authorId, authorName = 'author', icon = 'add-circle-outline', showName, btnClassName, className, followed, setFollowed }) => {
    const [iconName, setIconName] = useState(icon);
    const [loading, setLoading] = useState(false);
    const { user } = useUserAuthentication();
    const handleToggleFollow = async () => {
        if (!user) return toast.error(`Login first to follow ${authorName}`);
        setLoading(true);
        try {
            const result = await toggleFollow(authorId);
            if (result.success) {
                setFollowed(!followed);
                toast.success(result.message);
            } else {
                toast.error(result.message || "Something went wrong");
            }
        } catch (error) {
            console.error('Error toggling following:', error.message);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleCheckFollowStatus = async () => {
            try {
                const result = await checkFollowStatus(authorId);
                setFollowed(result.followed);
            } catch (error) {
                setFollowed(false);
                console.error('Error checking following status:', error.message);
            }
        };
        handleCheckFollowStatus();
    }, [user])
    useEffect(() => {
        if (followed) {
            setIconName('remove-circle-outline');
        } else {
            setIconName('add-circle-outline');
        }

    }, [followed])
    return (
        <span className={`relative flex items-center ${className}`}>
            <TemplateBtn
                icon={iconName}
                title={`${followed ? 'Unfollow' : 'Follow'} ${authorName}`}
                onClick={handleToggleFollow}
                showName={showName}
                className={btnClassName}
                name={followed ? 'Unfollow' : 'Follow'}
                loading={loading}
            />
        </span>
    )
}

export default FollowUnfollow