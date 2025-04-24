import { useContext, createContext, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import { cn } from "../../lib/utils";
import useLockBody from "../../hooks/useLockBody";
import { filled_shorts_icon, shorts_icon } from "../../assets";
import { useUserAuthentication } from "../../context/userContext";
const SidebarContext = createContext();

export default function Sidebar({ expanded, setExpanded, setFixedSidebar, children }) {
    const location = useLocation();
    const { windowInWidth } = useWindowSize();
    const fixedRoutes = useMemo(() => new Set(['blog', 'shorts']), []);

    const currentRoute = useMemo(() => location.pathname.split('/')[1], [location.pathname]);

    const fixed = windowInWidth < 768 || fixedRoutes.has(currentRoute);

    useEffect(() => {
        const shouldExpand = windowInWidth > 768 && !fixedRoutes.has(currentRoute);
        setExpanded(shouldExpand);
    }, [windowInWidth, currentRoute, fixedRoutes, setExpanded]);

    const isSpecialRoute = location.pathname.startsWith('/shorts');
    useLockBody(expanded && !isSpecialRoute && windowInWidth < 768);
    useEffect(() => {
        setFixedSidebar(fixed);
    }, [fixed]);
    return (
        <aside
            className={cn(
                "h-screen flex-shrink-0 bg-white dark:bg-neutral-950",
                "top-0 left-0 duration-300 overflow-hidden transition-all flex",
                expanded ? "w-48" : "sm:overflow-visible xs:w-20",
                fixed ? "fixed z-[2000]" : "xs:sticky xs:top-16 sm:h-[calc(100vh-64px)]",
                fixed && !expanded ? "w-0 xs:w-0" : '',
            )}
        >
            <div
                className={cn(
                    "fixed top-0 left-0 w-screen h-screen z-0 bg-neutral-800/40 dark:bg-neutral-600/20",
                    expanded ? "block" : "hidden",
                    !fixed && "xs:hidden"
                )}
                onClick={() => setExpanded(false)}
            />

            <SidebarContext.Provider value={{ expanded, setExpanded, fixed }}>
                <div className={cn(
                    "h-full flex-shrink-0 w-full flex flex-col items-center bg-white dark:bg-neutral-950",
                    "overflow-y-auto overflow-x-hidden z-10 transition-all duration-300",
                    expanded && "px-2"
                )}>
                    <div className={cn(
                        "w-full flex justify-between items-center h-16",
                        !fixed && "xs:hidden"
                    )}>
                        <Link to='/' className="bg-gradient-to-r from-indigo-500 from-20% via-sky-500 via-40% to-emerald-600 to-90% bg-clip-text text-clip">
                            <h1 className="text-sm font-bold font-logoFont text-transparent whitespace-nowrap">Echoes & Insights</h1>
                        </Link>
                        <button
                            onClick={() => setExpanded(false)}
                            className='text-2xl flex'
                        >
                            <ion-icon name="menu"></ion-icon>
                        </button>
                    </div>
                    <nav className="w-full py-2 space-y-1">{children}</nav>
                </div>
            </SidebarContext.Provider>
        </aside>
    );
}

// SidebarItem component
export function SidebarItem({ icon, text, active, alert, onClick, ...rest }) {
    const { expanded, setExpanded, fixed } = useContext(SidebarContext);
    const { windowInWidth } = useWindowSize();
    const isXs = windowInWidth < 480;

    return (
        <li
            className={cn('relative flex flex-shrink-0 items-center px-3 py-2 rounded-md cursor-pointer transition-colors',
                active ? "bg-neutral-200 dark:bg-neutral-700" : 'hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50',
                expanded || "justify-center",
                (!expanded && !fixed) && 'flex-col'
            )}
            onClick={() => {
                if (isXs || fixed) {
                    setExpanded(false)
                }
                onClick?.();
            }}
            {...rest}
        >
            <span className="text-xl flex flex-shrink-0">{icon}</span>
            <span
                className={`overflow-hidden line-clamp-1 ${expanded ? "ml-4 text-[15px]" : "text-xs"}`}
            >
                {text}
            </span>
            {alert && (
                <div
                    className={`absolute right-2 w-1.5 h-1.5 top-3 rounded bg-indigo-400`}
                />
            )}
        </li>
    );
}

export const SidebarOptions = () => {
    const navigate = useNavigate();
    const { isAuthenticatedUser } = useUserAuthentication();
    const sidebarItems = [
        {
            path: '/',
            iconName: 'home',
            text: 'Home',
        },
        {
            path: '/shorts',
            icon: (active) => (
                <img
                    src={active ? filled_shorts_icon : shorts_icon}
                    className="dark:invert w-5 h-5"
                />
            ),
            text: 'Shorts',
        },
        {
            path: '/history',
            iconName: 'alarm',
            text: 'History',
            show: isAuthenticatedUser,
        },
        {
            path: '/saved',
            iconName: 'bookmark',
            text: 'Saved',
            show: isAuthenticatedUser,
        },
        {
            path: '/likes',
            iconName: 'thumbs-up',
            text: 'Likes',
            show: isAuthenticatedUser,
            alert: true,
        },
    ].map(item => ({
        ...item,
        active: location.pathname === item.path ||
            (item.path === '/shorts' && location.pathname.startsWith('/shorts')),
    })).filter(item => item.show !== false);

    return (
        <>
            {sidebarItems.map(({ path, iconName, icon, text, active, alert }) => (
                <SidebarItem
                    key={path}
                    icon={icon
                        ? icon(active)
                        : <ion-icon name={`${iconName}${active ? '' : '-outline'}`}></ion-icon>
                    }
                    text={text}
                    active={active}
                    alert={alert}
                    onClick={() => navigate(path)}
                />
            ))}
        </>
    );
}