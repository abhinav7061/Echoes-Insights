import React from 'react';
import { people01 } from '../../assets';
import Accordion from '../Accordion';
import { formatRelative } from 'date-fns';

const CommentCard = ({ avatar, name, date, text, userImageClass, className, children, action }) => {
    return (
        <>
            <img
                src={avatar || people01}
                alt="User Avatar"
                className={`rounded-full mr-3 ${userImageClass}`}
            />
            <div className={`w-full ${className}`}>
                <span className='flex font-bold justify-between'>
                    <span className='flex'>
                        <h3 className='mr-1.5 line-clamp-1'>{name || 'user'}</h3>
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