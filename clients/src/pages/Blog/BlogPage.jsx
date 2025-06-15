import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { format } from "date-fns";
import Toc from "./Toc";
import ErrorMessage from "../../components/ErrorMessage";
import BlogFloatAction from "./BlogFloatAction";
import TemplateBtn from "../../components/BlogActions/templateBtn";
import BlogPageSkeletonloading from "../../components/SkeletonLoader.js/BlogPageSkeletonloading";
import CommentSection from "../../components/CommentSection";
import RelatedBlogSection from "../../components/RelatedBlogSection";
import BlogDetails from "./BlogDetails";

const apiUrl = import.meta.env.VITE_API_URL;

const BlogPage = () => {
    const { blogId } = useParams();
    const [blogState, setBlogState] = useState({
        postInfo: {},
        loading: true,
        errorMessage: null,
    });
    const [showTOC, setShowTOC] = useState(false);
    const [needToShowTOC, setNeedToShowTOC] = useState(false);

    const { postInfo, loading, errorMessage } = blogState;

    const derivedValues = useMemo(() => {
        const title = postInfo?.title || '';
        const formattedDate = postInfo?.createdAt
            ? format(new Date(postInfo.createdAt), 'MMM dd, yyyy')
            : '';
        const channelName = postInfo?.author?.channelName
            ? postInfo.author?.channelName
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(" ")
            : '';
        return {
            title,
            formattedDate,
            channelName,
            authorId: postInfo?.author?.userId?._id || '',
            channelImg: postInfo.author?.channelImg?.url || "/default-profile.png",
            channelHandle: postInfo.author?.channelHandle,
            content: postInfo.content || '',
            author: postInfo.author || {},
            cover: postInfo.cover || null,
            summary: postInfo.summary || '',
            totalLikes: postInfo?.likesCount || 0,
            totalComments: postInfo?.commentsCount || 0,
            views: postInfo?.views || 0,
            readingTime: postInfo?.readingTime || 0,
        };
    }, [postInfo]);

    const getBlog = async () => {
        setBlogState(prev => ({ ...prev, loading: true, errorMessage: null }));
        try {
            const res = await fetch(`${apiUrl}/blog/getBlog/${blogId}`);
            const data = await res.json();
            if (data.success) {
                setBlogState(prev => ({ ...prev, postInfo: data.data, loading: false }));
            } else {
                throw new Error(data?.message || 'Unable to fetch blog');
            }
        } catch (error) {
            console.error(error.message);
            setBlogState(prev => ({ ...prev, errorMessage: error.message, loading: false }));
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getBlog();
    }, [blogId]);

    if (loading) return <BlogPageSkeletonloading />;
    if (errorMessage) return <ErrorMessage heading="Unable to fetch blog" message={errorMessage} action={getBlog} />;

    const { title, formattedDate, author, authorId, channelName, channelImg, channelHandle, content, cover, summary, totalLikes, totalComments, views, readingTime } = derivedValues;
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta property="og:title" content={title} />
                <meta property="og:description" content={summary} />
                <meta property="og:image" content={cover} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={summary} />
                <meta name="twitter:image" content={cover} />
            </Helmet>
            <div className={`my-8 flex w-full ${needToShowTOC ? 'justify-between' : 'justify-center flex-row-reverse'} md:gap-4`}>
                <Toc content={content} showTOC={showTOC} setShowTOC={setShowTOC} needToShowTOC={needToShowTOC} setNeedToShowTOC={setNeedToShowTOC} />
                <BlogDetails blogId={blogId} summary={summary} authorId={authorId} channelName={channelName} channelImg={channelImg} channelHandle={channelHandle} formattedDate={formattedDate} title={title} needToShowTOC={needToShowTOC} content={content} cover={cover} views={views} />
                <BlogFloatAction
                    blogId={blogId}
                    authorId={author._id}
                    authorName={channelName}
                    totalLikes={totalLikes}
                    shareBtnsClassName={`${needToShowTOC ? 'md:-left-0 md:translate-x-[-100%] translate-x-0' : 'md:left-10'} bottom-4 -left-5 xs:bottom-5 md:-bottom-2`}
                    toc={needToShowTOC && <TemplateBtn icon='list' onClick={() => setShowTOC(true)} className={`md:hidden border-l border-neutral-300 dark:border-neutral-500 md:p-3 ps-4 pe-0 ${showTOC ? 'pointer-events-none' : ''}`} />}
                    className={needToShowTOC ? 'md:ps-12' : ''}
                />
            </div>
            <div className="flex flex-col xs:flex-row justify-center gap-3 sm:gap-10 break-words">
                <CommentSection blogId={blogId} authorId={author._id} commentsCount={totalComments} className='' />
                <RelatedBlogSection className='' />
            </div>
        </>
    );
};

export default BlogPage;
