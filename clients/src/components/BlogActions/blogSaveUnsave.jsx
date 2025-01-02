import React, { useEffect, useState } from 'react';
import TemplateBtn from './templateBtn';
import { checkBlogSave, toggleBlogSave } from '../../lib/apiCalls/blogSaveApi';
import { toast } from 'sonner';
import { useUserAuthentication } from '../../context/userContext';

const BlogSaveUnsave = ({ blogId, icon = 'bookmark-outline', showName, btnClassName, className, saved, setSaved }) => {
    const [iconName, setIconName] = useState(icon);
    const [loading, setLoading] = useState(false);
    const { user } = useUserAuthentication();
    const handleToggleBlogSave = async () => {
        if (!user) return toast.error("Login first to save blog");
        setLoading(true);
        try {
            const result = await toggleBlogSave(blogId);
            if (result.success) {
                setSaved(!saved);
                toast.success(result.message);
            } else {
                toast.error(result.message || "Something went wrong");
            }
        } catch (error) {
            console.error('Error toggling blog save:', error.message);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleCheckBlogSave = async () => {
            try {
                const result = await checkBlogSave(blogId);
                setSaved(result.saved);
            } catch (error) {
                setSaved(false);
                console.error('Error checking blog save status:', error.message);
            }
        };
        handleCheckBlogSave();
    }, [user])
    useEffect(() => {
        if (saved) {
            setIconName('bookmark');
        } else {
            setIconName('bookmark-outline');
        }
    }, [saved])
    return (
        <span className={`relative flex items-center ${className}`}>
            <TemplateBtn
                icon={iconName}
                title={`${saved ? 'Unsave' : 'Save'} the blog`}
                onClick={handleToggleBlogSave}
                showName={showName}
                className={btnClassName}
                name={saved ? 'Unsave' : 'Save'}
                loading={loading}
            />
        </span>
    )
}

export default BlogSaveUnsave