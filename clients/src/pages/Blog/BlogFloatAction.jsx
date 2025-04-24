import React, { useState, useEffect } from 'react';
import BlogActions from "../../components/BlogActions";
import useScrollDirection from '../../hooks/useScrollDirection';
import useDeviceType from '../../hooks/useDeviceType';

const BlogFloatAction = ({ blogId, authorId, authorName, totalLikes = 0, shareBtnsClassName, toc, className }) => {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(totalLikes);
    const [saved, setSaved] = useState(false);
    const [followed, setFollowed] = useState(false);
    const [bottomPosition, setBottomPosition] = useState(0);
    const scrollDirection = useScrollDirection();
    const { isMobile } = useDeviceType();

    useEffect(() => {
        if (scrollDirection === 'down') {
            setBottomPosition(-64);
        } else {
            if (isMobile)
                setBottomPosition(55);
            else
                setBottomPosition(0)
        }
    }, [scrollDirection]);
    return (
        <div
            className={`flex-grow flex justify-center md:inline-block w-full fixed md:static pb-3.5 xs:pb-3 bg-gradient-to-t md:bg-none transition-all duration-300 from-neutral-950/30 dark:from-neutral-700/40 left-0 right-0 z-20 md:max-w-[150px] ${className}`}
            style={{ bottom: `${bottomPosition}px` }}
        >
            <BlogActions
                blogId={blogId}
                showName={false}
                authorId={authorId}
                authorName={authorName}
                liked={liked}
                saved={saved}
                followed={followed}
                likesCount={likesCount}
                setLiked={setLiked}
                setSaved={setSaved}
                setFollowed={setFollowed}
                setLikesCount={setLikesCount}
                className='sticky top-32 justify-center w-min md:items-end flex-row md:flex-col gap-4 items-center mx-2 border md:border-0 dark:border-neutral-600 dark:bg-neutral-950/50 bg-neutral-100/50 shadow-base md:shadow-none backdrop-blur-lg px-6 py-3 md:p-0 md:bg-transparent rounded-full md:rounded-none'
                iconClassName='w-min'
                btnClassName='w-min text-lg xs:text-2xl md:text-lg p-0 md:p-3 rounded-[10px] hover:rounded-xl sm:rounded-xl sm:hover:rounded-2xl md:bg-neutral-200 dark:md:bg-neutral-800 transition-all duration-300'
                shareBtnsClassName={shareBtnsClassName}
                otherComponent={toc}
                showReportBtn={false}
            />
        </div>
    )
}

export default BlogFloatAction