import { useState, useRef, useEffect } from "react";
import useBlogSummaries from "../../hooks/useBlogSummaries";
import { Link } from "react-router-dom";
import UserAccess from "./UserAccess";
import BlogSearchSort from "../../components/BlogSearchSort";
import useMediaQuery from "../../hooks/useMediaQuery";
import useOutsideClick from "../../hooks/useOutsideClick";

const apiUrl = import.meta.env.VITE_API_URL;

const Navbar = () => {
    const isSmallScreen = useMediaQuery('(max-width: 620px)')
    const [showSearch, setShowSearch] = useState(false);
    const searchSortRef = useRef();
    const { search, handleSearchChange, sort, setSort, resetBlogSummaries, searchPlaceholder } = useBlogSummaries(`${apiUrl}/blog`);
    const handleSubmit = (e) => {
        e.preventDefault();
        resetBlogSummaries();
    }

    useOutsideClick(searchSortRef, () => setShowSearch(false));

    useEffect(() => {
        if (!isSmallScreen)
            setShowSearch(false);
    }, [isSmallScreen])

    return (
        <header className="w-full flex justify-between items-center h-12 xs:h-16 rounded-xl sticky top-2 z-[500] backdrop-blur-md px-2 bg-neutral-300/30 dark:bg-neutral-800/80">
            <Link to='/' className="bg-gradient-to-r from-indigo-500 from-20% via-sky-500 via-40% to-emerald-600 to-90% p-2 bg-clip-text  text-clip">
                <h1 className="sm:text-xl md:text-2xl text-sm  font-bold font-logoFont text-transparent whitespace-nowrap">Echoes & Insights</h1>
            </Link>
            <div className="flex-grow px-4 text-white" ref={searchSortRef}>
                <span className="text-xl ss:hidden text-blue dark:text-neutral-400 flex cursor-pointer justify-end float-right" onClick={() => setShowSearch(!showSearch)}><ion-icon name="search-outline"></ion-icon></span>
                <span className={` ${showSearch ? 'top-14 xs:top-[70px] left-0 right-0' : "hidden"} ss:w-full z-50 absolute ss:relative ss:flex flex-grow items-center justify-center`}>
                    <BlogSearchSort
                        className='w-full'
                        search={search}
                        handleSearchChange={handleSearchChange}
                        setSort={setSort}
                        onSubmit={handleSubmit}
                        placeholder={searchPlaceholder}
                    />
                </span>
            </div>
            <UserAccess />
        </header>
    );
};

export default Navbar;
