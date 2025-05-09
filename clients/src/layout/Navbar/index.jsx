import { useState, useRef, useEffect } from "react";
import useBlogSummaries from "../../hooks/useBlogSummaries";
import { Link, useLocation } from "react-router-dom";
import UserAccess from "./UserAccess";
import BlogSearchSort from "../../components/BlogSearchSort";
import useMediaQuery from "../../hooks/useMediaQuery";
import useOutsideClick from "../../hooks/useOutsideClick";
import useDeviceType from "../../hooks/useDeviceType";
import useScrollDirection from "../../hooks/useScrollDirection";
import { cn } from "../../lib/utils";
import { main_logo } from "../../assets";

const apiUrl = import.meta.env.VITE_API_URL;

const Navbar = ({ expanded, setExpanded }) => {
    const isSmallScreen = useMediaQuery('(max-width: 620px)')
    const { isMobile, isDesktop } = useDeviceType();
    const location = useLocation();
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
        <header className={cn("w-full flex justify-between items-center h-16 sticky top-0 z-[500] backdrop-blur-lg px-3 ss:px-5 bg-white dark:bg-neutral-950 transition-all duration-300",
            scrollDirection === 'down' && isMobile && 'fixed -top-16',
            isMobile && "fixed",
            location.pathname === '/space' && isMobile && 'dark:bg-transparent bg-transparent',
        )}>
            {isDesktop && <button onClick={() => setExpanded(!expanded)} className={`text-2xl mr-1.5 ss:mr-2.5 flex`}><span className="p-2 text-2xl rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 flex"><ion-icon name="menu"></ion-icon></span></button>}
            {(location.pathname === '/space' && isMobile) || <Link to='/' className="p-2 flex-grow ss:flex-grow-0 flex items-center gap-1">
                <img src={main_logo} alt='' className="h-7" />
                <h1 className="font-semibold text-xl leading-5">EchoSights</h1>
            </Link>}
            <div className="md:flex-grow ml-auto" ref={searchSortRef}>
                <span className={cn("md:hidden flex cursor-pointer justify-end p-2 text-2xl rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700")} onClick={() => setShowSearch(!showSearch)}><ion-icon name="search-outline"></ion-icon></span>
                <span className={` ${showSearch ? 'top-16 left-3 right-3' : "hidden"} md:w-full z-50 absolute md:relative md:flex flex-grow items-center justify-center`}>
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
