import React from 'react';
import Accordion from '../Accordion';
import { formatRelative } from 'date-fns';

const CommentCard = ({ avatar, name, date, text, userImageClass, className, children, action, isAuthor }) => {
    return (
        <>
            <img
                src={avatar || "/default-profile.png"}
                alt="User Avatar"
                className={`rounded-full mr-3 ${userImageClass}`}
            />
            <div className={`w-full ${className}`}>
                <span className='flex font-bold justify-between text-xs'>
                    <span className='flex'>
                        <h3 className='mr-1.5 line-clamp-1'>{name || 'user'}</h3>
                        {isAuthor && <span className=' bg-neutral-200 dark:bg-neutral-900 px-2 rounded-full mr-1.5 text-blue dark:text-golden flex items-center font-normal'>Author</span>}
                        &middot;
                        <h3 className='ml-1.5 line-clamp-1'>{formatRelative(new Date(Date.parse(date)), new Date(), { addSuffix: false })}</h3>
                    </span>
                    {action}
                </span>
                <Accordion text={text || "This is the comments "} maxLines={3} />
                {children}
            </div>
        </>
    );
};

export default CommentCard;