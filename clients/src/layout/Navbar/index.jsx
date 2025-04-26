import { useState, useRef, useEffect } from "react";
import useBlogSummaries from "../../hooks/useBlogSummaries";
import { Link } from "react-router-dom";
import UserAccess from "./UserAccess";
import BlogSearchSort from "../../components/BlogSearchSort";
import useMediaQuery from "../../hooks/useMediaQuery";
import useOutsideClick from "../../hooks/useOutsideClick";
import useDeviceType from "../../hooks/useDeviceType";
import useScrollDirection from "../../hooks/useScrollDirection";
import { cn } from "../../lib/utils";

const apiUrl = import.meta.env.VITE_API_URL;

const Navbar = ({ expanded, setExpanded }) => {
    const isSmallScreen = useMediaQuery('(max-width: 620px)')
    const { isMobile, isDesktop } = useDeviceType();
    const scrollDirection = useScrollDirection();
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
        <header className={cn("w-full flex justify-between items-center h-16 sticky top-0 z-[500] backdrop-blur-md px-2 bg-white dark:bg-neutral-950 transition-all duration-300",
            scrollDirection === 'down' && isMobile ? 'fixed -top-16' : 'fixed xs:sticky',
        )}>
            {isDesktop && <button onClick={() => setExpanded(!expanded)} className={`text-2xl px-3 flex`}><ion-icon name="menu"></ion-icon></button>}
            <Link to='/' className="bg-gradient-to-r from-indigo-500 from-20% via-sky-500 via-40% to-emerald-600 to-90% p-2 bg-clip-text text-clip flex-grow ss:flex-grow-0">
                <h1 className="text-xl md:text-2xl font-bold font-logoFont text-transparent whitespace-nowrap">Echoes & Insights</h1>
            </Link>
            <div className="ss:flex-grow px-4 text-white" ref={searchSortRef}>
                <span className="text-xl ss:hidden text-blue dark:text-neutral-400 flex cursor-pointer justify-end float-right" onClick={() => setShowSearch(!showSearch)}><ion-icon name="search-outline"></ion-icon></span>
                <span className={` ${showSearch ? 'top-16 left-3 right-3' : "hidden"} ss:w-full z-50 absolute ss:relative ss:flex flex-grow items-center justify-center`}>
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
