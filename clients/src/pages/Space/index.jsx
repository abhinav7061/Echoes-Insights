import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../../components/UserInfo';
import NoHistory from '../../components/EmptyState/NoHistory';
const ReadingHistory = React.lazy(() => import('../../components/ReadingHistory'));
const LikedBlogs = React.lazy(() => import('../LikedBlogs'));
const SavedBlogs = React.lazy(() => import('../SavedBlogs'));

const Space = () => {
    return (
        <div className='z-10 relative'>
            <UserInfo />
            <Heading heading="history" navigateTo="/history" />
            <ReadingHistory className="mb-0" emptyScreen={<NoHistory/>} shortFetch />
            <Heading heading="liked blogs" navigateTo="/likes" />
            <LikedBlogs className="mb-0" shortFetch />
            <Heading heading="saved blogs" navigateTo="/saved" />
            <SavedBlogs className="mb-0" shortFetch />
        </div>
    )
};

export default Space

const Heading = ({ heading, navigateTo }) => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-start my-5">
            <p className='text-xl sm:text-2xl font-bold'>{heading}</p>
            <button
                onClick={() => navigateTo && navigate(navigateTo)}
                className="text-sm rounded-full px-4 py-[5px] border dark:border-neutral-200 border-neutral-950 dark:text-neutral-200 text-neutral-950 hover:dark:text-neutral-50 hover:text-neutral-700 hover:dark:border-neutral-50 hover:border-neutral-950">
                See all
            </button>
        </div>
    )
}