import React from 'react'
import ShareBtn from "./shareBtn";
import BlogLikeDislike from "./blogLikeDislike";
import BlogSaveUnsave from "./blogSaveUnsave";
import FollowUnfollow from "./followUnfollow";
import CopyBtn from "./copyBlogLink";
import ReportIssue from "./reportIssue";
const BlogActions = ({ blogId, authorId, authorName, showName = true, liked, saved, followed, setLiked, setSaved, setFollowed, className, iconClassName, btnClassName, shareBtnsClassName = 'md:-left-16', otherComponent, showReportBtn = true }) => {
    return (
        <div className={`flex gap-2 ${className}`}>
            <ShareBtn icon="arrow-redo" showName={showName} className={`w-full ${iconClassName}`} shareBtnsClassName={shareBtnsClassName} btnClassName={`w-full ${btnClassName}`} url={`${window.location.protocol}//${window.location.host}/blog/${blogId}`} />
            <CopyBtn showName={showName} btnClassName={`w-full ${btnClassName}`} copyLink={`${window.location.protocol}//${window.location.host}/blog/${blogId}`} className={`w-full ${iconClassName}`} />
            <BlogLikeDislike blogId={blogId} showName={showName} className={`w-full ${iconClassName}`} btnClassName={`w-full ${btnClassName}`} liked={liked} setLiked={setLiked} />
            <BlogSaveUnsave blogId={blogId} showName={showName} className={`w-full ${iconClassName}`} btnClassName={`w-full ${btnClassName}`} saved={saved} setSaved={setSaved} />
            <FollowUnfollow authorId={authorId} authorName={authorName} showName={showName} className={`w-full ${iconClassName}`} btnClassName={`w-full ${btnClassName}`} followed={followed} setFollowed={setFollowed} />
            {showReportBtn && <ReportIssue blogId={blogId} showName={showName} className={`w-full ${iconClassName}`} btnClassName={`w-full ${btnClassName}`} />}
            {otherComponent}
        </div>
    )
}

export default BlogActions