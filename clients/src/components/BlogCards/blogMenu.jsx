import React, { useState, useRef, Suspense } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
const BlogActions = React.lazy(() => import("../BlogActions"));

const BlogMenu = ({ blogId, authorId, authorName, liked, saved, followed, likesCount, setLiked, setSaved, setFollowed, setLikesCount, setKeepBlogMenuOpen }) => {
  const actions = useRef();
  const [open, setOpen] = useState(false);
  useOutsideClick(actions, () => {
    setOpen(false);
    setKeepBlogMenuOpen(false)
  });
  return (
    <div
      className="absolute top-2 right-2 z-50 flex gap-2 cursor-default"
    >
      <button className="flex items-center justify-center bg-gray-200 hover:bg-gray-400 text-black w-28 xs:w-8 h-8 rounded-full overflow-hidden group transition-[width] hover:w-28 duration-500 ease-out" title="Hide this post">
        <ion-icon name="close"></ion-icon>
        <p className="xs:hidden px-1 group-hover:block text-xs whitespace-nowrap">
          Hide this blog
        </p>
      </button>

      <span ref={actions} className="relative">
        <button
          className="flex items-center justify-center bg-gray-200 hover:bg-gray-400 text-black w-8 h-8 rounded-full overflow-hidden"
          onClick={() => {
            setOpen((open) => !open);
            setKeepBlogMenuOpen(prev => !prev);
          }}
          title="See blog menu"
        >
          <ion-icon name="ellipsis-horizontal"></ion-icon>
        </button>
        {open && (
          <div className="absolute top-10 right-0 bg-neutral-100 dark:border border-neutral-700 dark:bg-neutral-800 shadow-lg dark:shadow-neutral-800 rounded-md p-4">
            <div
              className="w-4 h-4 right-2 -top-4 absolute border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-neutral-100 dark:border-b-neutral-800"
            ></div>
            <Suspense fallback={<span className="animate-spin"><ion-icon name='reload-circle-outline'></ion-icon></span>}>
              <BlogActions blogId={blogId} authorId={authorId} authorName={authorName} liked={liked} saved={saved} followed={followed} likesCount={likesCount} setLiked={setLiked} setSaved={setSaved} setFollowed={setFollowed} setLikesCount={setLikesCount} shareBtnsClassName="bottom-5 -left-16 md:-left-24" className='text-sm flex-col' />
            </Suspense>
          </div>
        )
        }
      </span >
    </div >
  )
}

export default BlogMenu