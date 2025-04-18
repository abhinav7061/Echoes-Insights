import React from 'react';
import Button from '.';
import { useUserAuthentication } from '../../context/userContext';
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_API_URL;

const LogoutBtn = () => {
    const { logout: logoutUser, jwtToken } = useUserAuthentication();
    const logout = async () => {
        try {
            const res = await fetch(`${apiUrl}/user/logout`, {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                },
                credentials: 'include',
            });
            if (res.ok) {
                logoutUser();
                toast.success("Logged out successfully");
            } else {
                toast.error("Logout failed");
            }
        } catch (error) {
            toast.info("Error during logout")
            console.log("Error during logout:", error);
        }
    }
    return (
        <Button
            className='px-5 py-1 text-sm rounded-full w-full dark:before:bg-neutral-700/60 dark:hover:before:bg-gradient-to-tr dark:hover:before:from-neutral-800/20 dark:hover:before:to-neutral-800/90 before:inset-[1px]'
            icon={<ion-icon name="log-out-outline"></ion-icon>}
            title={`Logout`}
            onClick={logout}
        />
    )
}

export default LogoutBtn