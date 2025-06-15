import React, { useRef } from 'react'
import './index.css'
import BlogContents from '../../components/BlogContents';
import { motion, useScroll } from "framer-motion";
const BlogReadingProgress = React.lazy(() => import('./BlogReadingProgress'));
import { useUserAuthentication } from '../../context/userContext';
import { cn } from '../../lib/utils';
import Dropdown from '../../components/Dropdown';
import EditBlogBtn from './EditBlogBtn';
import DeleteBlog from './DeleteBlog';
import { useNavigate } from 'react-router-dom';

const BlogDetails = ({ blogId, summary, authorId, channelName, channelImg, channelHandle, formattedDate, title, needToShowTOC, content, cover, views }) => {
    const { isAuthenticatedUser, user } = useUserAuthentication();
    const contentRef = useRef(null);
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll({
        target: contentRef,
        offset: ["start start", "end end"]
    });
    return (
        <>
            <motion.div className="progress-bar" style={{ scaleX: scrollYProgress }} />
            {isAuthenticatedUser && <BlogReadingProgress ref={contentRef} blogId={blogId} scrollYProgress={scrollYProgress} />}
            <div ref={contentRef} className={cn("w-full sm:px-0", needToShowTOC ? 'md:w-3/5' : 'md:w-3/4 sm:px-16', "xs:p-5 ss:px-10")}>
                <div className="mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
                    <div className="flex justify-between items-center bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(`/writer/${channelHandle}`)}
                                className="flex items-center gap-2 hover:underline"
                            >
                                <img
                                    src={channelImg}
                                    alt={channelName}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className='flex flex-col items-start'>
                                    <span className="font-medium">{channelName}</span>
                                    <span className="font-medium text-sm">{channelHandle}</span>
                                </div>
                            </button>
                            <span className="hidden sm:block text-neutral-500 dark:text-neutral-400">•</span>
                            <time className="hidden sm:block text-neutral-600 dark:text-neutral-400">{formattedDate}</time>
                            <span className="hidden sm:block text-neutral-500 dark:text-neutral-400">•</span>
                            <span className="hidden sm:block text-neutral-600 dark:text-neutral-400">{views} views</span>
                        </div>
                        {authorId === user?.id && (
                            <Dropdown
                                trigger={({ onClick, isOpen }) => (
                                    <button
                                        onClick={onClick}
                                        className={cn(
                                            "rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 flex",
                                            isOpen
                                                ? "bg-neutral-100 dark:bg-neutral-700 text-2xl p-1.5"
                                                : "bg-transparent p-2 text-xl"
                                        )}
                                    >
                                        <ion-icon name={isOpen ? "close-outline" : "ellipsis-vertical"}></ion-icon>
                                    </button>
                                )}
                                position='bottom-right'
                                closeOnSelect={false}
                                contentClassName='w-40'
                                className='absolute top-full right-0'
                            >
                                <div className='flex gap-1 flex-col'>
                                    <EditBlogBtn blogId={blogId} />
                                    <DeleteBlog blogId={blogId} />
                                </div>
                            </Dropdown>
                        )}
                    </div>
                    <div className="flex sm:hidden items-center justify-between bg-neutral-50 mt-3 dark:bg-neutral-900 rounded-lg px-4 py-2 text-sm">
                        <time className="text-neutral-600 dark:text-neutral-400">{formattedDate}</time>
                        <span className="text-neutral-600 dark:text-neutral-400">{views} views</span>
                    </div>
                </div>

                {cover && (
                    <div className="mb-8 rounded-xl overflow-hidden">
                        <img
                            src={cover?.url}
                            alt=""
                            className="w-full h-auto max-h-96 object-cover"
                        />
                    </div>
                )}

                {/* Tags */}
                {/* <div className="flex flex-wrap gap-2 mb-8">
                    {blog.tags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => navigate(`/tags/${tag.toLowerCase()}`)}
                            className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-full text-sm"
                        >
                            #{tag}
                        </button>
                    ))}
                </div> */}
                <div className="bg-sky-50 dark:bg-yellow-950/20 border-l-4 border-blue dark:border-golden rounded-r-lg p-6 mb-8">
                    <h2 className="text-xl font-bold mb-3 text-blue dark:text-golden">Summary</h2>
                    <p className="text-neutral-800 dark:text-neutral-200">{summary}</p>
                </div>
                <BlogContents content={content} />
            </div>
        </>
    )
}

export default BlogDetails