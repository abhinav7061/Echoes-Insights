import React, { useState } from 'react';
import TemplateBtn from './templateBtn';
import { toast } from 'sonner';

const CopyBtn = ({ icon = 'copy', showName, btnClassName, copyLink, className }) => {
    const [recentlyCopied, setRecentlyCopied] = useState(false);
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(copyLink);
            setRecentlyCopied(true);
            setTimeout(() => {
                setRecentlyCopied(false);
            }, 2000);
            toast.success('Link copied to clipboard');
        } catch (error) {
            console.error('Error copying link:', error.message);
            toast.error('Failed to copy link');
        }
    };
    return (
        <span className={`relative flex items-center ${className}`}>
            <TemplateBtn
                icon={recentlyCopied ? 'checkmark-circle' : icon}
                title={`Copy link of this blog`}
                onClick={handleCopy}
                showName={showName}
                className={`${recentlyCopied ? 'text-green-400 hover:text-green-400 hover:dark:text-green-400' : ''} ${btnClassName}`}
                name={recentlyCopied ? 'Copied!' : 'Copy'}
            />
        </span>
    )
}

export default CopyBtn