import React, { useRef } from 'react'
import './index.css'
import styles, { color } from '../../style';
import EditDeleteBtn from './EditDeleteBtn';
import BlogContents from '../../components/BlogContents';
import { motion, useScroll } from "framer-motion";
import BlogReadingProgress from './BlogReadingProgress';
import { useUserAuthentication } from '../../context/userContext';

const BlogDetails = ({ blogId, summary, authorName, formattedDate, title, needToShowTOC, content, cover }) => {
    const { isAuthenticatedUser } = useUserAuthentication();
    const contentRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: contentRef,
        offset: ["start start", "end end"]
    });
    return (
        <>
            <motion.div className="progress-bar" style={{ scaleX: scrollYProgress }} />
            {isAuthenticatedUser && <BlogReadingProgress ref={contentRef} blogId={blogId} scrollYProgress={scrollYProgress} />}
            <div ref={contentRef} className={`w-full ${needToShowTOC ? 'md:w-3/5' : 'md:w-3/4'} mt-10`}>
                <div className={`${styles.flexCenter} flex-col mb-5`}>
                    <h1 className={`${color.textBlackWhite} ${styles.heading3}`}>{title}</h1>
                    <div className="flex items-center gap-8 mt-2">
                        <div className="flex flex-col items-center">
                            <time className={`font-poppins font-bold text-base md:text-xl ${color.textSlate}`}>{formattedDate}</time>
                            <div className={`${styles.smHeading} text-green-700`}>by @{authorName}</div>
                        </div>
                        <EditDeleteBtn blogId={blogId} />
                    </div>
                </div>
                {cover && <div className="mb-5">
                    <img src={cover?.url} alt="" className="object-fill w-full rounded-2xl h-52 xs:h-80" />
                </div>}
                <div className="border border-neutral-300 dark:border-neutral-700 rounded-r-md mb-5 flex justify-start flex-row overflow-hidden bg-neutral-200/50 dark:bg-neutral-800">
                    <span className="bg-neutral-400 dark:bg-neutral-600 w-2 flex-shrink-0"></span>
                    <span className="py-1.5 px-4 sm:py-5 sm:px-7 flex-grow">
                        <h2 className="text-2xl mb-1 font-bold text-blue dark:text-golden">Summary</h2>
                        <p className="font-semibold font-serif text-neutral-800 dark:text-neutral-300">{summary}</p>
                    </span>
                </div>
                <BlogContents content={content} />
            </div>
        </>
    )
}

export default BlogDetails