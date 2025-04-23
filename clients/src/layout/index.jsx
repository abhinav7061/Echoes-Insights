import React, { useState, useEffect, Suspense, lazy } from 'react'
const Navbar = lazy(() => import('./Navbar'));
const Footer = lazy(() => import('./Footer'));
import styles from '../style';
import { Toaster } from 'sonner';
import { Outlet, useLocation } from 'react-router-dom';
import { useUserAuthentication } from '../context/userContext';
import { logo } from '../assets';
import applyTheme from '../lib/themeManager';
import { authenticateUser } from '../lib/apiCalls/userApi';
const Sidebar = lazy(() => import('./Sidebar'))
const SidebarOptions = lazy(() => import('./Sidebar').then((module) => ({ default: module.SidebarOptions })));
const Bottombar = lazy(() => import('./Bottombar'));
import useDeviceType from '../hooks/useDeviceType';

const Layout = () => {
    const { login, logout } = useUserAuthentication();
    const location = useLocation();
    const { isMobile, isDesktop } = useDeviceType();
    const [loading, setLoading] = useState(true)
    const [expanded, setExpanded] = useState(false);

    const checkUserAuthentication = async () => {
        await authenticateUser(login, logout);
        setLoading(false);
    }
    useEffect(() => {
        checkUserAuthentication();
        applyTheme();
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash) {
                const element = document.querySelector(hash);
                if (element) {
                    window.scrollTo({
                        top: element.offsetTop - 80,
                        behavior: 'smooth',
                    });
                }
            }
        };
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    return (
        <>
            {loading ? <div className='flex justify-center items-center text-5xl h-[100vh]'><img src={logo} width={250} alt="Loading..." className='animate-pulse' /></div> : (<>
                <div className='relative w-full min-h-screen flex flex-col bg-white dark:bg-neutral-950 text-black dark:text-white'>
                    {(isMobile && location.pathname.startsWith('/shorts')) || <Navbar expanded={expanded} setExpanded={setExpanded} />}
                    <Toaster position="top-right" richColors closeButton='true' />
                    <div className='flex-grow flex w-full'>
                        {isDesktop && <Sidebar expanded={expanded} setExpanded={setExpanded}>
                            <SidebarOptions />
                        </Sidebar>}
                        <div className={`p-3 flex-grow ${styles.boxWidth} mx-auto`}>
                            <Suspense fallback={<div className='flex justify-center items-center text-5xl text-black dark:text-white h-[100vh]'><img src={logo} width={250} alt="Loading..." className='animate-pulse' /></div>}>
                                <Outlet />
                            </Suspense>
                        </div>
                    </div>
                    {isMobile && !location.pathname.startsWith('/shorts') && <Bottombar />}
                    {/* <Footer /> */}
                </div>
            </>)
            }
        </>
    )
}

export default Layout
