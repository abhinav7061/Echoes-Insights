import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import { useParams } from "react-router-dom";
import styles, { color } from '../../style';
import { format } from "date-fns";
import { motion, useScroll } from "framer-motion";
import BlogPageSkeletonloading from "./BlogPageSkeletonloading";
import BlogContents from "../../components/BlogContents";
import Toc from "./Toc";
import ErrorMessage from "../../components/ErrorMessage";
import EditDeleteBtn from "./EditDeleteBtn";
import BlogFloatAction from "./BlogFloatAction";
import TemplateBtn from "../../components/BlogActions/templateBtn";

const apiUrl = import.meta.env.VITE_API_URL;

const BlogPage = () => {
    const { scrollYProgress } = useScroll();
    const [postInfo, setPostInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [showTOC, setShowTOC] = useState(false);
    const [needToShowTOC, setNeedToShowTOC] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)
    const { blogId } = useParams();

    const getBlog = async () => {
        setLoading(true);
        setErrorMessage(null);
        try {
            const res = await fetch(`${apiUrl}/blog/getBlog/${blogId}`);
            const data = await res.json();
            if (data.success) {
                setPostInfo(data.data);
            } else {
                throw new Error(data?.message || 'Unable to fetch blog');
            }
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getBlog();
    }, [blogId]);

    if (loading) {
        return <div><BlogPageSkeletonloading /></div>;
    }

    if (errorMessage) {
        return <ErrorMessage heading='Unable to fetch blog' message={errorMessage} action={getBlog} />
    }

    const title = postInfo.title;
    const inputDate = new Date(postInfo.createdAt);
    const formattedDate = format(inputDate, 'MMM dd, yyyy');
    const author = postInfo.author;
    const authorName = author.name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    const content = postInfo.content;
    const cover = postInfo?.cover;
    const summary = postInfo.summary;

    return (
        <>
            <motion.div
                className="progress-bar"
                style={{ scaleX: scrollYProgress }}
            />
            <div className={`my-8 flex w-full ${needToShowTOC ? 'justify-between' : 'justify-center flex-row-reverse'} md:gap-4`}>
                <Toc content={content} showTOC={showTOC} setShowTOC={setShowTOC} needToShowTOC={needToShowTOC} setNeedToShowTOC={setNeedToShowTOC} />
                <div className={`w-full ${needToShowTOC ? 'md:w-3/5' : 'md:w-3/4'} mt-10`}>
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
                    <div className="border border-neutral-300 dark:border-neutral-700 rounded-md mb-5 flex justify-start flex-row overflow-hblogIdden bg-neutral-200/50 dark:bg-neutral-800">
                        <span className="bg-neutral-400 dark:bg-neutral-600 w-2 flex-shrink-0"></span>
                        <span className="py-1.5 px-4 sm:py-5 sm:px-7 flex-grow">
                            <h2 className="text-2xl mb-1 font-bold text-blue dark:text-golden">Summary</h2>
                            <p className="font-semibold font-serif text-neutral-800 dark:text-neutral-300">{summary}</p>
                        </span>
                    </div>
                    <BlogContents content={content} />
                </div>
                <BlogFloatAction
                    blogId={blogId}
                    authorId={author._id}
                    authorName={authorName}
                    shareBtnsClassName={`${needToShowTOC ? 'md:-left-0 md:translate-x-[-100%] translate-x-0' : 'md:left-10'} bottom-4 -left-5 xs:bottom-5 md:-bottom-2`}
                    toc={needToShowTOC && <TemplateBtn icon='list' onClick={() => setShowTOC(true)} className={`md:hidden border-l dark:border-neutral-500 md:p-3 ps-4 pe-0 ${showTOC ? 'pointer-events-none' : ''}`} />}
                    className={needToShowTOC ? 'md:ps-12' : ''}
                />
            </div>
        </>
    );
};

export default BlogPage;
