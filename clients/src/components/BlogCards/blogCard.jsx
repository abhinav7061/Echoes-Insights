import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import { formatDistanceStrict } from "date-fns";
import { people01 } from "../../assets";
import BlogMenu from "./blogMenu";
import FollowUnfollow from "../BlogActions/followUnfollow";
import ShareBtn from "../BlogActions/shareBtn";
import BlogLikeDislike from "../BlogActions/blogLikeDislike";
import BlogSaveUnsave from "../BlogActions/blogSaveUnsave";

const BlogCard = React.memo(({ card, index, hovered, setHovered }) => {
    const cardRef = useRef(null);
    const title = card.title;
    const inputDate = new Date(card.createdAt);
    const formattedDate = formatDistanceStrict(inputDate, new Date(), { addSuffix: false });
    const author = card.author;
    const authorName = card.author.name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    const summary = card.summary;
    const id = card._id
    const cover = card.cover
    const views = card.views;
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [followed, setFollowed] = useState(false);
    const [keepBlogMenuOpen, setKeepBlogMenuOpen] = useState(false);
    const [enableScrollEffect, setEnableScrollEffect] = useState(window.innerWidth < 480);

    useEffect(() => {
        const updateScrollEffect = () => {
            setEnableScrollEffect(window.innerWidth < 480);
        };

        window.addEventListener("resize", updateScrollEffect);
        updateScrollEffect();

        return () => {
            window.removeEventListener("resize", updateScrollEffect);
        };
    }, []);

    useEffect(() => {
        if (!enableScrollEffect) return;
        const handleScroll = () => {
            if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect();
                const topOffset = rect.top;

                if (topOffset <= 200 && topOffset >= 0) {
                    setHovered(index);
                } else if (hovered === index) {
                    setHovered(null);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [enableScrollEffect]);
    console.log({
        isEqual: hovered == index,
        hovered,
        index
    })

    return (<div
        ref={cardRef}
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
            "rounded-xl relative xs:border xs:dark:border-transparent xs:bg-white xs:dark:bg-neutral-800 xs:shadow-lg dark:shadow-neutral-950 overflow-hidden h-[280px] xs:h-[300px] w-full transition-all duration-300 ease-out",
            hovered == null ? "" : hovered == index ? 'mb-1 xs:mb-0' : "xs:opacity-80 xs:scale-[0.98]"
        )}
    >
        {(hovered === index || keepBlogMenuOpen) && (<BlogMenu blogId={id} authorId={author._id} authorName={authorName} liked={liked} saved={saved} followed={followed} setLiked={setLiked} setSaved={setSaved} setFollowed={setFollowed} setKeepBlogMenuOpen={setKeepBlogMenuOpen} />)}
        <Link to={`/blog/${id}`} className="relative inset-0 flex flex-col">
            <div className="h-[165px] z-0">
                <img src={cover.url} alt="blog cover" className={cn(
                    "object-cover w-full transition-[height] duration-500 ease-in-out rounded-xl bg-white dark:bg-[#1E1E1E]",
                    hovered === index ? "h-80 absolute z-0" : "h-[165px] xs:border - b dark:border-neutral-700"
                )}
                />
            </div>
            {hovered === index && <div className="bg-black/70 h-full w-full absolute z-[5]"></div>}
            <div className="flex flex-col w-full px-4 py-2 justify-end z-10 h-[115px] xs:h-[135px] bg-transparent">
                <div className={`text-[10px] font-semibold flex text-neutral-400 dark:text-neutral-400`}>
                    <span className="flex items-center gap-2" title={authorName}>
                        <img src={people01} alt="" className="rounded-full h-4 aspect-square" />
                        <span className='line-clamp-1'>
                            {authorName}
                        </span>
                        {hovered === index && <FollowUnfollow authorId={author._id} authorName={authorName} showName={true} btnClassName='py-[1px] px-1 bg-indigo-700 hover:bg-green-700 text-white hover:text-white dark:hover:text-white rounded gap-[2px]' followed={followed} setFollowed={setFollowed} />}
                    </span>
                    <span className="mx-2 flex items-center">&#128900;</span>
                    <span className='line-clamp-1 flex items-center whitespace-nowrap'>{formattedDate}</span>
                </div>
                <h1 className={cn("font-poppins font-semibold dark:text-white text-base line-clamp-1 transition-colors duration-500 ease-in-out",
                    hovered === index ? "text-white" : ""
                )}>
                    {title}
                </h1>
                <p className={cn("font-poppins font-normal flex-grow dark:text-neutral-100 text-[12px] line-clamp-2 xs:line-clamp-3 transition-colors duration-500",
                    hovered === index ? "text-neutral-200" : "text-neutral-900"
                )}>
                    {summary}
                </p>
                <div className={cn("mb-1 text-base flex justify-between items-center dark:text-neutral-100",
                    hovered === index ? "text-neutral-200" : ""
                )}>
                    <span className="transition-colors flex-grow duration-500 flex gap-2" title="Like this blog post">
                        <BlogLikeDislike blogId={id} liked={liked} setLiked={setLiked} />
                        <ShareBtn url={`${window.location.protocol}//${window.location.host}/blog/${id}`} shareBtnsClassName="-left-10 bottom-4" />
                        <BlogSaveUnsave blogId={id} saved={saved} setSaved={setSaved} />
                    </span>
                    <span className='flex items-center gap-1'><ion-icon name="eye-outline"></ion-icon> <p className="text-xs">{views} views</p></span>
                </div>
            </div>
            <div className={cn("w-full h-[1px] xs:hidden bg-neutral-200 dark:bg-neutral-600 z-30 absolute bottom-1 transition-opacity duration-300 ",
                hovered === index ? "opacity-0" : ""
            )}></div>
        </Link>
    </div >
    )
});

export default BlogCard;