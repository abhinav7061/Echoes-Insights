import React, { useState, useEffect, Suspense } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import styles from '../style';
import { Toaster } from 'sonner';
import { Outlet } from 'react-router-dom';
import { useUserAuthentication } from '../context/userContext';
import { logo } from '../assets';
import applyTheme from '../lib/themeManager';
import { authenticateUser } from '../lib/apiCalls/userApi';

const Layout = () => {
    const { login, logout } = useUserAuthentication();
    const [loading, setLoading] = useState(true)
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
                <div className={`${styles.flexStart}`}>
                    <div className={`${styles.boxWidth} ${styles.paddingX} relative bg-white dark:bg-neutral-950 text-black dark:text-white`}>
                        <div className='relative w-full min-h-screen flex flex-col'>
                            <Navbar />
                            <Toaster position="top-right" richColors closeButton='true' />
                            <div className='my-4 md:my-8 flex-grow'>
                                <Suspense fallback={<div className='flex justify-center items-center text-5xl text-black dark:text-white h-[100vh]'><img src={logo} width={250} alt="Loading..." className='animate-pulse' /></div>}>
                                    <Outlet />
                                </Suspense>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
            </>)
            }
        </>
    )
}

export default Layout
