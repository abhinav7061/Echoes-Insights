import React, { useState, useEffect, Suspense } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import styles from '../style';
import { toast, Toaster } from 'sonner';
import { Outlet } from 'react-router-dom';
import { useUserAuthentication } from '../context/userContext';
import { logo } from '../assets';
import Spotlight from '../components/Spotlight'
const apiUrl = import.meta.env.VITE_API_URL;

const Layout = () => {
    const { jwtToken, login, logout } = useUserAuthentication();
    const [loading, setLoading] = useState(true)
    const checkUserAuthentication = async () => {
        try {
            const res = await fetch(`${apiUrl}/user/isAuthenticatedUser`, {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                },
                credentials: "include",
            });
            const data = await res.json();
            if (res.ok && data.success) {
                login(data.user, jwtToken);

            } else {
                logout();
            }
        } catch (error) {
            console.error('Failed to fetch user data', error);
            toast.error('Server Error')
            logout();
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        checkUserAuthentication();
    }, [])

    // Add this in your useEffect or where you handle the link click
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash) {
                const element = document.querySelector(hash);
                if (element) {
                    window.scrollTo({
                        top: element.offsetTop - 80, // Adjust 64 to match your header height
                        behavior: 'smooth',
                    });
                }
            }
        };

        window.addEventListener('hashchange', handleHashChange);

        // Cleanup
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    return (
        <>
            {loading ? <div className='flex justify-center items-center text-5xl bg-white dark:bg-slate-950 text-black dark:text-white h-[100vh]'><img src={logo} width={250} alt="Loading..." className='animate-pulse' /></div> : (<>
                <div className={`${styles.flexStart}`}>
                    <div className={`${styles.boxWidth} ${styles.paddingX} relative`}>
                        <div className='relative w-full min-h-screen flex flex-col'>
                            <div className='fixed top-0 left-0 w-full h-0 overflow-visible'>
                                <Spotlight fill='blue' className='h-screen top-0 left-10' />
                                <Spotlight fill='blue' className='h-screen top-[95vh] left-full' />
                                <Spotlight fill='purple' className='h-screen top-10 left-full' />
                                <Spotlight fill='purple' className='h-screen top-[95vh] left-10' />
                            </div>
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
